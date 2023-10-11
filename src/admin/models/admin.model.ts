import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";


interface AdminAttrs {
    username: string;
    email: string;
    telegram_link: string;
    admin_photo: string;
    hashed_password: string;
    phone_number: string;
    is_creator: boolean;
    is_active: boolean;
    hasher_refresh_token: string;
}

@Table({tableName: "admin"})
export class Admin extends Model<Admin, AdminAttrs> {
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ApiProperty({example: 'adminnnn', description: "admin username"})
    @Column({
        type: DataType.STRING,
    })
    username: string
    
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.STRING,
        unique: true
    })
    hashed_password: string;
    
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.STRING,
    })
    telegram_link: string;
    
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.STRING,
        unique: true
    })
    email: string
    
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.STRING,
    })
    user_photo: string

    @ApiProperty({example: '+998912210990', description: "phone number"})
    @Column({
        type: DataType.STRING,
    })
    phone_number: string
    
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_creator: boolean
    
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean
    @ApiProperty({example: 1, description: "unikal ID"})
    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string
    @Column({
        type: DataType.STRING,
    })
    activation_link: string
}