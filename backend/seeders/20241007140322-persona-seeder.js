'use strict';
/** @type {import('sequelize-cli').Migration} */
const { User, Ciudade } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {

    const user = await User.findOne({ where: { email: "useradmin@gmail.com" } });
    const ciudade = await Ciudade.findOne({ where: { ciudade_nombre: "Villarrica" } });

    return queryInterface.bulkInsert("Personas", [
      {
        nombre: "Sofia",
        apellido: "Spaini",
        slug: "sofia-spaini",
        dni: "154123",
        telefono: "0241000",
        fecha_nacimiento: "2000-02-02",
        sexo: "femenino",
        direccion: "barrio centro",
        edad: 24,
        user_id: user.id,
        ciudade_id: ciudade.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
  }
};
