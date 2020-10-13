import React from 'react'

export const AuthContext = React.createContext<{
    isLogged: boolean,
    setLogged: (isLogged: boolean) => void
} | undefined>(undefined)

export const CartContext = React.createContext<{
    items:number,
    setItems: (count: number) => void
} | undefined>(undefined)
