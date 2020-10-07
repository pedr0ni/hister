import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from '../stacks/HomeStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../Layout';
import ProfileScreen from '../views/ProfileScreen'
import CartScreen from './CartScreen';
import Icon from 'react-native-vector-icons/AntDesign'

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					
					const icons = {
						'home': 'home',
						'explorar': 'find',
						'meu perfil': 'user',
						'carrinho': 'shoppingcart'
					}

					// You can return any component that you like here!
					return <Icon name={icons[route.name.toLowerCase()]} size={size} color={color} />;
				},
				})}
				tabBarOptions={{
					activeTintColor: Colors.Primary,
					inactiveTintColor: 'gray',
					style: {
						backgroundColor: Colors.DarkGray
					}
				}}>
				<Tab.Screen name="Home" component={HomeStack} />
				<Tab.Screen name="Explorar" component={HomeStack} />
				<Tab.Screen name="Meu Perfil" component={ProfileScreen} />
				<Tab.Screen name="Carrinho" component={CartScreen} />
			</Tab.Navigator>
    )
}