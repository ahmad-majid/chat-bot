import { createContext, useContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook for using AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    // Initialize state with the value from local storage, parsed as JSON, or null if it doesn't exist
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem("chat-user");
        return user ? JSON.parse(user) : null;
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
