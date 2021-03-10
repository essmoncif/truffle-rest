import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';
import { Account } from './storage.decorator';
import { LoginDTO, SetDataDTO } from './storage.dto';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {

    constructor(private readonly storageService: StorageService){}

    @Post('/login')
    async login(@Body() loginDTO: LoginDTO){
        return this.storageService.login(loginDTO)
    }

    @UseGuards(new AuthGuard())
    @Post()
    async setValue(@Body() setDataDTO: SetDataDTO, @Account("account") account: string){
        return (this.storageService.setData(setDataDTO, account));
    }

    @UseGuards(new AuthGuard())
    @Get()
    async getValue(@Account("account") account: string){
        return (this.storageService.getData(account));
    }
}
