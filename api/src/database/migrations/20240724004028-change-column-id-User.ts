import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.changeColumn("Users", "id", {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn("Users", "id", {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    });
  }
};
