import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView,
     TouchableOpacity, Image, RefreshControl } from 'react-native'
import { Container, Text } from '../components/Styled'
import { Colors } from '../Layout'
import CategoriesService from '../services/CategoriesService'

const width = Dimensions.get('window').width

const Card: React.FC<{onPress: void, image: string, name: string}> = ({onPress, image, name}) => {
    return (
        <TouchableOpacity onPress={onPress} style={cardStyles.holder}>
            <Image style={cardStyles.icon} source={{uri: image}}/>
            <View style={cardStyles.textHolder}>
                <Text weight='medium' style={cardStyles.title}>{name}</Text>
                <Text weight='thin' style={cardStyles.subtitle}>Test</Text>
            </View>
        </TouchableOpacity>
    )
}

const cardStyles = StyleSheet.create({
    holder: {
        width: (width - 80) / 2,
        height: 170,
        backgroundColor: Colors.DarkGray,
        borderRadius: 10,
        padding: 5,
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2
    },
    icon: {
        width: 64,
        height: 64
    },
    title: {
        color: Colors.Black,
        marginBottom: 5,
        fontSize: 18
    },
    subtitle: {
        color: Colors.Black,
        fontSize: 14
    },
    textHolder: {
        backgroundColor: Colors.CardBackground,
        borderRadius: 10,
        padding: 5
    }
})

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            isRefreshing: true
        }

    }

    UNSAFE_componentWillMount() {
        this.loadCategories()
    }

    async loadCategories() {
        this.setRefreshing(true)
        const response = await CategoriesService.listAll()
        if (response)
            this.setState({categories: response.data})
        this.setRefreshing(false)
    }

    setRefreshing(isRefreshing) {
        this.setState({isRefreshing})
    }

    openCategory(category) {
        const { navigate } = this.props.navigation
        navigate('Category', category)
    }

    render() {
        return (
            <Container>
                <ScrollView refreshControl={
                    <RefreshControl onRefresh={() => this.loadCategories()}  refreshing={this.state.isRefreshing} />
                } contentContainerStyle={styles.holder}>
                    {this.state.categories.map((entry, key) => {
                        return <Card onPress={() => this.openCategory(entry)} name={entry.name} subtitle={entry.subtitle} image={entry.image} key={key}></Card>
                    })}
                </ScrollView>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    holder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }
})