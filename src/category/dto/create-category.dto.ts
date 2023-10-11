import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateCategoryDto {
    @ApiProperty({example: "Category Name", description: "Category Name"})
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({example: 1, description: "Category ID"})
    @IsNumber()
    @IsOptional()
    parentId: number;
}
