import { ImageStyle } from 'react-native'

const isDarkMode = false

const ColorsDark = {
    White: '#000',
    Black: '#FFF',
    Background: '#000',
    DarkGray: '#212121',
    Primary: '#6a1b9a',
    CardBackground: '#333333',
    StatusBar: 'light-content',
    Red: '#fe4f5a'
}

const ColorsLight = {
    White: '#FFF',
    Black: '#000',
    Background: '#f7f8fa',
    DarkGray: '#FFF',
    Primary: '#6a1b9a',
    CardBackground: '#f5f5f5',
    StatusBar: 'dark-content',
    Red: '#fe4f5a'
}

export const Colors = isDarkMode ? ColorsDark : ColorsLight

export function ResizeImage (width: number, imageWidth: number, imageHeight: number) : ImageStyle {
    return {
        resizeMode: 'contain',
        width: width,
        height: imageHeight * (width / imageWidth)
    }
}