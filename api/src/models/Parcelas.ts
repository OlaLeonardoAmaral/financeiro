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
import User from "./User";

@Table
class Parcelas extends Model<Parcelas> {
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

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

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Parcelas;