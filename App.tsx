import React, { useState, useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { Colors } from './src/Layout';
import Service from './src/services/Service' // Just configure Axios
import TabNavigator from './src/views/TabNavigator'
import {LoginStackScreen} from './src/stacks/LoginStack'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { StackOptions as LoginStackOptions } from './src/stacks/LoginStack'
import UserService from './src/services/UserService';
import {AuthContext} from './src/stacks/Context'
import SplashScreen from './src/views/SplashScreen';
import FlashMessage from 'react-native-flash-message'
import { Text } from './src/components/Styled';

const Stack = createStackNavigator()

export default function App() {
	const [isLogged, setLogged] = useState<boolean>(false)
	const [token, setToken] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

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

	// const authContext = useMemo(() => {
	// 	return {
	// 		setLogged: (logged: boolean) => {
	// 			setLogged(logged)
	// 		}
	// 	}
	// }, [])

	return (
		<AuthContext.Provider value={{isLogged, setLogged}}>
			<FlashMessage position="top" />
			<StatusBar barStyle='dark-content'></StatusBar>
			{
				loading ? (
					<SplashScreen />
				) : (
					<NavigationContainer>
					<Stack.Navigator>
						{
							isLogged ? (
								<Stack.Screen name="HomeStack" component={TabNavigator} options={{title: 'Hister', headerTintColor: Colors.Primary}} />
							) : (
								<Stack.Screen name="LoginStack" component={LoginStackScreen} options={LoginStackOptions} />
							)
						}
					</Stack.Navigator>
				</NavigationContainer>
				)
			}
		</AuthContext.Provider>
	);
}