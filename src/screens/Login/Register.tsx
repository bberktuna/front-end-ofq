import React, {useState} from 'react'
import { View, StyleSheet,TextInput, TouchableOpacity, Text, Button } from "react-native"
import { useRegisterMutation } from '../../generated/graphql'
import { toErrorMap } from '../../utils/toErrorMap';




const Register = ( { errorMessage, onSubmit, submitButtonText, navigation}: any ) => {

    const [, register] = useRegisterMutation()
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

            <TouchableOpacity                
                onPress={async (username: any, password: any) => {
                    const response = await register(username, password);
                    if (response.data?.register.errors) {
                      (toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                      // worked
                      navigation.navigate("Login")
                    }
                  }}
            >
                <Text style={styles.intext}> REGISTER </Text>
            </TouchableOpacity>

            {<TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                >
                <Text style={styles.allreadyAcc}>Already have an account? Login!</Text>
            </TouchableOpacity>
            }
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

export {Register}
