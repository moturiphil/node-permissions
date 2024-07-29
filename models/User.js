const mongoose = require('mongoose');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
});

userSchema.methods.hasRole = async function(roleName) {
  await this.populate('roles').execPopulate();
  return this.roles.some(role => role.name === roleName);
};

userSchema.methods.hasPermission = async function(permissionName) {
  await this.populate('permissions roles').execPopulate();
  const permissions = [...this.permissions];
  this.roles.forEach(role => {
    permissions.push(...role.permissions);
  });
  return _.some(permissions, { name: permissionName });
};

module.exports = mongoose.model('User', userSchema);