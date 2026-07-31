const express = require("express");
const {
  GetAllUsersV1,
  GetAllUsersV2,
  GetAllUsersByGender,
  GetUserByName,
} = require("../Controllers/UserActivityController");

const router = express.Router();

router.get("/allUsers", GetAllUsersV1);

router.get("/allUsersV2", GetAllUsersV2);

router.get("/allUsersByGender", GetAllUsersByGender);

router.get("getUserByName/:name", GetUserByName);

module.exports = router;
