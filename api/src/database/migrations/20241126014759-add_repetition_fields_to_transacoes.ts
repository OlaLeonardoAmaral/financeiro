import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        await queryInterface.addColumn('Transacoes', 'foiRecebida', {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        });

        await queryInterface.addColumn('Transacoes', 'repetir', {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });

        await queryInterface.addColumn('Transacoes', 'quantidadeRepeticoes', {
            type: DataTypes.INTEGER,
            allowNull: true,
        });

        await queryInterface.addColumn('Transacoes', 'periodoRepeticao', {
            type: DataTypes.ENUM('Mensal', 'Semanal'),
            allowNull: true,
        });
    },

    down: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
        await queryInterface.removeColumn('Transacoes', 'foiRecebida');
        await queryInterface.removeColumn('Transacoes', 'repetir');
        await queryInterface.removeColumn('Transacoes', 'quantidadeRepeticoes');
        await queryInterface.removeColumn('Transacoes', 'periodoRepeticao');
    },
};