import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateComfortDto {
    @ApiProperty({example: "vip", description: "comfort type"})
    @IsString()
    @IsNotEmpty()
    name: string;
}
