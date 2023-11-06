import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }


    const signInUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword (auth,email,password)
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth)
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
        createUser,
        signInUser,
        logOut
    }
    
    return (
        <AuthContext.Provider value={provideInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;