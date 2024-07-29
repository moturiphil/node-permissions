const User = require('./models/User');
const Role = require('./models/Role');
const Permission = require('./models/Permission');

async function assignRoleToUser(userId, roleId) {
  const user = await User.findById(userId);
  user.roles.push(roleId);
  await user.save();
}

async function assignPermissionToUser(userId, permissionId) {
  const user = await User.findById(userId);
  user.permissions.push(permissionId);
  await user.save();
}

async function createRole(name, permissions = []) {
  const role = new Role({ name, permissions });
  await role.save();
  return role;
}

async function createPermission(name) {
  const permission = new Permission({ name });
  await permission.save();
  return permission;
}

module.exports = {
  User,
  Role,
  Permission,
  assignRoleToUser,
  assignPermissionToUser,
  createRole,
  createPermission
};