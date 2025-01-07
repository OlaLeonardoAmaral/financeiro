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
  Default,
  HasMany
} from "sequelize-typescript";
import { hash, compare } from "bcryptjs";
import Transacoes from "./Transacoes";
import Categorias from "./Categorias";

@Table
class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @HasMany(() => Transacoes)
  transacoes: Transacoes[];

  @HasMany(() => Categorias)
  categorias: Categorias[];

  @Column
  name: string;

  @Column
  email: string;

  @Column(DataType.VIRTUAL)
  password: string;

  @Column
  passwordHash: string;

  @Default(0)
  @Column
  tokenVersion: number;

  @Column
  firstName: string;

  @Column
  secondName: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeUpdate
  @BeforeCreate
  static hashPassword = async (instance: User): Promise<void> => {
    if (instance.password) {
      instance.passwordHash = await hash(instance.password, 8);
    }
  };

  public checkPassword = async (password: string): Promise<boolean> => {
    return compare(password, this.getDataValue("passwordHash"));
  };
}

export default User;
