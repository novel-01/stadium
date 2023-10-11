import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IBot {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: boolean
}

@Table({tableName: 'bot'})
export class Bot extends Model<Bot, IBot> {
    @ApiProperty({example: 123141, description: 'user_id'})
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true
    })
    user_id: number;
    
    @ApiProperty({example: "UserName", description: 'username'})
    @Column({
        type: DataType.STRING,
    })
    username: string;
    
    @ApiProperty({example: "Jhonn", description: 'First name',})
    @Column({
        type: DataType.STRING,
    })
    first_name: string
    
    @ApiProperty({example: "Doe", description: 'Last name',})
    @Column({
        type: DataType.STRING,
    })
    last_name: string
    
    @ApiProperty({example: "+998912210990", description: 'Phone Number',})
    @Column({
        type: DataType.STRING,
    })
    phone_number: string
    
    @ApiProperty({example: true, description: 'Status',})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    status: boolean
}
