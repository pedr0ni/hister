import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FlashMessage from 'react-native-flash-message'

import {WelcomeScreen} from '../views/WelcomeScreen'
import {LoginScreen} from '../views/LoginScreen'
import {RegisterScreen} from '../views/RegisterScreen'

const LoginStack = createStackNavigator()

export const StackOptions = () => ({
    headerShown: false
})

export const LoginStackScreen: React.FC = () => {
    return (
        <>
            <FlashMessage position="top" />
            <LoginStack.Navigator>
                <LoginStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={StackOptions} />
                <LoginStack.Screen name="LoginScreen" component={LoginScreen} options={StackOptions} />
                <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} options={StackOptions} />
            </LoginStack.Navigator>
        </>
    );
}