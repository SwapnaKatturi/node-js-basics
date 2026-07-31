const users = require("../data");

function GetAllUsersV1(req, res) {
  const allUsersData = users;
  const payload = {
    success: true,
    data: allUsersData,
    size: allUsersData.length,
  };
  res.json(payload);
}

function GetAllUsersV2(req, res) {
  const allUsersData = users;
  const payload = {
    data: allUsersData,
  };
  res.json(payload);
}

function GetAllUsersByGender(req, res) {
  const allUsersData = users;

  const query = req.query; //{gender: 'male'}
  const gender = query.gender;

  const filteredUsers = allUsersData.filter((user) => {
    if (user.gender === gender) {
      return true;
    }
    return false;
  });

  const payload = {
    success: true,
    data: filteredUsers,
    size: filteredUsers.length,
  };

  res.json(payload);
}

function GetUserByName(req, res) {
  const param = req.params;
  const allUsersData = users;

  const searchedName = param.name;

  const user = allUsersData.find((user) => {
    if (user.name === searchedName) {
      return true;
    }
    return false;
  });

  const payload = {
    success: true,
    data: user,
    size: 1,
  };
  res.json(payload);
}

module.exports = {
  GetAllUsersV1,
  GetAllUsersV2,
  GetAllUsersByGender,
  GetUserByName,
};
