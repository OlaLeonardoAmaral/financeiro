import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.addColumn("Transacoes", "data", {
      type: DataTypes.DATE,
      allowNull: true,
    });

    await queryInterface.sequelize.query(
      `UPDATE transacoes SET data = createdAt`
    );

    await queryInterface.changeColumn("Transacoes", "data", {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("Transacoes", "data");
  }
};
