import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn('Transacoes', 'valor', {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    });
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.changeColumn('Transacoes', 'valor', {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    });
  }
};
