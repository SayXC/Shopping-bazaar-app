import { StyleSheet } from "react-native";
import { Platform } from "react-native";

import Colors from "../Colors/Colors";

const ProfileStyle = StyleSheet.create({
    container: {

        ...Platform.select({
            android: {
                backgroundColor: Colors.profile,

                marginTop: 20,
                padding: 60,
                paddingVertical: 80,
                paddingHorizontal: 20,
                paddingTop: 50,
                
                borderRadius: 50,
                shadowColor: Colors.black,
                shadowOffset: {
                    width: 10,
                    height: 55,
                    padding: 40,
                },
                shadowOpacity: 1,
                shadowRadius: 50,
                elevation: 19,
            },

            default: {
                backgroundColor: Colors.rgba,
                flex: 1,
                top: 30,
                padding: 80,
                paddingTop: 30,
                paddingVertical: 100,
                paddingHorizontal: 30,
                paddingBottom: 150,
                borderRadius: 30,
                shadowColor: Colors.black,
                shadowOffset: {
                    width: 10,
                    height: 10,
                    padding: 20,
                },
                shadowOpacity: 0.8,
                shadowRadius: 40,
                elevation: 15,

                bottom: 50,
                left: 250,
                right: 80,
                width: "70%",

            },
        }),
    },
    Font: {

        ...Platform.select({
            android: {
                fontSize: 15,
                // paddingHorizontal: 50,
            },

            default: {
                fontSize: 15,
            },
        }),

        fontWeight: "bold",
        color: Colors.black,
        // top: 50,
    },
    FontSpace: {
        paddingHorizontal: 30,
    },
    IconSpace: {
        ...Platform.select({
            android: {
                top: -1,
            },
            default: {
                top: -1,
            },
        })
    },
    Line: {
        top: 10,
        ...Platform.select({
            android: {
                backgroundColor: Colors.black,
                height: 1,
                width: "100%",
            },
            default: {
                backgroundColor: Colors.grey,
                height: 0.5,
            }
        })
    },
    View: {
        flexDirection: "row",
        // marginTop: 20,
        ...Platform.select({
            android: {
                marginTop: 20,
            },
            default: {
                marginTop: 30,
            },
        }),
    },
    ProfileImage: {
        ...Platform.select({
            android: {
                width: 50,
                height: 40,
                top: -10,
            },
            default: {
                width: 60,
                height: 70,
                top: -10,
            }
        })
    },
    ProfileName: {
        ...Platform.select({
            android: {
                top: -10,
                fontSize: 20,
            },
            default: {
                top: 10,
                fontSize: 30,
            }
        })
    }
})

export default ProfileStyle;