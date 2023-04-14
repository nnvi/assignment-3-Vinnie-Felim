'use strict';

const { strictEqual } = require('assert');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Photos","User_id",{
      type:Sequelize.INTEGER
    }),

    await queryInterface.addConstraint("Photos",{
      fields: ["User_id"],
      type:"foreign key",
      name : "user_fk",
      references : {
        table:"Users",
        field:"id"
      },
      onDelete:"cascade",
      onUpdate:"cascade"
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Photos","User_id"),
    await queryInterface.removeConstraint("Photos","user_fk")
  }
};
