import React from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput, Dimensions } from 'react-native'
import { Text } from '../components/Styled'
import {SpecialButton} from '../components/SpecialButton'
import UserService from '../services/UserService'
import { AuthContext } from '../stacks/Context'
import Icon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen: React.FC = () => {

    const navigation = useNavigation()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const authContext = React.useContext(AuthContext)!

    const login = async () => {

        if (isLoading) return

        setLoading(true)

        const response = await UserService.authenticate({
            email, password
        })

        if (response) {
            UserService.setToken(response.data.token)
            authContext.setLogged(true)
        }

        setLoading(false)

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>

                <KeyboardAvoidingView style={styles.keyboardView}>
                    <Text weight='bold' style={styles.title}>Bem-vindo de volta 😄</Text>

                    <View style={styles.inputHolder}>
                        <TextInput autoCapitalize='none' placeholder='E-mail' style={styles.input} value={email} 
                            onChangeText={(text) => setEmail(text)} />
                        <Icon style={styles.inputIcon} name='mail' color='#303952' size={22} />
                    </View>
                    <View style={styles.inputHolder}>
                        <TextInput secureTextEntry={!showPassword} autoCapitalize='none' placeholder='Senha' style={styles.input} value={password} 
                            onChangeText={(text) => setPassword(text)} />
                        <Icon onPress={() => setShowPassword(!showPassword)} style={styles.inputIcon} name={showPassword ? 'unlock' : 'lock'} color='#303952' size={22} />
                    </View>
                    
                    <SpecialButton isLoading={isLoading} onPress={login} text='ENTRAR' />

                    <View style={styles.dividerHolder}>
                        <View style={styles.divider}></View>
                        <Text style={{color: '#9e9e9e'}}>OU</Text>
                        <View style={styles.divider}></View>
                    </View>

                    <SpecialButton color='#FFF' icon='google' text='Google' />

                    <SpecialButton color='#273c75' icon='facebook-square' style={{marginTop: -5}} text='Facebook' />
                </KeyboardAvoidingView>

            </View>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF'
    },
    keyboardView: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 25
    },
    title: {
        fontSize: 26,
        color: '#303952'
    },
    input: {
        height: 60,
        width: width - 40,
        backgroundColor: '#f2f3f7',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    inputHolder: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    inputIcon: {
        position:'absolute',
        paddingRight: 15
    },
    dividerHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 80
    },
    divider: {
        width: 20,
        height: 1,
        backgroundColor: '#9e9e9e',
        borderRadius: 4
    }
})