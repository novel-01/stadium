import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IComfort {
    readonly name: string
}

@Table({tableName: 'comfort'})
export class Comfort extends Model<Comfort, IComfort> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number
    @ApiProperty({example: 'Vip', description: 'Comfort Type'})
    @Column({
        type: DataType.STRING,
    })
    name: string
}
