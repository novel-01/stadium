import { District } from './../../district/models/district.model';
import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import {Stadium} from "../../stadium/models/stadium.model";

interface IRegion {
    readonly name: string
}

@Table({tableName: 'region'})
export class Region extends Model<Region, IRegion> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number
    @ApiProperty({example: 'Tashkent', description: 'Region name'})
    @Column({
        type: DataType.STRING,
    })
    name: string
    @HasMany(() => District)
    districts: District[]


    @HasMany(() => Stadium)
    stadiums: Stadium[]
}
