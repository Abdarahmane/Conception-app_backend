import CategoryModel from "../src/models/category.js";
import RecipeModel from "../src/models/recipe.js"; // Assuming you still need RecipeModel
import db from "../src/config/db.js";

describe("Recipe Model with Real Database", () => {
  const setupTestData = async () => {
    await db.query("DELETE FROM recipes");
    await db.query("DELETE FROM categories");

    // Insert initial categories
    await db.query(`INSERT INTO categories (id, name) VALUES
          (1, 'Dessert'),
          (2, 'Entree');`);
  };

  beforeEach(async () => {
    await setupTestData(); // Ensure test data is set up before each test
  });

  it("should create a new recipe", async () => {
    const newRecipe = await RecipeModel.createRecipe({
      titre: "New Recipe",
      ingredients: "Ingredients list",
      type: "Dessert",
      categorie_id: 1 // Ensure this ID exists in the categories table
    });
    expect(newRecipe).toBeDefined();
    expect(newRecipe.titre).toBe("New Recipe");
  });

  it("should update a recipe", async () => {
    // Create a recipe first
    const newRecipe = await RecipeModel.createRecipe({
      titre: "Recipe to Update",
      ingredients: "Some ingredients",
      type: "Dessert",
      categorie_id: 1 // Ensure this ID exists
    });

    const updatedRecipe = await RecipeModel.updateRecipe(newRecipe.id, {
      titre: "Updated Recipe",
      ingredients: "Updated ingredients",
      type: "Dessert",
      categorie_id: 1 // Ensure this ID exists
    });

    expect(updatedRecipe).toBeDefined();
    expect(updatedRecipe.titre).toBe("Updated Recipe");
  });
  
  it("should retrieve a category by ID", async () => {
    await setupTestData(); // Set up data
    const newCategory = await CategoryModel.createCategory(
      "Category to Retrieve",
    );
    const result = await CategoryModel.getCategoryById(newCategory.id);
    expect(result).toBeDefined();
    expect(result.name).toBe("Category to Retrieve");
  });

  it("should return null for a non-existent category by ID", async () => {
    await setupTestData(); // Set up data
    const result = await CategoryModel.getCategoryById(999);
    expect(result).toBeNull();
  });

  it("should retrieve all categories", async () => {
    await setupTestData(); // Set up data
    // Now we can add new categories for this test
    await CategoryModel.createCategory("Category 1");
    await CategoryModel.createCategory("Category 2");

    const categories = await CategoryModel.getAllCategories();
    expect(categories.length).toBe(4); // Expecting 2 from setup + 2 added
  });

  it("should update a category", async () => {
    await setupTestData(); // Set up data
    const newCategory = await CategoryModel.createCategory("Old Category");
    const updatedCategory = await CategoryModel.updateCategory(
      newCategory.id,
      "Updated Category",
    );

    expect(updatedCategory).toBeDefined(); // Check that the update returns an object
    expect(updatedCategory.name).toBe("Updated Category"); 
  });

  it("should delete a category", async () => {
    await setupTestData(); // Set up data
    const newCategory = await CategoryModel.createCategory("Category to Delete");
    const deleteResult = await CategoryModel.deleteCategory(newCategory.id);

    // Check that the ID of the deleted category is returned
    expect(deleteResult.id).toBe(newCategory.id);

    const result = await CategoryModel.getCategoryById(newCategory.id);
    expect(result).toBeNull(); // Verify that the category has been deleted
  });
});
