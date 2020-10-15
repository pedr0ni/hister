import React from 'react'
import { TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Image, ViewStyle } from 'react-native'
import { Text } from './Styled'
import Icon from 'react-native-vector-icons/AntDesign'

export interface IProps {
    color?: string,
    icon?: string,
    onPress?: any,
    isLoading?: boolean,
    text: string,
    style?: ViewStyle
}

export const SpecialButton: React.FC<IProps> = ({color, icon, onPress, style, text, isLoading}) => {

    let hasBackground = color ? {backgroundColor: color} : undefined
    let hasIcon : ViewStyle = icon ? { justifyContent: 'space-between' } : { justifyContent: 'center' }
    let isFFF = color && color == '#FFF' ? {borderWidth: 2, borderColor: '#9e9e9e'} : undefined

    return (
        <TouchableOpacity onPress={() => onPress()} style={{...isFFF, ...styles.largeButton, ...hasIcon, ...hasBackground, ...style}}>
            {
                icon ? <Icon color={isFFF ? '#9e9e9e' : '#FFF'} size={32} name={icon} /> : <></>
            }
            {
                isLoading ?
                <ActivityIndicator size='small' color={isFFF ? '#9e9e9e' : '#FFF'} /> : (
                    <Text weight='medium' style={{...styles.buttonText, ...{color: isFFF ? '#9e9e9e' : '#FFF'}}}>{text}</Text>
                )
            }
        </TouchableOpacity>
    )
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
        color: '#fff'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20
    }
})