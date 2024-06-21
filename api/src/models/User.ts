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
import { hash, compare } from "bcryptjs";

@Table
class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    // @ForeignKey(() => Companies)
    // @Column
    // companyId: number;

    // @BelongsTo(() => Companies)
    // company: Companies;

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

    // @Default("admin")
    @Column
    profile: string;

    // @Column
    // profilePic: string;

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
