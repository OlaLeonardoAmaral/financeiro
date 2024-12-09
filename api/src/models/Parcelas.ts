import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    Default,
} from "sequelize-typescript";
import Transacoes from "./Transacoes";
import Categorias from "./Categorias";
import User from "./User";

@Table
class Parcelas extends Model<Parcelas> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @ForeignKey(() => Transacoes)
    @Column(DataType.INTEGER)
    transacaoId: number;

    @BelongsTo(() => Transacoes)
    transacao: Transacoes;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @Column(DataType.DATE)
    data: Date;

    @Default(false)
    @Column(DataType.BOOLEAN)
    foiRecebida: boolean;

    @Column(DataType.DECIMAL(10, 2))
    valor: number;

    @Column(DataType.INTEGER)
    numeroParcela: number;

    @Column(DataType.INTEGER)
    totalParcelas: number;

    @ForeignKey(() => Categorias)
    @Column(DataType.UUID)
    categoriaId: string;

    @BelongsTo(() => Categorias)
    categoria: Categorias;

    @Column(DataType.STRING)
    observacao: string;

    @Column(DataType.ENUM("Receita", "Despesa"))
    tipo: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Parcelas;