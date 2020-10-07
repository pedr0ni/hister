import React from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { Text } from '../components/Styled'
import SpecialButton from '../components/SpecialButton'
import { AuthContext } from '../stacks/AuthContext'
import UserService from '../services/UserService'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/AntDesign'

export default function ProfileScreen() {
    const [user, setUser] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const { setLogged } = React.useContext(AuthContext)

    React.useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        setLoading(true)
        const response = await UserService.info()

        if (response) {
            setUser(response.data)
        }
        setLoading(false)
    }

    const logout = async () => {
        await UserService.logout()
        setLogged(false)
    }

    return (
        <View>
            <View style={styles.iconHolder}>
                <Image style={styles.profileIcon} source={require('../../assets/user.png')} />
            </View>
            <View style={styles.infoHolder}>
                <Text style={styles.userName} weight='bold'>Olá, Matheus 😃</Text>

                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <Icon name='user' size={24} color='#2ecc71' />
                    </View>
                    <View>
                        {
                            loading ? (
                                <SkeletonPlaceholder speed={1200}>
                                    <SkeletonPlaceholder.Item flex={1} width={300}>
                                        <SkeletonPlaceholder.Item width={220} height={20} marginBottom={6} />
                                        <SkeletonPlaceholder.Item width={180} height={20} marginBottom={6} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            ) : (
                                <>
                                    <Text weight='light' style={styles.infoName}>Nome Completo</Text>
                                    <Text weight='medium' style={styles.infoValue}>{user.name}</Text>
                                </>
                            )
                        }
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <Icon name='mail' size={24} color='#3498db' />
                    </View>
                    <View>
                        {
                            loading ? (
                                <SkeletonPlaceholder speed={1200}>
                                    <SkeletonPlaceholder.Item flex={1} width={300}>
                                        <SkeletonPlaceholder.Item width={220} height={20} marginBottom={6} />
                                        <SkeletonPlaceholder.Item width={180} height={20} marginBottom={6} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            ) : (
                                <>
                                    <Text weight='light' style={styles.infoName}>E-mail</Text>
                                    <Text weight='medium' style={styles.infoValue}>{user.email}</Text>
                                </>
                            )
                        }
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <Icon name='calendar' size={24} color='#e74c3c' />
                    </View>
                    <View>
                        {
                            loading ? (
                                <SkeletonPlaceholder speed={1200}>
                                    <SkeletonPlaceholder.Item flex={1} width={300}>
                                        <SkeletonPlaceholder.Item width={220} height={20} marginBottom={6} />
                                        <SkeletonPlaceholder.Item width={180} height={20} marginBottom={6} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                            ) : (
                                <>
                                    <Text weight='light' style={styles.infoName}>Data de Nascimento</Text>
                                    <Text weight='medium' style={styles.infoValue}>{user.birth}</Text>
                                </>
                            )
                        }
                    </View>
                </View>

                <SpecialButton text='Sair' onPress={logout} color={'#e74c3c'} />
            </View>
        </View>
    )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    iconHolder: {
        backgroundColor: '#8c7ae6',
        height: 160,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    profileIcon: {
        width: 128,
        height: 128,
        position: 'absolute',
        top: 90,
    },
    infoHolder: {
        marginTop: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userName: {
        fontSize: 28,
        color: '#2c3e50',
        marginBottom: 30
    },
    infoCard: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width - 40
    },
    infoIcon: {
        backgroundColor: '#FFF',
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight: 20
    },
    infoName: {
        fontSize: 16
    },
    infoValue: {
        fontSize: 20
    }

})