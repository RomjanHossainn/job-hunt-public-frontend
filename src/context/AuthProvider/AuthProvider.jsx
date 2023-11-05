import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    


    useEffect(() => {
        setLoading(true)
        const unFollow = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unFollow()
        }
    },[])


    console.log(user)

    const provideInfo = {
        user,
        loading,
        createUser
    }
    
    return (
        <AuthContext.Provider value={provideInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;