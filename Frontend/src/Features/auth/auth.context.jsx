import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        // Verify authentication on app load
        const verifyAuth = async () => {
            try {
                const data = await getMe()
                if (data?.user) {
                    setUser(data.user)
                }
            } catch (error) {
                // Token is invalid or expired, user stays null
                console.log("User not authenticated")
            } finally {
                setLoading(false)
            }
        }
        
        verifyAuth()
    }, [])
    
    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )

} 