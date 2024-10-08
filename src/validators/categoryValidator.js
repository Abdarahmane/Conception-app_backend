import { check, param, validationResult } from "express-validator";

// Validation pour la création d'une catégorie
const validateCreateCategory = () => {
  return [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Le nom de la catégorie ne peut pas être vide!")
      .bail()
      .isLength({ min: 3, max: 100 })
      .withMessage("Le nom de la catégorie doit contenir entre 3 et 50 caractères!"),
  ];
};

// Validation pour la mise à jour d'une catégorie
const validateUpdateCategory = () => {
  return [
    param("id")
      .not()
      .isEmpty()
      .withMessage("L'ID est requis pour mettre à jour une catégorie!")
      .bail()
      .isInt({ gt: 0 })
      .withMessage("L'ID doit être un entier positif!"),

    check("name")
      .optional()
      .isLength({ min: 3, max: 100 })
      .withMessage("Le nom de la catégorie doit contenir entre 3 et 50 caractères!"),
  ];
};

// Validation pour la suppression d'une catégorie
const validateDeleteCategory = () => {
  return [
    param("id")
      .not()
      .isEmpty()
      .withMessage("L'ID est requis pour supprimer une catégorie!")
      .bail()
      .isInt({ gt: 0 })
      .withMessage("L'ID doit être un entier positif!"),
  ];
};

// Middleware de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Exportation des fonctions
export {
  validateCreateCategory,
  validateUpdateCategory,
  validateDeleteCategory,
  validate,
};
