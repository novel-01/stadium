import {IsNotEmpty, IsPhoneNumber} from "class-validator";

export class PhoneAdminDto {
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone: string
}