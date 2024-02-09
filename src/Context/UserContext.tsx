// UserContext.tsx
import React, { createContext, useState, useContext, FC } from 'react';

interface UserContextType {
    selectedUsername: string | null;
    setSelectedUsername: React.Dispatch<React.SetStateAction<string | null>>;
  }


const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: any) => {
    const [selectedUsername, setSelectedUsername] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ selectedUsername, setSelectedUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser should be initialized inside useProvider');
    }
    return context;
};
