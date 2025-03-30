"use client"

import React, { createContext, useState, useContext } from 'react';

const userDataContext = createContext()

export function UserDataProvider({children}){
    let [user,setUser]= useState(null)
    return (
        <userDataContext.Provider value={{ user, setUser }}>
            {children}
        </userDataContext.Provider>
    );
}


export const useUserData = () => useContext(userDataContext);
