import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import web3 from '../shared/web3.provider';
import { LoginDTO, SetDataDTO } from './storage.dto';
import * as jwt from "jsonwebtoken";
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

    async login(loginDTO: LoginDTO){
    
        const { account} = loginDTO;
        if(web3.utils.isAddress(account))
            return {"token" : await jwt.sign({account}, process.env.JWT_SECRET, { expiresIn: '7d' })} 
        else
            throw new HttpException('Invalid address', HttpStatus.BAD_REQUEST);
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

    async getData(account: string){
        try{
            const instance = await SimpleStorage.deployed();
            const value =  parseInt(await instance.storedData({from: account}));
            return {value};
        }catch(error){
            throw new HttpException('Invalid account', HttpStatus.BAD_REQUEST);
        }
    }
}
