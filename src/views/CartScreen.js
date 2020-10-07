import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import SpecialButton from '../components/SpecialButton'
import { Container, Text } from '../components/Styled'
import CartService from '../services/CartService'

export default function CartScreen() {
    const [books, setBooks] = React.useState([])
    const [price, setPrice] = React.useState(0)

    React.useEffect(() => {
        loadCart()
    }, [])

    const loadCart = async () => {
        const cart = await CartService.getCart()
        setBooks(cart)
        let calc = 0
        await cart.forEach(entry => {
            calc += entry.price
        })
        setPrice(calc.toFixed(2))
    }

    return (
        <Container style={styles.holder}>
            <View style={{       borderBottomColor: '#e9e9e9',
        borderBottomWidth: 2,
        borderRadius: 2,}}>
                <View style={styles.titleHolder}>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 60}}>
                        <Text style={styles.title} weight='bold'>Carrinho</Text>
                        <Text weight='light'>2 items</Text>
                    </View>
                    
                    <Text style={styles.subtitle} weight='regular'>R$ {price}</Text>
                </View>
                <SpecialButton text='Fechar pedido' />
                <SpecialButton color='#FFF' icon='apple1' text='Apple Pay' />
            </View>

            <ScrollView contentContainerStyle={styles.cardHolder} showsVerticalScrollIndicator={false}>
                {
                    books.map(entry => {
                        return (
                            <View onPress={() => gotoBook(entry)} key={entry._id} style={styles.card}>
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
                        )
                    })
                }
            </ScrollView>
        </Container>
    )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    holder: {
        padding: 20
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
        width: width - 40,
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
    }
})