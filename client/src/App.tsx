import './App.css'
import PrimarySearchAppBar from "./components/bar/header-bar.tsx";
import LinksBar from "./components/bar/links-bar.tsx";
import MediaControlCard from "./components/bar/footer-player.tsx";
import AppRouter from "./components/router/AppRouter.tsx";
import {BrowserRouter} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./main.tsx";
import { check } from "./http/userAPI.tsx";
import {useContext, useEffect, useState} from "react";


const App = observer(() => {

    const context = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        check().then(data => {

            console.log(data);

            context?.user.setUser(data);
            context?.user.setIsAuth(true);
        }).finally(() => setLoading(false));
    }, []);

    if (loading){
        return <div style={{marginTop: '28%', fontSize: '32px'}}>Loading...</div>
    }

  return (
    <BrowserRouter>
        <PrimarySearchAppBar />
        <div className="container-content">
            <LinksBar />
            <AppRouter />
        </div>
        <MediaControlCard />
    </BrowserRouter>
  )
});

export default App
