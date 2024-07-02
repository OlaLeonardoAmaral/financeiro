import {
    Table,
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    DataType,
    BeforeCreate,
    BeforeUpdate,
    PrimaryKey,
    ForeignKey,
    AutoIncrement,
    Default,
    HasMany,
    BelongsTo,
    BelongsToMany
} from "sequelize-typescript";
import Categorias from "./Categorias";

@Table
class Transacoes extends Model<Transacoes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @ForeignKey(() => Categorias)
    @Column(DataType.UUID)
    categoriaId: string;

    @BelongsTo(() => Categorias)
    categoria: Categorias;

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
