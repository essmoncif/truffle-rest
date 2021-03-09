import { IsInt, IsNotEmpty, Min } from "class-validator";

export class SetDataDTO {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    value : number;
}