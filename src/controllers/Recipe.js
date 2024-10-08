
import RecipeModel from "../models/recipe.js";
import CategoryModel from "../models/category.js"; // Import the Category model

const validateRecipeFields = (fields) => {
  const errors = [];
  if (!fields.titre || fields.titre.trim() === "") {
    errors.push({
      type: "field",
      msg: "Le titre ne peut pas être vide!",
      path: "titre",
      location: "body",
    });
  }
  if (!fields.ingredients || fields.ingredients.trim() === "") {
    errors.push({
      type: "field",
      msg: "Les ingrédients ne peuvent pas être vides!",
      path: "ingredients",
      location: "body",
    });
  }
  if (!fields.type || fields.type.trim() === "") {
    errors.push({
      type: "field",
      msg: "Le type ne peut pas être vide!",
      path: "type",
      location: "body",
    });
  }
  return errors;
};

export const createRecipe = async (req, res) => {
  const { titre, ingredients, type, categorie_id } = req.body; // Included categorie_id

  const errors = validateRecipeFields(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existingRecipe = await RecipeModel.getRecipeByTitle(titre);
    if (existingRecipe) {
      return res
        .status(400)
        .json({ message: "Une recette avec ce titre existe déjà." });
    }

    // Check if the category exists using the Category model
    const existingCategory = await CategoryModel.getCategoryById(categorie_id);
    
    let categoryId;

    if (existingCategory) {
      // If category exists, use its ID
      categoryId = existingCategory.id;
    } else {
      return res.status(400).json({ message: "La catégorie spécifiée n'existe pas." });
    }

    // Prepare the recipe data with the category ID
    const recipeData = {
      titre,
      ingredients,
      type,
      categorie_id: categoryId, // Use the found category ID
    };

    const newRecipe = await RecipeModel.createRecipe(recipeData);
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Other functions remain unchanged...
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.getAllRecipes();
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await RecipeModel.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { titre, ingredients, type, categorie_id } = req.body;

  try {
    // Check if the recipe exists before updating
    const existingRecipe = await RecipeModel.getRecipeById(id);
    if (!existingRecipe) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }

    // Check if the new title is already taken by a different recipe
    if (titre && titre !== existingRecipe.titre) {
      const recipeWithSameTitle = await RecipeModel.getRecipeByTitle(titre);
      if (recipeWithSameTitle) {
        return res.status(400).json({ message: "Une recette avec ce titre existe déjà." });
      }
    }

    // Check if the category exists if provided
    let categoryId;
    if (categorie_id) {
      const existingCategory = await CategoryModel.getCategoryById(categorie_id);
      if (!existingCategory) {
        return res.status(400).json({ message: "La catégorie spécifiée n'existe pas." });
      }
      categoryId = categorie_id; // Use the provided categorie_id
    } else {
      categoryId = existingRecipe.categorie_id; // Keep the current category if not provided
    }

    // Prepare the recipe data with the category ID
    const recipeData = {
      titre: titre || existingRecipe.titre, // Keep the old title if not provided
      ingredients: ingredients || existingRecipe.ingredients, // Keep the old ingredients if not provided
      type: type || existingRecipe.type, // Keep the old type if not provided
      categorie_id: categoryId, // Use the found or existing category ID
    };

    // Log the data being updated (for debugging)
    console.log('Updating recipe with data:', recipeData);

    // Update the recipe in the database
    const updatedRecipe = await RecipeModel.updateRecipe(id, recipeData);
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    // Vérifier si la recette existe avant de la supprimer
    const existingRecipe = await RecipeModel.getRecipeById(id);
    if (!existingRecipe) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }

    // Suppression de la recette
    await RecipeModel.deleteRecipe(id);

    // Répondre avec un message de succès
    return res.status(200).json({ message: "Recette supprimée avec succès." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Exporting all functions
export default {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
