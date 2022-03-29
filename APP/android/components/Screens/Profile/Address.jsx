import React from 'react';
import { Text, View, SafeAreaView, Pressable, FlatList, Modal, Picker, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

import { mainBackend } from "../../../../Configs/MainBackend"
import Colors from '../../../../Configs/Colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialIcons";
import STYLES from "./../../../../Configs/Style/formStyles";
import { navigationRef } from "../../Forms/Modal"

function SingleAddress({ item }) {
    return (
        <View style={{ borderRadius: 10, alignItems: "center", borderStyle: "solid", borderColor: "rgb(0,0,0)", borderWidth: 1, margin: 10, backgroundColor: "#ffffff", }}>
            <Text style={{ fontWeight: "bold", fontSize: 17, margin: 5 }} >{item.item.Name}  {item.item.Phone_number} </Text>
            <Text style={{ margin: 10 }}>{item.item.Landmark} {item.item.Regein} {item.item.Town} {item.item.State} {item.item.Pincode}</Text>
        </View>
    )
}

export default function Address() {
    let [addresses, setAddres] = React.useState();
    let [name, setName] = React.useState("");
    let [number, setNumber] = React.useState();
    let [town, setTown] = React.useState("");
    let [pincode, setPincode] = React.useState("");
    let [Region, setRegion] = React.useState("");
    let [landmark, setlandmark] = React.useState("");
    let [state, setState] = React.useState("");
    let [AddressType, setAddressType] = React.useState("");
    let [shit, setShit] = React.useState(false);
    let [visiblity, setVisibility] = React.useState(false)




    let [errlog, setErrorLog] = React.useState({})



    function Validation() {
        let res = { valid: true }
        let phone_pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (name == "") {
            res.namlog = "please enter proper name for your address"
            res.valid = false
        }
        if (number == "" || number == null || isNaN(number) || number.length != 10) {
            res.numberlog = "please enter proper number"
            res.valid = false
        }
        if (town == "") {
            res.townLog = "please enter proper name for Town"
            res.valid = false
        }
        if (pincode == "" || pincode == null || isNaN(pincode) || pincode.length != 6) {
            res.pincodeLog = "please enter proper pincode"
            res.valid = false
        }
        if (state == "") {
            res.statelog = "please select proper state"
            res.valid = false
        }
        if (AddressType == "") {
            res.addressTypeLog = "please select proper Address Type"
            res.valid = false
        }
        if (Region == "") {
            res.reignlog = "please enter proper Region Details"
        }
        return res;
    }

    function addAddress() {
        let result = Validation();
        if (!result.valid) {
            setErrorLog(result)
        }
        else {
            setErrorLog("")
            AsyncStorage.getItem("login_token", (err, res) => {
                mainBackend.post("/resident/setAddress/", {
                    state,
                    name,
                    Phone_number: number,
                    pincode,
                    regien: Region,
                    landmark,
                    town,
                    address_type: AddressType
                }, { headers: { Authorization: "Token " + res } }).then(response => {
                    if (response.status == 202) {
                        setVisibility(false)
                        alert("success")
                        setShit(false)
                    }
                })
            })
        }
    }

    React.useEffect(() => {

        AsyncStorage.getItem("login_token", (err, res) => {
            if (err) {
                console.log(err)
            }
            if (res) {
                mainBackend.get("/resident/getAddress/", { headers: { Authorization: "Token " + res } }).then(Response => {
                    setAddres(Response.data)
                    setShit(true)
                })
            }
        })
    }, [shit])

    return (
        <SafeAreaView>
            <Modal animationType='slide' transparent={false} visible={visiblity} >
                <ScrollView>
                    <TouchableOpacity onPress={() => {
                        setErrorLog("")
                        setVisibility(false)
                    }}>
                        <Icon name='close' color="#000000" size={40} />
                    </TouchableOpacity>

                    <View style={{ margin: 5 }}>
                        <View>
                            <TextInput onChangeText={text => setName(text)} style={{ fontSize: 20, margin: 10 }} placeholder='Enter Name for your address' autoComplete={name} />
                            <Text style={{ color: "#ff0000" }}>{errlog.namlog}</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={text => setNumber(text)} style={{ fontSize: 20, margin: 10 }} placeholder='Phone number of recipent on this address' autoCompleteType='tel' keyboardType='number-pad' />
                            <Text style={{ color: "#ff0000" }}>{errlog.numberlog}</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={text => setRegion(text)} style={{ fontSize: 20, margin: 10 }} placeholder='Address' multiline={true} autoComplete='postal-address' />
                            <Text style={{ color: "#ff0000" }}>{errlog.reignlog}</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={text => setTown(text)} style={{ fontSize: 20, margin: 10 }} placeholder='town' />
                            <Text style={{ color: "#ff0000" }}>{errlog.townLog}</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={text => setPincode(text)} style={{ fontSize: 20, margin: 10 }} placeholder='Pincode' keyboardType='number-pad' autoComplete='postal-code' />
                            <Text style={{ color: "#ff0000" }}>{errlog.pincodeLog}</Text>
                        </View>
                        <View>
                            <TextInput onChangeText={text => setlandmark(text)} style={{ fontSize: 20, margin: 10 }} placeholder='Landmark optional*' />
                        </View>
                        <View >
                            <Picker selectedValue={state} onValueChange={(itemValue, itemindex) => setState(itemValue)} style={{ height: 50, width: 200 }}>
                                <Picker.Item label='Select State' value='' />
                                <Picker.Item label='Andhra Pradesh' value='AP' />
                                <Picker.Item label='Arunachal Pradesh' value='AR' />
                                <Picker.Item label='Assam' value='AS' />
                                <Picker.Item label='Bihar' value='BR' />
                                <Picker.Item label='Chhattisgarh' value='CT' />
                                <Picker.Item label='Goa' value='GA' />
                                <Picker.Item label='Gujarat' value='GJ' />
                                <Picker.Item label='Haryana' value='HR' />
                                <Picker.Item label='Himachal Pradesh' value='HP' />
                                <Picker.Item label='Jharkhand' value='JH' />
                                <Picker.Item label='Karnataka' value='KA' />
                                <Picker.Item label='Kerala' value='KL' />
                                <Picker.Item label='Madhya Pradesh' value='MP' />
                                <Picker.Item label='Maharashtra' value='MH' />
                                <Picker.Item label='Manipur' value='MN' />
                                <Picker.Item label='Meghalaya' value='ML' />
                                <Picker.Item label='Mizoram' value='MZ' />
                                <Picker.Item label='Nagaland' value='NL' />
                                <Picker.Item label='Orissa, Odisha' value='OR' />
                                <Picker.Item label='Punjab, Punjab (India)' value='PB' />
                                <Picker.Item label='Rajasthan' value='RJ' />
                                <Picker.Item label='Sikkim' value='SK' />
                                <Picker.Item label='Tamil Nadu, Tamizh Nadu' value='TN' />
                                <Picker.Item label='Telangana' value='TG' />
                                <Picker.Item label='Tripura' value='TR' />
                                <Picker.Item label='Uttarakhand' value='UL' />
                                <Picker.Item label='Uttar Pradesh' value='UP' />
                                <Picker.Item label='West Bengal' value='WB' />
                                <Picker.Item label='Andaman and Nicobar Islands' value='AN' />
                                <Picker.Item label='Chandigarh' value='CH' />
                                <Picker.Item label='Dadra and Nagar Haveli, Dadra & Nagar Haveli' value='DN' />
                                <Picker.Item label='Daman and Diu' value='DD' />
                                <Picker.Item label='Delhi, National Capital Territory of Delhi' value='DL' />
                                <Picker.Item label='Jammu and Kashmir' value='JK' />
                                <Picker.Item label='Ladakh' value='LA' />
                                <Picker.Item label='Lakshadweep' value='LD' />
                                <Picker.Item label='Pondicherry, Puducherry' value='PY' />
                            </Picker>
                            <Text style={{ color: "#ff0000" }}>{errlog.statelog}</Text>
                        </View>
                        <View >
                            <Picker selectedValue={AddressType} onValueChange={(itemValue, itemindex) => setAddressType(itemValue)} style={{ height: 50, width: 200 }}>
                                <Picker.Item label='Address type' value='' />
                                <Picker.Item label='home' value='home' />
                                <Picker.Item label='office' value='office' />
                            </Picker>
                            <Text style={{ color: "#ff0000" }}>{errlog.addressTypeLog}</Text>
                        </View>
                        <TouchableOpacity onPress={addAddress}>
                            <View style={STYLES.btnPrimary}>
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, }}	>
                                    Add Address
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigationRef.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Cart
                </Text>
            </View>
            <View>
                <TouchableOpacity onPress={_ => setVisibility(true)} style={{ marginHorizontal: 40, height: 30, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ color: "rgb(0,0,0)", marginTop: 4 }}>Create new Address</Text>
                </TouchableOpacity >
            </View>
            <View>

                {addresses == [] ? <Text>There are no address of yours!</Text> : <FlatList data={addresses} renderItem={item => <SingleAddress item={item} />} keyExtractor={item => (item.id).toString()} />}

            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
});