import { Body, Controller, Get, Post,UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/auth.guard';
import { Account } from './storage.decorator';
import { LoginDTO, SetDataDTO } from './storage.dto';
import { StorageService } from './storage.service';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {

    constructor(private readonly storageService: StorageService){}



    @Post('/login')
    @ApiCreatedResponse({ description: 'The token has been successfully created.'})
    @ApiResponse({ status: 400, description: 'invalid address account !'})
    async login(@Body() loginDTO: LoginDTO){
        return this.storageService.login(loginDTO)
    }




    
    @Post()
    @ApiBody({
        description: "Set new value ",
        type: SetDataDTO,
    })
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'The value has been successfully updated.'})
    @ApiResponse({ status: 400, description: 'invalid value !'})
    @UseGuards(new AuthGuard())
    async setValue(@Body() setDataDTO: SetDataDTO, @Account("account") account){
        console.log(account)
        return (this.storageService.setData(setDataDTO, account));
    }





    
    @Get()
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'value inside a smart contract.'})
    @ApiResponse({ status: 400, description: 'invalid address account !'})
    @UseGuards(new AuthGuard())
    async getValue(@Account("account") account){
        console.log(account)
        return (this.storageService.getData(account));
    }
}
