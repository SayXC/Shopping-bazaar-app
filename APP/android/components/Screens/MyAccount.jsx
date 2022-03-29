import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePage from "./Profile/ProfilePage"
import Signup from "../Forms/Signup"

export default function ({islogedin}){
        if(islogedin){
            return <ProfilePage/>
        }
        else{
            return <Signup/>
        }
}