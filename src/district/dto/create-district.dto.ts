import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateDistrictDto {
    @ApiProperty({example: 'Yunusobod', description: 'District Name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 1, description: "Region ID"})
    @IsNumber()
    @IsNotEmpty()
    region_id: number;
}
