import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example: "admin", description: "username"})
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({example: "admin", description: "username"})
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({example: "admin", description: "username"})
    @IsString()
    @IsNotEmpty()
    telegram_link: string;
    
    @ApiProperty({example: "admin", description: "username"})
    @IsString()
    @IsOptional()
    admin_photo: string;
    
    @ApiProperty({example: "JohnDoePassword12312#%_", description: "User password"})
    @MinLength(6)
    @IsStrongPassword()
    password: string
    
    @ApiProperty({example: "JohnDoePassword12312#%_", description: "User confirm password"})
    @MinLength(6)
    @IsStrongPassword()
    confirm_password: string
    
    @IsOptional()
    is_creator: boolean;
    
    @IsOptional()
    is_active: boolean;
}
