'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs');
const { Role } = require('../models')


module.exports = {
  async up(queryInterface, Sequelize) {

    const hashedPassword = await bcrypt.hash('123456', 10);
    const role = await Role.findOne({ where: { role_nombre: "Administrador" } });

    return queryInterface.bulkInsert("Users", [
      {
        email: "useradmin@gmail.com",
        password: hashedPassword,
        profile_photo_path: null,
        role_id: role.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
  }
};
