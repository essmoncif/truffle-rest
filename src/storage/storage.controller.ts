import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { SetDataDTO } from './storage.dto';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {

    constructor(private readonly storageService: StorageService){}

    @Post()
    async setValue(@Body() setDataDTO: SetDataDTO, @Req() request){
        const {account} = request.headers;
        return this.storageService.setData(setDataDTO, account);
    }
}
