import * as axios from 'axios';
import config from '../../config.json'
import AsyncStorage from "@react-native-async-storage/async-storage";

function getheader(){
    AsyncStorage.getItem("login_token",(err,result)=>{
        if(result){
            return {Authorization:"Token "+result}
        }
        else return ;
    })
}
var mainBackend = axios.create({ 
    baseURL: String(config.baseURL),
    Headers:  getheader()
})

export { mainBackend };