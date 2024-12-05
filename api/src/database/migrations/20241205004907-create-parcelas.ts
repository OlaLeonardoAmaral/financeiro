import { QueryInterface, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable("Parcelas", {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
        allowNull: false
      },
      transacaoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Transacoes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false
      },
      foiRecebida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      numeroParcela: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalParcelas: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable("Parcelas");
  }
};