import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import {Stadium} from "../../stadium/models/stadium.model";

interface ICategory {
    readonly name: string;
    readonly parentId: number;
}


@Table({tableName: "category",})
export class Category extends Model<Category, ICategory> {
    @ApiProperty({example: 1, description: "Unique ID"})
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;
    @ApiProperty({example: "Football", description: "Category Name"})
    @Column({
        type: DataType.STRING,
    })
    name: string;
    @ApiProperty({example: 3, description: "Category ID"})
    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
        onDelete: "CASCADE",
    })
    parentId: number
    @BelongsTo(() => Category)
    parentCategory: Category

    @HasMany(() => Stadium)
    stadiums: Stadium[]
}
