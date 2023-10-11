import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOtp {
    id: string;
    otp: string;
    expiration_time: string;
    verified: boolean;
    chesk: string; //phone
}
@Table( { tableName: 'otp' } )
export class Otp extends Model<IOtp, Otp> {
    @ApiProperty( {example: '1234312121', description: 'OTP-ID'})
    @Column({type: DataType.UUID, primaryKey: true, allowNull: false})
    id: string;

    @ApiProperty( {example: '1234', description: 'OTP'})
    @Column({type: DataType.STRING, allowNull: false})
    otp: string;

    @ApiProperty( {example: '2022-01-21T08:10:10.000Z', description: 'expiration time'})
    @Column({type: DataType.DATE, allowNull: false})
    expiration_time: Date;

    @ApiProperty( {example: false, description: 'verified'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    verified: string;

    @ApiProperty( {example: '+9900000000', description: 'check phone number'})
    @Column({type: DataType.STRING, allowNull: false})
    chesk: string;   
}