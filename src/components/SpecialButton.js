import React from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native'
import { Text } from './Styled'
import Icon from 'react-native-vector-icons/AntDesign'

export default class SpecialButton extends React.Component {

    render() {

        let hasBackground = this.props.color ? {backgroundColor: this.props.color} : undefined
        let hasIcon = this.props.icon ? {justifyContent : 'space-between'} : {justifyContent: 'center'}
        let isFFF = this.props.color && this.props.color == '#FFF' ? {borderWidth: 2, borderColor: '#9e9e9e'} : undefined

        return (
            <TouchableOpacity onPress={() => {
                if (this.props.onPress)
                    this.props.onPress()
            }} style={{...styles.largeButton, 
            ...hasBackground, ...this.props.style, ...hasIcon, ...isFFF}}>
                {
                    this.props.icon ? <Icon color={isFFF ? '#9e9e9e' : '#FFF'} size={32} name={this.props.icon} /> : <></>
                }
                {
                    this.props.isLoading ?
                    <ActivityIndicator size='small' color={isFFF ? '#9e9e9e' : '#FFF'} /> : (
                        <Text weight='medium' style={{...styles.buttonText, ...{color: isFFF ? '#9e9e9e' : '#FFF'}}}>{this.props.text}</Text>
                    )
                }
            </TouchableOpacity>
        )
    }
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    largeButton: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#8c7ae6',
        height: 60,
        borderRadius: 100,
        width: width - 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 100,
        paddingLeft: 100,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20
    }
})