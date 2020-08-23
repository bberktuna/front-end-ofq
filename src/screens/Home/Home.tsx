import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useMeQuery } from '../../generated/graphql'


export const Home = ({navigation}:any) => {
    const [{data, fetching}] = useMeQuery()
    let body = null


    if( fetching ){  //data is loading

    }
    else if(!data?.me) {  //if user not logged in
        body = (
            <View></View>
        )
    }
    else {  // user is logged in
        body = (
        <View style= {{flex: 1}}>
            <Text>{data.me.username}</Text>
            <TouchableOpacity
            >
                <Text>LOG OUT</Text>
            </TouchableOpacity>
        </View>
        )
    }


    return (
        <View style={{flex: 1}}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
            >
                <Text>GO TO PROFILE</Text>
            </TouchableOpacity>
        </View>
    )
}
