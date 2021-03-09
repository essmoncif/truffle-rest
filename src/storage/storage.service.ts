import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import web3 from '../shared/web3.provider';
import { SetDataDTO } from './storage.dto';
import * as SimpleStorageArtifact from '../../build/contracts/SimpleStorage.json';
const TruffleContract = require('@truffle/contract')


const SimpleStorage = TruffleContract(SimpleStorageArtifact);
SimpleStorage.setProvider(web3.currentProvider);

@Injectable()
export class StorageService {
    
    private web3Provider;

    constructor(){
        this.web3Provider = web3;
    }

    async setData(data: SetDataDTO, account){
        try{
            const instance = await SimpleStorage.deployed();
            const {value} = data;
            const receipt = await instance.set(value, {from: account});
            const result = {
                "tx": receipt.tx,
                "message": "Data stored successfully!!"
            };
            return result;
        }catch(error){
            throw new HttpException('Invalid value', HttpStatus.BAD_REQUEST)
        }
    }
}
