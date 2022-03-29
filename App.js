import React from 'react';
import * as encoding from "text-encoding";
import Android from "./APP/android/components/navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
	let [isFirst,setIsFirst] = React.useState(true)
	AsyncStorage.getItem("firstTime",(err,res)=>{
	if(err){
		console.log("error at app.js",err)
	}
	if(res == "false"){
		setIsFirst(false)
	}
	})
	return <Android isFirst={isFirst} />
};

export default App;
