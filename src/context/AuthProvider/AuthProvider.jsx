import { createContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)


    const provideInfo = {
        user,
        loading
    }
    
    return (
        <AuthContext.Provider value={provideInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;