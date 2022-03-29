import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import BottomNavigator from "../Navigation/BotomNavigator";
import OnBoardScreen from "./OnBoardScreen";

export default MainPage = () => {
    let [screen, setscreen] = React.useState();
    AsyncStorage.getItem("firstRun", (err, res) => {
        if (res == "true") {
            return <BottomNavigator />
        }
        else {
            return <OnBoardScreen />
        }
        if (err) {
            console.log(err)
        }
    })

}