import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateUserWalletDto {
    @ApiProperty({example: 50000, description:"Amount of user wallet"})
    @IsNumber()
    @IsNotEmpty()
    wallet: number;
    @ApiProperty({example: 2, description:"User ID"})
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
