import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import SpecialButton from '../components/SpecialButton'
import { Text } from '../components/Styled'
import CartService from '../services/CartService'
import Icon from 'react-native-vector-icons/AntDesign'
import { CartContext } from '../stacks/Context'

export default function BookScreen(props) {
    const [book, setBook] = React.useState(props.route.params)
    const [rating, setRating] = React.useState(0)

    const { updateItems } = React.useContext(CartContext)

    React.useEffect(() => {
        setRating(Math.floor(book.average_rating))
    }, [])

    const buy = async () => {

        if (await CartService.hasItem(book)) {
            showMessage({
                message: '😜',
                description: `O livro ${book.title} já está no seu carrinho.`,
                duration: 3000,
                type: 'warning'
            })

            return
        }

        showMessage({
            message: '🤑',
            description: `O livro ${book.title} foi adicionado ao carrinho.`,
            duration: 3000,
            type: 'success'
        })
        await CartService.addItem(book)
        const cart = await CartService.getCart()
        updateItems(cart.length)
    }

    return (
        <View>
            <View style={styles.iconHolder}>
                <Image style={styles.profileIcon} source={require('../../assets/book.png')} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.infoHolder}>
                    <Text style={styles.userName} weight='bold'>{book.title}</Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Icon name='team' size={24} color='#2d3436' />
                        </View>
                        <View>
                            <Text weight='light' style={styles.infoName}>Autores</Text>
                            <Text weight='medium' style={styles.infoValue}>{book.authors}</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Icon name='paperclip' size={24} color='#3498db' />
                        </View>
                        <View>
                            <Text weight='light' style={styles.infoName}>Editora</Text>
                            <Text weight='medium' style={styles.infoValue}>{book.publisher}</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Icon name='calendar' size={24} color='#e74c3c' />
                        </View>
                        <View>
                            <Text weight='light' style={styles.infoName}>Data de Publicação</Text>
                            <Text weight='medium' style={styles.infoValue}>{book.publication_date}</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Icon name='tago' size={24} color='#e67e22' />
                        </View>
                        <View>
                            <Text weight='light' style={styles.infoName}>Páginas</Text>
                            <Text weight='medium' style={styles.infoValue}>{book.num_pages}</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Icon name='creditcard' size={24} color='#2ecc71' />
                        </View>
                        <View>
                            <Text weight='light' style={styles.infoName}>Preço</Text>
                            <Text weight='medium' style={styles.infoValue}>R$ {book.price}</Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoIcon}>
                            <Icon name='staro' size={24} color='#f1c40f' />
                        </View>
                        <View>
                            <Text weight='light' style={styles.infoName}>Avaliação</Text>
                            <View style={styles.starHolder}>
                                {
                                    [1, 2, 3, 4, 5].map(entry => {
                                        return (
                                            <Icon key={entry} name={rating <= entry ? 'staro' : 'star'} size={24} color='#f1c40f' />
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>

                    <SpecialButton onPress={buy} icon='shoppingcart' text='Comprar' color={'#10ac84'} />
                </View>
            </ScrollView>
        </View>
    )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    iconHolder: {
        backgroundColor: '#8c7ae6',
        height: 160,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10
    },
    profileIcon: {
        width: 128,
        height: 128,
        position: 'absolute',
        top: 90,
        zIndex: 10
    },
    infoHolder: {
        marginTop: 80,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1,
        paddingBottom: 200
    },
    userName: {
        fontSize: 28,
        color: '#2c3e50',
        marginBottom: 30,
        textAlign: 'center'
    },
    infoCard: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width - 40
    },
    infoIcon: {
        backgroundColor: '#FFF',
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight: 20
    },
    infoName: {
        fontSize: 16
    },
    infoValue: {
        fontSize: 20,
        width: width - 100,
    },
    starHolder: {
        display: 'flex',
        flexDirection: 'row'
    }
})