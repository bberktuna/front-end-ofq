import React, {useState} from 'react'
import { View, StyleSheet,TextInput, TouchableOpacity, Text } from "react-native"


const LoginForm = ( {headerText, errorMessage, onSubmit, submitButtonText}: any ) => {

    
    const [email , setEmail ] = useState("")
    const [password , setPassword ] = useState("")

    return (
    <View style={styles.container}>

            <Text> {headerText} </Text>

            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(newEmail) => setEmail(newEmail)}
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
                onPress={() => onSubmit({ email, password })}
                
                >
                <Text style={styles.intext}> {submitButtonText} </Text>
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

export {LoginForm}
