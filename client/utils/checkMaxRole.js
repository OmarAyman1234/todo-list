function checkMaxRole(userRoles) {
  //User = 1
  //Admin = 2
  //Owner = 3
  let maxRole = 1;

  userRoles.forEach((role) => {
    if (role === "Owner") maxRole = 3;
    else if (role === "Admin") maxRole = 2;
  });

  return maxRole;
}

export default checkMaxRole;
