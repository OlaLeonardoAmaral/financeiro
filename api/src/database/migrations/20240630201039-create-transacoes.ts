import { QueryInterface, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Transacoes", {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
        allowNull: false
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoriaId: {
        type: DataTypes.UUID,
        references: { model: "Categorias", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },
      observacao: {
        type: DataTypes.TEXT,
      },
      valor: {
        type: DataTypes.DECIMAL,
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
    return queryInterface.dropTable("Transacoes");
  }
};
