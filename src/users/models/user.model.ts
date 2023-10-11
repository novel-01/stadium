import { UserWallet } from './../../user_wallet/models/user_wallet.model';
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import {Stadium} from "../../stadium/models/stadium.model";


interface UserAttrs {
    first_name: string;
    last_name: string;
    usernames: string;
    hashed_password: string;
    telegram_link: string;
    email: string;
    phone: string;
    user_photo: string;
    birthday: Date;
    is_owner: boolean;
    is_active: boolean;
    hasher_refresh_token: string;
}

@Table({tableName: "users"})
export class User extends Model<User, UserAttrs> {
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    @ApiProperty({example: "John", description: "First name"})
    @Column({
        type: DataType.STRING,
        // allowNull: false
    })
    first_name: string;
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false
    })
    last_name: string
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false
    })
    username: string
@ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false,
        unique: true
    })
    hashed_password: string;
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false
    })
    telegram_link: string;
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false,
        unique: true
    })
    email: string
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false,
        unique: true
    })
    phone: string
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
    })
    user_photo: string
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false,
    })
    birthday: Date
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        defaultValue: false
    })
    is_owner: boolean
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.STRING,
        defaultValue: false
    })
    is_active: boolean
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.STRING,
        // allowNull: false
    })
    hashed_refresh_token: string
    @Column({
        type: DataType.STRING,
    })
    activation_link: string

    @HasMany(() => UserWallet)
    user_wallets: UserWallet[]

    @HasMany(() => Stadium)
    stadiums: Stadium[]
}