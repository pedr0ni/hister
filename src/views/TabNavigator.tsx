import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {HomeStackScreen} from '../stacks/HomeStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../Layout';
import ProfileScreen from './ProfileScreen'
import {CartScreen} from './CartScreen';
import Icon from 'react-native-vector-icons/AntDesign'
import { CartContext } from '../stacks/Context'
import CartService from '../services/CartService';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

	const [items, setItems] = React.useState(0)
	
	React.useEffect(() => {
		loadCart()
	}, [])

	const loadCart = async () => {
		const cart = await CartService.getCart()
		setItems(cart.length)
	}

    return (
		<CartContext.Provider value={{items, setItems}}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let icon = 'home'

					switch (route.name.toLowerCase()) {
						case 'explorar':
							icon = 'find'
							break
						case 'meu perfil':
							icon = 'user'
							break
						case 'carrinho':
							icon = 'shoppingcart'
							break
					}


					return <Icon name={icon} size={size} color={color} />;
				},
				})}
				tabBarOptions={{
					activeTintColor: Colors.Primary,
					inactiveTintColor: 'gray',
					style: {
						backgroundColor: Colors.DarkGray
					}
				}}>
				<Tab.Screen name="Home" component={HomeStackScreen} />
				<Tab.Screen name="Explorar" component={HomeStackScreen} />
				<Tab.Screen name="Meu Perfil" component={ProfileScreen} />
				<Tab.Screen name="Carrinho" component={CartScreen} options={items > 0 ? {tabBarBadge: items} : {}} />
			</Tab.Navigator>
		</CartContext.Provider>
    )
}