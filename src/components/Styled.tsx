import React from 'react'
import { View, StyleSheet, Text as ReactText, ViewStyle, TextStyle } from 'react-native'
import { Colors } from '../Layout'

export const Container: React.FC<{style?: ViewStyle}> = ({style, children}) =>{
   return (
       <View style={{...styles.container, ...style}}>
           {children}
       </View>
   ) 
}

export const Text: React.FC<{weight?: string, style?: ViewStyle | TextStyle}> = ({weight, style, children}) => {
    const [upperWeight, setUpperWeight] = React.useState<string | null>(null)

    React.useEffect(() => {
        setUpperWeight(weight ? `${weight.charAt(0).toUpperCase()}${weight.slice(1)}` : 'Regular')
    })

    return (
        <ReactText style={{ ...{fontFamily: `Montserrat${upperWeight ? `-${upperWeight}` : ''}`}, ...style }}>{children}</ReactText>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background
    }
})