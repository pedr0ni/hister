import React from 'react'
import { Container } from '../components/Styled'
import { ScrollView, View, RefreshControl, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import BooksService from '../services/BooksService'
import {Text} from '../components/Styled'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {SpecialButton} from '../components/SpecialButton'
import Icon from 'react-native-vector-icons/AntDesign'
import { Book } from '../models/Book'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Category } from '../models/Category'

export default function CategoryScreen() {

    const navigation = useNavigation()

    const route = useRoute<RouteProp<Record<string, Category>, string>>();

    const [category, setCategory] = React.useState<Category>(route.params)
    const [books, setBooks] = React.useState<Array<Book>>([])
    const [search, setSearch] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [pagination, setPagination] = React.useState({})
    
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        setBooks([])
        loadBooks()
        setPage(page => page + 1) // Crazy react call
    }, [])

    const loadBooks = async (shouldLoad = true)  => {
        if (shouldLoad)
            setLoading(true)

        const response = await BooksService.listByCategory(category, page)

        if (response) {
            books.push(...response.data.books)
            setBooks(books)
            setPagination(response.data.pagination)
        }

        setLoading(false)
    }

    const loadMore = async () => {
        setButtonLoading(true)
        setPage(page + 1)
        await loadBooks(false)
        setButtonLoading(false)
    }

    const gotoBook = (book: Book) => {
        navigation.navigate('Book', book)
    }

    return (
        <Container>
            <ScrollView refreshControl={
                <RefreshControl refreshing={loading} onRefresh={() => loadBooks()}></RefreshControl>
            }>
                <View style={styles.holder}>
                    <View style={styles.titleHolder}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={{uri: category.image}} style={{width: 32, height: 32, marginRight: 5}} />
                            <Text style={styles.title} weight='bold'>{category.name}</Text>
                        </View>
                        { 
                            loading ? 
                            <SkeletonPlaceholder speed={1200}>
                                <SkeletonPlaceholder.Item>
                                    <SkeletonPlaceholder.Item width={140} height={40} borderRadius={12} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder> :
                            <Text style={styles.subtitle} weight='regular'>{pagination.results} livros</Text>
                        }
                        
                    </View>

                    <View style={styles.inputHolder}>
                        <TextInput autoCapitalize='none' placeholder='Buscar' style={styles.input} value={search} 
                            onChangeText={(text) => setSearch(text)} />
                        <Icon style={styles.inputIcon} name='search1' color='#303952' size={22} />
                    </View>

                    {
                        loading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 , 14, 15].map(entry => {
                                return (
                                    <SkeletonPlaceholder speed={1200}>
                                        <SkeletonPlaceholder.Item flex={1} width={300}>
                                            <SkeletonPlaceholder.Item width={width - 40} height={80} borderRadius={12} marginBottom={15} />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder>
                                )  
                            })
                        ) : (
                            <>
                                <View style={styles.cardHolder}>
                                    {
                                        books.map(entry => {
                                            return (
                                                <TouchableOpacity onPress={() => gotoBook(entry)} key={entry._id} style={styles.card}>
                                                    <Image style={styles.cardIcon} source={require('../../assets/book.png')} />
                                                    <View style={styles.cardTextHolder}>
                                                        <View style={{marginBottom: 15}}>
                                                            <Text weight='medium' style={styles.cardTitle}>{entry.title}</Text>
                                                            <Text style={{width: width - 134}} weight='light'>{entry.authors}</Text>
                                                        </View>
                                                        <Text weight='regular'>{entry.publisher}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>

                                <SpecialButton isLoading={buttonLoading} onPress={loadMore} text='Carregar mais...' />
                            </>
                        )
                    }
                </View>
            
            </ScrollView>
        </Container>
    )
    
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        padding: 20
    },
    title: {
        color: '#8c7ae6',
        fontSize: 32
    },
    input: {
        height: 60,
        width: width - 40,
        backgroundColor: '#f2f3f7',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    inputHolder: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    inputIcon: {
        position:'absolute',
        paddingRight: 15
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
    },
    titleHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subtitle: {
        fontSize: 26,
        color: '#616161'
    }
})