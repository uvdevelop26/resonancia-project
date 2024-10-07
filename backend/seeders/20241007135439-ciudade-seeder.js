'use strict';
const { Departamento } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const departamento = await Departamento.findOne({ where: { departamento_nombre: "Guaira" } })

    return queryInterface.bulkInsert("Ciudades", [
      {
        ciudade_nombre: "Villarrica",
        departamento_id: departamento.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ciudade_nombre: "Mbocayaty",
        departamento_id: departamento.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ciudade_nombre: "Mauricio José Troche",
        departamento_id: departamento.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ciudade_nombre: "Natalicio Talavera",
        departamento_id: departamento.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ciudade_nombre: "Colonia Independencia",
        departamento_id: departamento.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {

  }
};
