import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.addColumn("Users", "firstName", {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("Users", "firstName");
  }
};
