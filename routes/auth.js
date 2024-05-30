/*
    Auth Routes
    /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
