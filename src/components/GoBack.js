import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export default class GoBack extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigator.navigate('WelcomeScreen')
           }} style={styles.backButtonHolder}>
               <Icon name="arrowleft" size={24} color='#34495e' />
           </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    backButtonHolder: {
        width: 50,
        height: 50,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})