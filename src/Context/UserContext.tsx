// UserContext.tsx
import { User, UserContextType } from '@/types';
import React, { createContext, useState, useContext, FC } from 'react';

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: any) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser should be initialized inside useProvider')
    }
    return context
}
