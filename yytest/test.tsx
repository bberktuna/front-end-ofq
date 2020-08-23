//REGISTERRRRRRRRRRRRRR
import React from 'react'
import { View, StyleSheet } from "react-native"
import {LoginForm, NavLink} from "../../components/"
import { useMutation } from 'urql'

interface registerProps {}

const REGISTER_MUT = `
mutation Register($username: String!, $password: String!) {
    register(options:{username: $username, password: $password})
    {
      errors {
          field 
          message
        }
      user {
          id 
          username 
          createdAt 
        }
    }
  }
`

const Register: React.FC<registerProps> = ({navigation}, props ) => {


    const [, register] = useMutation(REGISTER_MUT)
   // const listener = navigation.addListener('blur', clearErrorMessage);//baska screene gececekken addlistener


return (
    <View style={styles.container}>

        <LoginForm 
        //errorMessage={state.errorMessage}
        submitButtonText="Kayıt Ol"
        onSubmit={() => {}}//or just signup
        />

        <NavLink 
        text="Allready have an account? Sign in instead!"
        routeName="Login"
        />
            
    </View>
    )
}


const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    }
})
export {Register}

//LOOGINNNN
import React from 'react'
import { View, StyleSheet} from "react-native"
import {LoginForm, NavLink} from "../../components/"
import { useMutation } from 'urql'


interface loginProps{}
    
const Login: React.FC<loginProps> = ({navigation}, props) => {

    //const listener = navigation.addListener('blur', clearErrorMessage);

    return (

    <View style={styles.container}>


        <LoginForm
        //errorMessage={state.errorMessage}
        submitButtonText="Giriş Yap"
        onSubmit={() => {}}//or just signup
        />

        <NavLink 
        text="Don't have an account? Sign up instead!"
        routeName="Register"
        />
            
    </View>
    )
}



const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        
    }
})


//export {Login}




//-------------------N EW R REGISTER
import React, {useState} from 'react'
import { View, StyleSheet,TextInput, TouchableOpacity, Text } from "react-native"
import { useMutation } from 'urql'
import { useRegisterMutation } from '../../generated/graphql'

interface registerProps {

}



const Register: React.FC<registerProps> = ( { errorMessage, onSubmit, submitButtonText, navigation}: any ) => {

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


        {/* errorMessage ? (
            <Text style={styles.errorMessageStyle}> {errorMessage} </Text>) : null
        */}

            <TouchableOpacity                
                onPress={async (values) => {
                    const response = await register(values)
                    response.data?.register?.user?.id
                }}
            >
                <Text style={styles.intext}> REGISTER </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                >
                <Text style={styles.allreadyAcc}>Already have an account? Login!</Text>
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

//export {Register}

//- last formik

<Formik
initialValues={{ username: '', password: "" }}
onSubmit={async (values, {setErrors}) => {
    const response = await register(values)
    if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
    }
}}
>


{({ handleChange, handleBlur, handleSubmit, values }) => (
<View>
    <TextInput
    onChangeText={handleChange('username')}
    onBlur={handleBlur('username')}
    value={values.username}
    />

    <TextInput
    onChangeText={handleChange('password')}
    onBlur={handleBlur('password')}
    value={values.password}
    />
    <Button onPress={handleSubmit} title="Submit" />
</View>
)}


</Formik>