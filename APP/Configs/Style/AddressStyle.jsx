import { StyleSheet } from "react-native";
import { Platform } from "react-native";

import Colors from "../Colors/Colors";

const AddressStyle = StyleSheet.create({
    container: {
        ...Platform.select({
            flex: 1,
            android: {
                backgroundColor: Colors.rgba,

                padding: 15,
                /* paddingTop: 20,
                paddingRight: 80,
                paddingLeft: 80,
                paddingBottom: 80,
                top: 30,
                bottom: 50,
                left: 200,
                right: 80, */

                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.grey,
                /* shadowColor: Colors.black,

                shadowOffset: {
                    width: 10,
                    height: 10,
                    padding: 20,
                },
                shadowOpacity: 1,
                shadowRadius: 40,
                elevation: 15, */
                // width: "70%",
                // justifyContent: "center",
                // alignItems: "flex-start",
            },
            default: {
                flex: 1,
                backgroundColor: Colors.rgba,

                paddingTop: 20,
                paddingRight: 80,
                paddingLeft: 80,
                paddingBottom: 80,
                top: 30,
                bottom: 50,
                left: 200,
                right: 80,

                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.grey,
                shadowColor: Colors.black,

                shadowOffset: {
                    width: 10,
                    height: 10,
                    padding: 20,
                },
                shadowOpacity: 0.8,
                shadowRadius: 40,
                elevation: 15,
                width: "70%",
                justifyContent: "center",
                alignItems: "left",
            },
        })
    },

    /* */

    //! --------------------------Address----------------------------

    address: {
        ...Platform.select({
            android: {
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",

                padding: 15,

                borderBottomWidth: 1,
                // borderWidth: 1,
                borderBottomColor: Colors.black,
            },
            default: {
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "left",

                padding: 30,

                borderBottomWidth: 1,
                // borderWidth: 1,
                borderBottomColor: Colors.black,

            }
        })
    },
    SingleAddress: {
        ...Platform.select({
            android: {
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "flex-start",

                padding: 10,

                borderBottomWidth: 1,
                // borderWidth: 1,
                borderBottomColor: Colors.black,
            },
            default: {
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "left",

                padding: 30,

                borderBottomWidth: 1,
                borderBottomColor: Colors.black,
            }
        })
    },
    addresscol: {
        // top: 10,
        ...Platform.select({
            android: {
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",

                paddingHorizontal: 20,
            },
            default: {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "left",

                paddingHorizontal: 30,
            }
        })
    },

    addresslabel: {
        ...Platform.select({
            android: {
                fontSize: 15,
                color: Colors.black,
                fontWeight: "bold",
            },
            default: {
                fontSize: 18,
                color: Colors.black,
                fontWeight: "bold",
            }
        }),
    },

    //!------------------------Fonts/Text------------------------

    Font: {
        ...Platform.select({
            android: {
                fontSize: 10,
                fontWeight: "bold",
                color: Colors.white,
            },
            default: {
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.white,
                // top: 50,
            },
        })
    },

    Text: {
        ...Platform.select({
            android: {
                color: Colors.black,
                backgroundColor: Colors.white,
                fontSize: 18,
                fontWeight: "bold",

                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: Colors.black,

                paddingVertical: 10,
                marginVertical: 10,
                paddingHorizontal: 50,

            },
            default: {
                color: Colors.black,
                backgroundColor: Colors.white,
                fontSize: 18,
                fontWeight: "bold",

                borderWidth: 1.5,
                borderRadius: 5,
                borderColor: Colors.black,

                paddingVertical: 10,
                marginVertical: 5,
                paddingHorizontal: 15,
                // marginHorizontal: 10,
                // top: 50,

            }
        })
    },
    state: {
        ...Platform.select({
            android: {
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Colors.black,
            },
            default: {
                paddingHorizontal: 60,
                paddingVertical: 5,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Colors.black,
                /* marginLeft: 10,
                marginRight: 10, */

            }
        })
    },
    //!------------------------Line------------------------
    Line: {
        top: 10,
        ...Platform.select({
            android: {
            },
            default: {
                backgroundColor: Colors.grey,
                height: 0.5,
                width: "50%",
            }
        })
    },

    //!------------------------error------------------------
    errors: {
        ...Platform.select({
            android: {
                color: Colors.danger,
                fontSize: 15,
                fontWeight: "bold",
            },
            default: {
                color: Colors.danger,
                fontSize: 15,
                fontWeight: "bold",
                top: 10,
                left: 10,
            }
        })
    },
    //!------------------------Buttons------------------------
    buttonText: {
        ...Platform.select({
            android: {
                color: Colors.white,
                fontSize: 18,
                fontWeight: "bold",
                
            },
            default: {
                color: Colors.white,
                fontSize: 18,
                fontWeight: "bold",
                left: 10,
                top: 10,
            }
        })
    },
    button: {
        ...Platform.select({
            flex: 1,
            android: {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.primary,
                borderColor: Colors.black,
                borderRadius: 10,
                borderWidth: 1,
                paddingTop: 20,
                paddingRight: 40,
                paddingLeft: 40,
                paddingBottom: 20,
                // bottom: 10,
            },
            default: {
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "left",
                backgroundColor: Colors.primary,
                borderColor: Colors.black,
                borderRadius: 10,
                borderWidth: 1,
                paddingTop: 20,
                paddingRight: 80,
                paddingLeft: 80,
                paddingBottom: 20,
                bottom: 10,
                /*  
                marginVertical: 5,
                paddingHorizontal: 50,
                marginHorizontal: 10,               
                left: 10, 
                paddingVertical: 10,
                paddingTop: 20,
                paddingRight: 80,
                paddingLeft: 80,
                paddingBottom: 80,
                padding: 10,
                */
                /* left: 20,
                right: 80, */
            }
        })
    },


})

export default AddressStyle;