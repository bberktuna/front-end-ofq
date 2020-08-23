import React, {useState} from 'react'
import { View, StyleSheet,TextInput, TouchableOpacity, Text } from "react-native"
import {useLoginMutation} from "../../generated/graphql"
import { toErrorMap } from '../../utils/toErrorMap';

const Login = ( { errorMessage, onSubmit, submitButtonText, navigation}: any ) => {

    const [, login] = useLoginMutation()
    const [username , setUsername ] = useState("")
    const [password , setPassword ] = useState("")

    return (
    <View style={styles.container}>


            <TextInput
                style={styles.input}
                value={username}
                onChangeText={(newUsername) => setUsername(newUsername)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={(newPassword) => setPassword(newPassword)}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={true}
            />


        {/* errorMessage ? (
            <Text style={styles.errorMessageStyle}> {errorMessage} </Text>) : null
        */}

            <TouchableOpacity                
                onPress={async (values, { setErrors }) => {
                    const response = await login({options: values});
                    if (response.data?.login.errors) {
                      setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                      // worked
                      navigation.navigate("Home")
                    }
                  }}
            >
                <Text style={styles.intext}> LOGIN </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                >
                <Text style={styles.allreadyAcc}>Don't have an account? Register!</Text>
            </TouchableOpacity>
    </View>
    )
}



const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,

    },
    input:{
        borderWidth:1,
        borderColor:"black",
        borderRadius:25,
        width:300,
        height:50,

    },
    intext:{
        height:50,
        alignSelf:"center",

    },
    errorMessageStyle:{
        fontSize:16,
        color:"red",
        marginLeft:15,
        marginTop:15
    },
    allreadyAcc:{
        color:"blue",

    }
})

export {Login}
