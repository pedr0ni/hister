import React from 'react'
import { View, StyleSheet, Text as ReactText } from 'react-native'
import { Colors } from '../Layout'

export function Container(props) {
   return (
       <View style={{...styles.container, ...props.style}}>
           {props.children}
       </View>
   ) 
}

// import { useFonts, Montserrat_400Regular, Montserrat_500Medium, 
//     Montserrat_300Light, Montserrat_700Bold, Montserrat_100Thin } from '@expo-google-fonts/montserrat';

const fonts = {
    'regular': 'Montserrat_400Regular',
    'medium': 'Montserrat_500Medium',
    'light': 'Montserrat_300Light',
    'bold': 'Montserrat_700Bold',
    'thin': 'Montserrat_100Thin'
}

export function Text(props) {
    // let [fontsLoaded] = useFonts({
    //     Montserrat_400Regular,
    //     Montserrat_500Medium,
    //     Montserrat_300Light,
    //     Montserrat_700Bold,
    //     Montserrat_100Thin
    // });

    // if (!fontsLoaded) {
    //     return <ReactText>Not loaded</ReactText>
    // }

    let weight = !props.weight ? fonts['regular'] : fonts[props.weight]

    return (
        <ReactText style={{ ...{fontFamily: weight, fontFamily: 'Montserrat'}, ...props.style }}>{props.children}</ReactText>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background
    }
})