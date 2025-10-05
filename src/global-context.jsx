import { createContext, useState } from "react";
export const global = createContext()

export default function GlobalProvider({ children }) {
    const [uid,setUid] = useState('')
    return (
        <global.Provider value={{ uid,setUid }}>
            {children}
        </global.Provider>
    )
}