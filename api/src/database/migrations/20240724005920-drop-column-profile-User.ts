import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.removeColumn("Users", "profile");    
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("Users", "profile", {
      type: DataTypes.STRING,
      allowNull: false,
    });
  }
};
