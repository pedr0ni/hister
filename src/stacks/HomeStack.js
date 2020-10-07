import React from 'react'
import HomeScreen from '../views/HomeScreen'
import { Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Colors, ResizeImage } from '../Layout'
import CategoryScreen from '../views/CategoryScreen'
import BookScreen from '../views/BookScreen'
import FlashMessage from 'react-native-flash-message'

const HomeStack = createStackNavigator()

export const StackOptions = ({route}) => ({
    headerStyle: {
        backgroundColor: Colors.DarkGray,
    },
    headerLeft: null,
    headerTitle: <Image source={require('../../assets/logo.png')} style={ResizeImage(140, 800, 300)}/> 
})

export default function HomeStackScreen({navigation}) {

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

