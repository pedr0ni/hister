import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Animated, View } from 'react-native'
import Swipeout from 'react-native-swipeout'
import {SpecialButton} from '../components/SpecialButton'
import { Container, Text } from '../components/Styled'
import { ResizeImage } from '../Layout'
import { Book } from '../models/Book'
import CartService from '../services/CartService'
import { CartContext } from '../stacks/Context'

export const CartScreen: React.FC = () => {

    const navigation = useNavigation()

    const [books, setBooks] = React.useState<Array<Book>>([])
    const [price, setPrice] = React.useState<string>('0.00')
    const [widthAnim, setWidthAnim] = React.useState(new Animated.Value(-500)) 

    const cartContext = React.useContext(CartContext)

    React.useEffect(() => {
        loadCart()
        
        navigation.addListener('focus', (payload) => {
            loadCart()
            setWidthAnim(new Animated.Value(-500))
            handleAnimation()
        })

        handleAnimation()
    }, [widthAnim])

    const handleAnimation = () => {
        if (books.length > 0) return
        Animated.timing(
            widthAnim,
            {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true
            },
        ).start();
    }

    const loadCart = async () => {
        const cart = await CartService.getCart()
        setBooks(cart)
        let calc = 0
        await cart.forEach(entry => {
            calc += entry.price
        })
        setPrice(calc.toFixed(2))
        cartContext?.setItems(cart.length)
    }

    return (
        <Container style={styles.holder}>
            <View style={{       borderBottomColor: '#e9e9e9',
        borderBottomWidth: 2,
        borderRadius: 2, padding: 20}}>
                <View style={styles.titleHolder}>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 60}}>
                        <Text style={styles.title} weight='bold'>Carrinho</Text>
                        <Text weight='light'>{books.length} items</Text>
                    </View>
                    
                    <Text style={styles.subtitle} weight='regular'>R$ {price}</Text>
                </View>
                {
                    books.length > 0 ? (
                        <View>
                            <SpecialButton text='Fechar pedido' />
                            <SpecialButton color='#FFF' icon='apple1' text='Apple Pay' />
                        </View>
                    ) : <></>
                }
            </View>

            {
                books.length > 0 ? (
                    <ScrollView contentContainerStyle={styles.cardHolder} showsVerticalScrollIndicator={false}>
                        {
                            books.map(entry => {
                                return (
                                    <Swipeout style={{backgroundColor: '#f7f8fa'}} autoClose={true} right={[{
                                        onPress: async () => {
                                            await CartService.removeItem(entry)
                                            await loadCart()
                                            setWidthAnim(new Animated.Value(-500))
                                            handleAnimation()
                                        },
                                        text: 'Delete', type: 'delete',
                                    }]} rowId={1}>
                                        <View  style={styles.card} key={entry._id}>
                                            <Image style={styles.cardIcon} source={require('../../assets/book.png')} />
                                            <View style={styles.cardTextHolder}>
                                                <View style={{marginBottom: 15}}>
                                                    <Text weight='medium' style={styles.cardTitle}>{entry.title}</Text>
                                                    <Text style={{width: width - 134}} weight='light'>{entry.authors}</Text>
                                                </View>
                                                <Text weight='regular'>{entry.publisher}</Text>
                                                <Text style={{color: '#616161'}} weight='light'>R$ {entry.price}</Text>
                                            </View>
                                        </View>
                                    </Swipeout>
                                )
                            })
                        }
                    </ScrollView>
                ) : (
                    <Animated.View style={{...styles.emptyHolder, transform: [{translateX: widthAnim}]}}>
                        <Image source={require('../../assets/shopping-cart.png')} style={{...ResizeImage(248, 512, 512)}} />
                    </Animated.View>
                )
            }
        </Container>
    )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    holder: {

    },
    titleHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    title: {
        color: '#8c7ae6',
        fontSize: 32
    },
    subtitle: {
        fontSize: 26,
        color: '#000'
    },
    cardHolder: {
        display: 'flex',
        flexDirection: 'column'
    },
    card: {
        width: width,
        borderBottomWidth: 2,
        borderBottomColor: '#e9e9e9',
        borderRadius: 4,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    cardTitle: {
        fontSize: 16,
        color: '#2c3e50',
        width: width - 134 // (64px image + 40px margin + 10px margin)
    },
    cardIcon: {
        width: 64,
        height: 64,
        marginRight: 10
    },
    cardTextHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    emptyHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [
            {translateX: -500}
        ]
    }
})