import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useMeQuery, useLogoutMutation } from '../../generated/graphql'


export const Profile = () => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching}] = useMeQuery()


    return (
        <View style={{flex: 1}}>
            <TouchableOpacity
                onPress={() => {
                    logout()
                }}
            >
                <Text>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    )
}