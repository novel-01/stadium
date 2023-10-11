import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/models/user.model";

interface IUserWallet {
    readonly wallet: number;
    readonly userId: number;
}

@Table({tableName: "userwallet"})
export class UserWallet extends Model<UserWallet, IUserWallet> {
    @ApiProperty({example: 1, description: "Unuiqe ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    @ApiProperty({example: 50000, description: "Amount of user"})
    @Column({
        type: DataType.INTEGER,
    })
    wallet: number;
    @ForeignKey(() => User)
    @ApiProperty({example: 1, description: "User ID"})
    @Column({
        type: DataType.INTEGER,
        onDelete: "CASCADE",
    })
    userId: number;
    @BelongsTo(() => User)
    user: User;
}
