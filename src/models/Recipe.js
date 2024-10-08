import db from "../config/db.js"; // Ensure the path reflects your directory structure

class RecipeModel {
  async getRecipeByTitle(titre) {
    const query = "SELECT * FROM recipes WHERE titre = ?";
    const [rows] = await db.query(query, [titre]);
    return rows.length > 0 ? rows[0] : null;
  }

  async createRecipe(recipeData) {
    try {
      const { titre, ingredients, type, categorie_id } = recipeData;
      const query = 'INSERT INTO recipes (titre, ingredients, type, categorie_id) VALUES (?, ?, ?, ?)';
      const [result] = await db.query(query, [titre, ingredients, type, categorie_id]);
      return { id: result.insertId, titre, ingredients, type, categorie_id };
    } catch (error) {
      throw new Error('Error creating recipe: ' + error.message);
    }
  }

  async getAllRecipes() {
    const query = "SELECT * FROM recipes";
    const [rows] = await db.query(query);
    return rows;
  }

  async getRecipeById(id) {
    if (isNaN(id)) {
      throw new Error("Invalid ID format");
    }
    const query = "SELECT * FROM recipes WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  async updateRecipe(id, recipeData) {
    if (isNaN(id)) {
      throw new Error("Invalid ID format");
    }
    const { titre, ingredients, type, categorie_id } = recipeData;
    const query =
      "UPDATE recipes SET titre = ?, ingredients = ?, type = ?, categorie_id = ? WHERE id = ?";
    await db.query(query, [titre, ingredients, type, categorie_id, id]);
    return { id, titre, ingredients, type, categorie_id };
  }

  async deleteRecipe(id) {
    if (isNaN(id)) {
      throw new Error("Invalid ID format");
    }
    const query = "DELETE FROM recipes WHERE id = ?";
    const result = await db.query(query, [id]);
    return result;
  }
}

// Export an instance of the class
export default new RecipeModel();
