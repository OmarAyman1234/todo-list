const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/rolesList");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.owner, ROLES_LIST.admin),
    usersController.getAllUsers
  );

module.exports = router;
