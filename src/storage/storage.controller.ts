import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Account } from './storage.decorator';
import { SetDataDTO } from './storage.dto';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {

    constructor(private readonly storageService: StorageService){}

    @Post()
    async setValue(@Body() setDataDTO: SetDataDTO, @Account("account") account: string){
        return (this.storageService.setData(setDataDTO, account));
    }

    @Get()
    async getValue(@Account("account") account: string){
        return (this.storageService.getData(account));
    }
}
