import React from 'react'
import HomeScreen from '../views/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import CategoryScreen from '../views/CategoryScreen'
import {BookScreen} from '../views/BookScreen'
import UserService from '../services/UserService'
import CartService from '../services/CartService'
import { CartContext } from './Context'

const HomeStack = createStackNavigator()

export const HomeStackScreen: React.FC = () => {

	const cartContext = React.useContext(CartContext)

	React.useEffect(() => {
		loadCart()
	}, [])

	const loadCart = async () => {
		const response = await UserService.fetchCart()

		if (response) {
			await CartService.setBooks(response.data)
			const cart = await CartService.getCart()
        	cartContext?.setItems(cart.length)
		}
	}

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

