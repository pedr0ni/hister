import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { ResizeImage } from '../Layout'
import UserService from '../services/UserService'

export default function SplashScreen() {

    return (
        <View style={styles.holder}>
            <Image source={require('../../assets/logo.png')} style={ResizeImage(320, 100, 800)} />
        </View>
    )
}

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})