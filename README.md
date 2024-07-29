# Node Permission

A role and permission management system for Node.js, inspired by spatie/laravel-permission.

## Installation

```sh
npm install node-permission

## Usage

const { User, Role, Permission, assignRoleToUser, assignPermissionToUser, createRole, createPermission } = require('node-permission');

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true });

async function setup() {
  const readPermission = await createPermission('read');
  const writePermission = await createPermission('write');

  const adminRole = await createRole('admin', [readPermission._id, writePermission._id]);

  const user = new User({ name: 'John Doe' });
  await user.save();

  await assignRoleToUser(user._id, adminRole._id);

  const hasRole = await user.hasRole('admin');
  console.log(`User has admin role: ${hasRole}`); // true

  const hasPermission = await user.hasPermission('read');
  console.log(`User has read permission: ${hasPermission}`); // true
}

setup();
