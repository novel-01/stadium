import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Category} from "../../category/models/category.model";
import {User} from "../../users/models/user.model";
import {Region} from "../../region/models/region.model";
import {District} from "../../district/models/district.model";

interface IStadium {
    category_id: number,
    owner_id: number,
    name: string,
    volume: string,
    address: string,
    region_id: number,
    district_id: number,
    location: string,
    builtAt: Date,
    start_time: string,
    end_time: string,
    is_active: boolean
}

@Table({tableName: 'stadium'})
export class Stadium extends Model<Stadium, IStadium> {
    @ApiProperty({example: 1, description: "Unique ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }) id: number
    @ApiProperty({example: 1, description: "Category ID"})
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER, onDelete: "CASCADE"
    }) category_id: number
    @BelongsTo(() => Category)
    category: Category
    @ApiProperty({example: 1, description: "Owner ID"})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER, onDelete: "CASCADE"
    }) owner_id: number
    @BelongsTo(() => User)
    owner: User
    @ApiProperty({example: "Mini Stadium", description: "Stadium Name"})
    @Column({
        type: DataType.STRING
    }) name: string
    @ApiProperty({example: "10x10", description: "Stadium's Volume"})
    @Column({
        type: DataType.STRING
    }) volume: string
    @ApiProperty({example: "Metro Minor", description: "Stadium address"})
    @Column({
        type: DataType.STRING
    }) address: string
    @ApiProperty({example: 1, description: "Region ID"})
    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER, onDelete: "CASCADE"
    }) region_id: number
    @BelongsTo(() => Region)
    region: Region
    @ApiProperty({example: 1, description: "District ID"})
    @ForeignKey(() => District)
    @Column({
        type: DataType.INTEGER, onDelete: "CASCADE"
    }) district_id: number
    @BelongsTo(() => District)
    district: District
    @ApiProperty({example: "Metro Minor near", description: "Stadium location"})
    @Column({
        type: DataType.STRING
    }) location: string
    @ApiProperty({example: "2023-10-04T05:34:10.901Z", description: "Stadium address"})
    @Column({
        type: DataType.DATE
    }) builtAt: Date
    @ApiProperty({example: "14:00", description: "Start Time"})
    @Column({
        type: DataType.STRING
    }) start_time: string
    @ApiProperty({example: "24:00", description: "End Time"})
    @Column({
        type: DataType.STRING
    }) end_time: string
    @ApiProperty({example: true, description: "Stadium status"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    }) is_active: Boolean
}
