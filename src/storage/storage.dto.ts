import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class SetDataDTO {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    value : number;
}

export class LoginDTO {
    @IsNotEmpty()
    @IsString()
    account : string;
}