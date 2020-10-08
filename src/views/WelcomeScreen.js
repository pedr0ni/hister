import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import SpecialButton from '../components/SpecialButton'
import { Text } from '../components/Styled'
import { ResizeImage } from '../Layout'

export default function WelcomeScreen({navigation}) {

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/library.png')} style={ResizeImage(width - 120, 1200, 1200)} />
            <Text style={styles.title} weight='bold'>O que é o Hister?</Text>
            <Text weight='regular' style={styles.subtitle}>O hister é uma plataforma gratuita para consumo de livros online.
                Uma coleção diversa com mais de 11 mil livros à sua disposição!</Text>
            
            <SpecialButton onPress={() => navigation.navigate('RegisterScreen')} text='REGISTRAR' />
            <View style={styles.textHolder}>
                <Text weight='medium'>Já possui uma conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.loginText} weight='bold'>Efetuar Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: 60
    },
    title: {
        fontSize: 26,
        color: '#303952',
        marginTop: 15
    },
    subtitle: {
        fontSize: 14,
        color: '#757575',
        marginTop: 25,
        marginBottom: 25,
        textAlign: 'center'
    },
    textHolder: {
        display: 'flex',
        flexDirection: 'row'
    },
    loginText: {
        color: '#8c7ae6'
    }
})