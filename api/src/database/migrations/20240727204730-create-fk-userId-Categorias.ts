import { QueryInterface, DataTypes, Sequelize } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface, sequelize: Sequelize) => {
    await queryInterface.addColumn("Categorias", "userId", {
      type: DataTypes.UUID,
      allowNull: true
    });

    const [users]: any = await queryInterface.sequelize.query(
      `SELECT id FROM Users LIMIT 1`
    );
    const userId = users[0].id;

    await queryInterface.sequelize.query(
      `UPDATE Categorias SET userId = :userId`,
      { replacements: { userId } }
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("Categorias", "userId");
  }
};
