import React from 'react'
import HomeScreen from '../views/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import CategoryScreen from '../views/CategoryScreen'
import {BookScreen} from '../views/BookScreen'

const HomeStack = createStackNavigator()

export const HomeStackScreen: React.FC = () => {

	return (
		<>
			<HomeStack.Navigator>
				<HomeStack.Screen name="Home" component={HomeScreen} />
				<HomeStack.Screen name="Category" component={CategoryScreen} />
				<HomeStack.Screen name="Book" component={BookScreen} />
			</HomeStack.Navigator>
		</>
	);
}

