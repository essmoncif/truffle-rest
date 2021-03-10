import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class SetDataDTO {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @ApiProperty({
        description: "Value",
        type: Number
    })
    value : number;
}

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Accout address",
        type: String
    })
    account : string;
}