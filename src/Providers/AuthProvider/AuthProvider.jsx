import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../Firebase/firebase.confiq";

// import { DarkModeSwitch } from "react-toggle-dark-mode";
// import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }


    // sign in 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }


    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    // darkmode light mode 
    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
    };





    useEffect(() => {
        const unsubsribe = onAuthStateChanged(auth, currentUser => {

            setUser(currentUser);
            setLoading(false);
            console.log(currentUser);

        })

        return () => {
            return unsubsribe();
        }
    }, [])

    const info = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        logOut,
        isDarkMode,
        toggleDarkMode,
        setDarkMode
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;