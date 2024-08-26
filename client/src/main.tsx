import {createContext, StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserStore from "./store/UserStore.tsx";

interface StoreContextType {
    user: UserStore;
}

export const Context = createContext<StoreContextType | null>(null);

createRoot(document.getElementById('root')!).render(
   <StrictMode>
       <Context.Provider value={{
           user: new UserStore()
       }}>
        <App />
       </Context.Provider>
   </StrictMode>
)
