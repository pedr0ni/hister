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

    let weight = !props.weight ? 'Regular' : props.weight
    weight = weight.charAt(0).toUpperCase() + weight.slice(1)

    return (
        <ReactText style={{ ...{fontFamily: `Montserrat-${weight}`}, ...props.style }}>{props.children}</ReactText>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background
    }
})