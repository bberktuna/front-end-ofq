import React from 'react'
import {Provider as URQLProvider, createClient, dedupExchange, fetchExchange} from "urql"
import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache"
//navigation
import { createStackNavigator } from '@react-navigation/stack';
//import {navigationRef} from "./src/navigation/RootNavigation"
import {NavigationContainer} from "@react-navigation/native"

import { Profile } from "./src/screens/Profile"
import { Home } from "./src/screens/Home/"
import { Login, Register } from "./src/screens/Login"
import { MeDocument, LoginMutation, MeQuery, useLoginMutation, RegisterMutation } from './src/generated/graphql';

const RootStack = createStackNavigator();

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query ) => Query
){
  return cache.updateQuery(qi, data => fn(result, data as any) as any)
}


const client = createClient({ 
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  exchanges: [
    dedupExchange, 
    fetchExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache, 
              {query: MeDocument} ,
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query
                } else {
                  return {
                    me: result.login.user
                  }
                }
              }
            )
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache, 
              {query: MeDocument} ,
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query
                } else {
                  return {
                    me: result.register.user
                  }
                }
              }
            )
          }
        }
        }
        
      }
    ) 
  ]
})

const App = () => {
  return (
<URQLProvider value={client}>
    <NavigationContainer /*ref={navigationRef}*/>

      <RootStack.Navigator initialRouteName="Login">
        {/*<RootStack.Screen name="Auth" component={Auth} options={{headerShown: false}} />*/}
        <RootStack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <RootStack.Screen name="Register" component={Register} options={{headerShown:false}}/>  
        <RootStack.Screen name="Home" component={Home} options={{headerShown:false}}/>  
        <RootStack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>  
      </RootStack.Navigator>

  </NavigationContainer>
</URQLProvider>

  )
}

export default App
