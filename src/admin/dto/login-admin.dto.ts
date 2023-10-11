import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class LoginAdminDto {
    @ApiProperty({example: "example.com", description: "admin email"})
    @IsString()
    @IsNotEmpty()
    email: string
    
    @ApiProperty({example: "admin!@0990", description: "admin password"})
    @MinLength(6)
    @IsStrongPassword()
    password: string
}