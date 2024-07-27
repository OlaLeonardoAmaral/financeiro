import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    Default,
    BelongsTo,
} from "sequelize-typescript";
import Categorias from "./Categorias";
import User from "./User";

@Table
class Transacoes extends Model<Transacoes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    data: Date;

    @ForeignKey(() => Categorias)
    @Column(DataType.UUID)
    categoriaId: string;

    @BelongsTo(() => Categorias)
    categoria: Categorias;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => User)
    user: User

    @Column
    tipo: string;

    @Column
    observacao: string;

    @Column
    valor: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Transacoes;
