'use client'

import React, { createContext, useState, useContext } from 'react';

const CartNumContext = createContext();

export default function CartNumProvider({ children }) {
    const [num, setNum] = useState(0);
    return (
        <CartNumContext.Provider value={{ num, setNum }}>
            {children}
        </CartNumContext.Provider>
    );
}

export const useCartNum = () => useContext(CartNumContext);
