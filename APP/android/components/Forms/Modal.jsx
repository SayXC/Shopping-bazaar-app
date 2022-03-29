import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { Platform } from "react-native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { mainBackend } from "../../../Configs/MainBackend";
import Colors from "../../../Configs/Colors/Colors";
import STYLES from "../../../Configs/Style/formStyles";



export const navigationRef = createNavigationContainerRef()
export default function ModalTester(props) {
	
	

	let [otp, setOtp] = useState("");
	let [otpwarning, Setotpwarning] = useState("");
	return (
		<View style={styles.container}>
			<Modal isVisible={props.isVisible} style={styles.container} backdropOpacity={1} backdropColor="white" >
				<View style={styles.View}>
					<TextInput onChangeText={text => setOtp(text)} style={{alignSelf:"center",fontSize:40}} maxLength={6} placeholder='Enter the OTP' />
					<Text style={{ color: Colors.danger }}>{otpwarning}</Text>

					<TouchableOpacity>
						<View style={STYLES.btnPrimary}>
							<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, }} onPress={() => otpSubmit(otp, Setotpwarning)}>
								Sign Up
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Modal>
		</View>
	);
}

function otpSubmit(otp, setotpwarning) {
	if (isNaN(otp)) {
		setotpwarning("please enter valid number");
		return;
	}
	AsyncStorage.getItem("signup_token", (err, result) => {
		mainBackend
			.post("/user/confirm/", { token: result, otp: otp })
			.then(function (response) {
				switch (response.status) {
					case 202:
						alert("signup success");
						navigationRef.navigate("LogIn")
						break;

				}
			}).catch((response)=>{

				switch(response.request.status){
					case 410:
						alert("otp time expired try again");
					
						break;
					case 400:
						alert("oops something went wrong!");
				
						break;
					case 404:
						alert("nothing found!");
						break;
				}
				alert("something wrong happened")
				navigationRef.navigate("Home")
			})
			.finally(_=>{
				AsyncStorage.removeItem("signup_token")
			});
	});
}

const styles = StyleSheet.create({
	container: {
		marginTop: 150,
	},
	View: {
		...Platform.select({
			android: {

			}, // if android
			default: {
				padding: 400,
				paddingHorizontal: 500,
			}
		})
	}
});




