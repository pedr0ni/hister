import React from 'react'
import UserService from '../services/UserService'
import { AuthContext } from '../stacks/Context'

export const LogoutScreen: React.FC = () => {
    
    const authContext = React.useContext(AuthContext)!

    React.useEffect(() => {
        logout()
    })

    const logout = async () => {
        await UserService.logout()
        authContext.setLogged(false)
    }

    return (
        <>
        </>
    )
}