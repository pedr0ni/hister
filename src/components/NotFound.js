import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { ResizeImage, Colors } from '../Layout'
import { Text } from './Styled'

export default class NotFound extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.holder}>
                <Image source={require('../../assets/not_found.png')} style={ResizeImage(300, 612, 408)} />
                <Text weight='medium' style={styles.title}>Nada por aqui :(</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    holder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 18
    }
})