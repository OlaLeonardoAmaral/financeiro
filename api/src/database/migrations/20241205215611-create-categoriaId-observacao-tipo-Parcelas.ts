import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
    await queryInterface.addColumn("Parcelas", "categoriaId", {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "Categorias",
            key: "id",
        },
    });

    await queryInterface.addColumn("Parcelas", "observacao", {
        type: DataTypes.STRING,
        allowNull: true,
    });

    await queryInterface.addColumn("Parcelas", "tipo", {
        type: DataTypes.ENUM("Receita", "Despesa"),
        allowNull: true,
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn("Parcelas", "categoriaId");
    await queryInterface.removeColumn("Parcelas", "observacao");
    await queryInterface.removeColumn("Parcelas", "tipo");
}