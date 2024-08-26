import '../../styles/links-bar.css';
import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../../main.tsx";

const LinksBar = observer(() => {
    const context = useContext(Context);


    return (
        <>
            <div className="container-bar">
                <div className="logo">
                    <h2>PLAYER-NEST</h2>
                </div>
                <div className="node">
                    <div className="btn-container">
                        <a href={'/'} className='btn'>Поиск</a>
                    </div>
                    <div className="btn-container">
                        <a href={'/'} className="btn">Главная</a>
                    </div>
                    {context?.user.isAuth ?
                        <>
                            <div className="btn-container">
                                <a href={'/favorite'} className="btn">Нравиться</a>
                            </div>
                            <div className="btn-container">
                                <a href={'/profile'} className="btn">Профиль</a>
                            </div>
                        </>
                    :
                    <div className="btn-container">
                        <a href={'/login'} className="btn">Войти</a>
                    </div>
                    }
                </div>
            </div>
        </>
    )
})

export default LinksBar;