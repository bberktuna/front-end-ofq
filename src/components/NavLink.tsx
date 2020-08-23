import React from 'react'
import { View, StyleSheet,TextInput, TouchableOpacity, Text } from "react-native"
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ text, routeName}: any) => {

    const navigation = useNavigation()

    return(
    <TouchableOpacity
        onPress={() => navigation.navigate(routeName)}
        >
        <Text style={styles.allreadyAcc}>{text}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    allreadyAcc:{
        color:"blue",

    }
})

export {NavLink}

