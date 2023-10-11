import { ApiProperty } from "@nestjs/swagger";
import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import { Region } from "src/region/models/region.model";
import {Stadium} from "../../stadium/models/stadium.model";

interface IDistrict {
    readonly name: string;
    readonly region_id: number;
}

@Table({tableName: 'district'})
export class District extends Model<District, IDistrict> {
    @ApiProperty({example: 1, description: 'Unique ID'})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;
    @ApiProperty({example: 'Yunusobod', description: 'District Name'})
    @Column({
        type: DataType.STRING,
    })
    name: string;
    @ApiProperty({example: 3, description: 'Region ID'})
    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER, onDelete: 'CASCADE'
    })
    region_id: number;
    @BelongsTo(() => Region)
    region: Region;

    @HasMany(() => Stadium)
    stadiums: Stadium[]
}
