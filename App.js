import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar, View } from 'react-native';
import { Colors } from './src/Layout';
import Service from './src/services/Service' // Just configure Axios
import TabNavigator from './src/views/TabNavigator'
import LoginStack from './src/stacks/LoginStack'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { navigationRef } from './src/views/RootNavigation';
import { StackOptions as HomeStackOptions } from './src/stacks/HomeStack'
import { StackOptions as LoginStackOptions } from './src/stacks/LoginStack'
import UserService from './src/services/UserService';
import {AuthContext} from './src/stacks/Context'
import { Text } from './src/components/Styled';
import SplashScreen from './src/views/SplashScreen';
import FlashMessage from 'react-native-flash-message'

const Stack = createStackNavigator()

export default function App() {
	const [isLogged, setLogged] = useState(false)
	const [token, setToken] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		fetchToken()
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}, [])

	const fetchToken = async () => {
		const token = await UserService.getToken()
		setToken(token)
		if (token)
			setLogged(true)
	}

	const authContext = useMemo(() => {
		return {
			setLogged: (logged) => {
				setLogged(logged)
			}
		}
	}, [])

	return (
		<AuthContext.Provider value={authContext}>
			<FlashMessage position="top" />
			<StatusBar barStyle={Colors.StatusBar}></StatusBar>
			{
				loading ? (
					<SplashScreen />
				) : (
					<NavigationContainer ref={navigationRef}>
					<Stack.Navigator>
						{
							isLogged ? (
								<Stack.Screen name="HomeStack" component={TabNavigator} options={HomeStackOptions} />
							) : (
								<Stack.Screen name="LoginStack" component={LoginStack} options={LoginStackOptions} />
							)
						}
					</Stack.Navigator>
				</NavigationContainer>
				)
			}
		</AuthContext.Provider>
	);
}