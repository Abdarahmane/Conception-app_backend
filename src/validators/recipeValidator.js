import { check, param, validationResult } from "express-validator";

// Validation for recipe creation
const validateCreateRecipe = () => {
  return [
    check("titre")
      .not()
      .isEmpty()
      .withMessage("Le titre ne peut pas être vide!")
      .bail()
      .isLength({ min: 6, max: 100 })
      .withMessage("Le titre doit contenir entre 6 et 100 caractères!")
      .bail(),

    check("ingredients")
      .not()
      .isEmpty()
      .withMessage("Les ingrédients ne peuvent pas être vides!")
      .bail()
      .isLength({ min: 10, max: 500 })
      .withMessage("Les ingrédients doivent contenir entre 10 et 500 caractères!"),

    check("type")
      .not()
      .isEmpty()
      .withMessage("Le type de recette est requis!")
      .bail()
      .isIn(["Entree", "plat principal", "Dessert"])
      .withMessage("Le type de recette doit être 'Entree', 'plat principal' ou 'Dessert'!"),

    check("categorie_id")
      .not()
      .isEmpty()
      .withMessage("L'ID de la catégorie est requis!")
      .bail()
      .isInt({ gt: 0 })
      .withMessage("L'ID de la catégorie doit être un entier positif!"),
  ];
};

// Validation for recipe update
const validateUpdateRecipe = () => {
  return [
    param("id")
      .not()
      .isEmpty()
      .withMessage("L'ID est requis pour mettre à jour une recette!")
      .bail()
      .isInt({ gt: 0 })
      .withMessage("L'ID doit être un entier positif!"),

    check("titre")
      .optional()
      .isLength({ min: 6, max: 100 })
      .withMessage("Le titre doit contenir entre 6 et 100 caractères!")
      .bail()
      .custom(async (titre) => {
        const existingRecipe = await Recipe.findOne({ where: { titre } });
        if (existingRecipe) {
          throw new Error("Une recette avec ce titre existe déjà!");
        }
        return true;
      }),

    check("ingredients")
      .optional()
      .isLength({ min: 10, max: 500 })
      .withMessage("Les ingrédients doivent contenir entre 10 et 500 caractères!"),

    check("type")
      .optional()
      .isIn(["Entree", "plat principal", "Dessert"])
      .withMessage("Le type de recette doit être 'Entree', 'plat principal' ou 'Dessert'!"),

    check("categorie_id")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("L'ID de la catégorie doit être un entier positif!"),
  ];
};

// Validation for recipe deletion
const validateDeleteRecipe = () => {
  return [
    param("id")
      .not()
      .isEmpty()
      .withMessage("L'ID est requis pour supprimer une recette!")
      .bail()
      .isInt({ gt: 0 })
      .withMessage("L'ID doit être un entier positif!"),
  ];
};

// Middleware for validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Export the functions
export {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateDeleteRecipe,
  validate,
};
