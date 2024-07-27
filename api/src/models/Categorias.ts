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
import Transacoes from "./Transacoes";
import User from "./User";

@Table
class Categorias extends Model<Categorias> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;   

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => User)
    user: User

    @Column
    titulo: string;

    @HasMany(() => Transacoes)
    transacoes: Transacoes[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}

export default Categorias;
