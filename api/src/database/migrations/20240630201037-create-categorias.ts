import { QueryInterface, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Categorias", {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
        allowNull: false
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },     
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Categorias");
  }
};
