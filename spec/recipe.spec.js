import RecipeModel from "../src/models/recipe.js"; // Ensure the path is correct
import db from "../src/config/db.js";

describe("Recipe Model with Real Database", () => {
  // Helper function to set up test data
  const setupTestData = async () => {
    // Vider les tables avant chaque test pour éviter les conflits
    await db.query("SET FOREIGN_KEY_CHECKS = 0"); // Désactiver les contraintes de clé étrangère temporairement
    await db.query("TRUNCATE TABLE recipes");
    await db.query("TRUNCATE TABLE categories");
    await db.query("SET FOREIGN_KEY_CHECKS = 1"); // Réactiver les contraintes de clé étrangère

    // Ajouter des catégories valides avant d'ajouter les recettes
    await db.query(`
      INSERT INTO categories (id, name) VALUES
      (1, 'Dessert'),
      (2, 'Main Course'),
      (3, 'Appetizer')
    `);

    // Ajouter des recettes avec des categorie_id valides
    await db.query(`
      INSERT INTO recipes (titre, ingredients, type, categorie_id) VALUES
      ('Tiramisu', 'Mascarpone, Cafe, Biscuits', 'Dessert', 1),
      ('Mousse au chocolat', 'Chocolat, Oeufs, Creme', 'Dessert', 1)
    `);
  };

  it("should create a new recipe", async () => {
    await setupTestData(); // Set up data
    const uniqueTitle = "New Recipe " + Date.now();
    const newRecipe = {
      titre: uniqueTitle,
      ingredients: "Some ingredients",
      type: "Main",
      categorie_id: 1, // Utiliser un ID de catégorie valide
    };
    const result = await RecipeModel.createRecipe(newRecipe);
    expect(result.id).toBeDefined();
  });

  it("should retrieve a recipe by ID", async () => {
    await setupTestData(); // Set up data
    const uniqueTitle = "Retrieve Me " + Date.now();
    const newRecipe = {
      titre: uniqueTitle,
      ingredients: "Ingredients",
      type: "Main",
      categorie_id: 2, // Utiliser un ID de catégorie valide
    };
    const createdRecipe = await RecipeModel.createRecipe(newRecipe);
    const recipe = await RecipeModel.getRecipeById(createdRecipe.id);
    expect(recipe).toBeDefined();
    expect(recipe.id).toBe(createdRecipe.id);
  });

  it("should update a recipe", async () => {
    await setupTestData(); // Set up data
    const uniqueTitle = "Recipe to Update " + Date.now();
    const createdRecipe = await RecipeModel.createRecipe({
      titre: uniqueTitle,
      ingredients: "Ingredients",
      type: "Main",
      categorie_id: 1, // Utiliser un ID de catégorie valide
    });

    const updatedRecipeData = {
      titre: "Updated Recipe " + Date.now(),
      ingredients: "Updated ingredients",
      type: "Dessert",
      categorie_id: 2, // Utiliser un autre ID valide
    };
    const updatedRecipe = await RecipeModel.updateRecipe(
      createdRecipe.id,
      updatedRecipeData
    );

    expect(updatedRecipe.titre).toBe(updatedRecipeData.titre);
    expect(updatedRecipe.id).toBe(createdRecipe.id);
  });

  it("should retrieve a recipe by title", async () => {
    await setupTestData(); // Set up data
    const uniqueTitle = "Test Recipe " + Date.now();
    const newRecipe = {
      titre: uniqueTitle,
      ingredients: "Some ingredients",
      type: "Main",
      categorie_id: 2, // Utiliser un ID de catégorie valide
    };
    await RecipeModel.createRecipe(newRecipe);

    const recipe = await RecipeModel.getRecipeByTitle(uniqueTitle);
    expect(recipe).toBeDefined();
    expect(recipe.titre).toBe(uniqueTitle);
  });

  it("should return null for a non-existent recipe by title", async () => {
    await setupTestData(); // Set up data
    const recipe = await RecipeModel.getRecipeByTitle("Non-existent Title");
    expect(recipe).toBeNull();
  });

  it("should delete a recipe", async () => {
    await setupTestData(); // Set up data
    const newRecipe = {
      titre: "Recipe to Delete",
      ingredients: "Ingredients",
      type: "Main",
      categorie_id: 1, // Utiliser un ID de catégorie valide
    };
    const createdRecipe = await RecipeModel.createRecipe(newRecipe);
    const result = await RecipeModel.deleteRecipe(createdRecipe.id);
    expect(result).not.toBeNull();
  });
});
