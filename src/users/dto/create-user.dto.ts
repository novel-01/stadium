import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength, IsDateString } from "class-validator";




export class CreateUserDto {
    @ApiProperty({example: "John", description: "User first name"})
    @IsNotEmpty()
    @IsString()
    first_name: string
    @ApiProperty({example: "Doe", description: "User last name"})
    @IsNotEmpty()
    @IsString()
    last_name: string
    @ApiProperty({example: "JohnDoe", description: "Username"})
    @IsNotEmpty()
    @IsString()
    username: string
    @ApiProperty({example: "JohnDoePassword12312#%_", description: "User password"})
    @MinLength(6)
    @IsStrongPassword()
    password: string
    @ApiProperty({example: "JohnDoePassword12312#%_", description: "User confirm password"})
    @MinLength(6)
    @IsStrongPassword()
    confirm_password: string
    @ApiProperty({example: "John.gmail.com", description: "User email"})
    @IsEmail()
    email: string
    @ApiProperty({example: "+998912210990", description: "User phone number"})
    @IsPhoneNumber("UZ")
    phone: string
    @ApiProperty({example: "2000.01.01", description: "Birthday date"})
    @IsNotEmpty()
    @IsDateString()
    birthday: Date
    @ApiProperty({example: "telegram.me/safyurrr", description: "User telegram link"})
    @IsString()
    @IsNotEmpty()
    telegram_link: string
}