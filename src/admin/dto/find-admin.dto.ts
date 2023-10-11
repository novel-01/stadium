import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class FindAdminDto {
    @ApiProperty({example: "sfr", description: "usernamae"})
    @IsOptional()
    @IsString()
    username: string;
    
    @ApiProperty({example: "email@gamil.com", description: "admin email"})
    @IsOptional()
    @IsString()
    email: string;
    
    @ApiProperty({example: "sffaf", description: "telegram link"})
    @IsOptional()
    @IsString()
    telegram_link: string;
}