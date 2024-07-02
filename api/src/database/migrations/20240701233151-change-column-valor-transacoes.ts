import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn('transacoes', 'valor', {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn('transacoes', 'valor', {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    });
  }
};
