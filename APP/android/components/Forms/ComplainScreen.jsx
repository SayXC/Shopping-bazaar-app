import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {View ,SafeAreaView,Text,ScrollView,StyleSheet,TextInput,TouchableOpacity} from "react-native";
import Colors from '../../../Configs/Colors/Colors';
import {navigationRef} from "./Modal"
import { mainBackend } from '../../../Configs/MainBackend';
import AsyncStorage from "@react-native-async-storage/async-storage";
function ComplainScreen(){
	let [title,setTitle] = React.useState("")
	let [des,setDes] = React.useState("")
	let [log ,setlog] = React.useState("")
	function submit(){
		if(title==""){
			setlog("enter title")
			return;
		}
		if(des==""){
			setlog("enter title")
			return;
		}
		else{
			AsyncStorage.getItem("login_token",(err,res)=>{
				mainBackend.post("/user/complaint/",{description :des,title},{headers:{Authorization:"Token "+res}})
				.then(Response=>{
					if(Response.status==200){
						alert("complaint registered!")
						navigationRef.navigate("Home")
					}
				})
				.catch(err=>{
					console.log(err.request.status)
				})

			})
		}

	}

	return (
		<SafeAreaView style={{ paddingHorizontal: 40, flex: 1, backgroundColor: Colors.white, }}>
			<ScrollView   showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
				<View style={{ backgroundColor: Colors.white, flex: 1 }}>
					<View style={style.header}>
						<Icon name='arrow-back-ios'	size={28}	onPress={navigationRef.goBack}	>
						<Text style={{ fontSize: 20,color:Colors.black ,fontWeight:"bold"}}>
							COMPLAIN HERE
						</Text>
                        </Icon>
                    </View>
                </View>
					<View style={{borderRadius:15,borderWidth:2,}}>
						<TextInput onChangeText={text=>setTitle(text)} style={{padding:20,margin:20,marginBottom:0,fontSize:20}} placeholder='Title Of Complaint' />
						<TextInput onChangeText={text=>setDes(text)} style={{padding:20,margin:20,marginBottom:200,marginTop:10,fontSize:20}} placeholder='Explain your problem briefly here ...' multiline numberOfLines={5} />
					</View>
					<Text style={{fontSize:20,color:"rgb(255,0,0)",fontWeight:"bold"}} >
						{log}
					</Text>
					<TouchableOpacity onPress={ _=>submit()}>
						<Text style={{backgroundColor:"rgb(0, 95, 102)",color:"#ffffff",textAlign:"center",fontSize:30,marginTop:10,marginBottom:10,borderRadius:18}}>OK</Text>
					</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
const style = StyleSheet.create({
	header: {
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 1,
		marginTop: 10,
	},
});
export default ComplainScreen;