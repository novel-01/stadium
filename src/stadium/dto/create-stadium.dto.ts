import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";
export class CreateStadiumDto {
    @ApiProperty({example: 1, description: "Category ID"})
    @IsNumber()
    @IsNotEmpty()
    category_id: number
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Mini Stadium", description: "Stadium Name"})
    name: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "10x10", description: "Stadium's Volume"})
    volume: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Metro Minor", description: "Stadium address"})
    address: string
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1, description: "Region ID"})
    region_id: number
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({example: 1, description: "District ID"})
    district_id: number
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Metro Minor near", description: "Stadium location"})
    location: string
    // @IsDate()
    @IsNotEmpty()
    @ApiProperty({example: "2023-10-04T05:34:10.901Z", description: "Stadium address"})
    builtAt: Date
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "14:00", description: "Start Time"})
    start_time: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "24:00", description: "End Time"})
    end_time: string
}
