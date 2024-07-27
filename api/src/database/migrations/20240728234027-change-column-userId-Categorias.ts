import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.changeColumn("Categorias", "userId", {
      type: DataTypes.UUID,
      allowNull: false,
    });

    await queryInterface.changeColumn("Categorias", "userId", {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    });    
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn("Categorias", "userId", {
      type: DataTypes.UUID,
      allowNull: true
    });
  }
};
