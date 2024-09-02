import '../../styles/auth-page.css'
import {observer} from "mobx-react-lite";
import {HOME_ROUT, LOGIN_ROUT, REGISTER_ROUT} from "../router/const_routes_path.tsx";
import {login, registration} from "../../http/userAPI.tsx";
import {useContext, useState} from "react";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";

const AuthPage = observer(() => {
    const isLogin = location.pathname === LOGIN_ROUT;
    const context = useContext(Context);
    const history = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const click = async (): Promise<void> => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password)
                console.log(data);
            } else {
                data = await registration(name, email, password)
                console.log(data);
            }

            context?.user.setUser(data);
            context?.user.setIsAuth(true);

            history(HOME_ROUT);
        } catch (error: any){
            console.log(error.message);
            setErrorMessage("Ошибка: " + error.response.data?.message);
        }
    }
    return (
        <div className="container">
            <div className="form-auth">
                <h2>{isLogin ? 'Войти' : "Регистрация"}</h2>
                {!isLogin &&
                    <div className="input-container">
                        <input
                            className="input-form-auth"
                            placeholder={"Ваше имя..."}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="name"
                        />
                    </div>
                }
                <div className="input-container">
                    <input
                        className="input-form-auth"
                        placeholder={"Ваша почта mail@mail.com"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                    />
                </div>
                <div className="input-container">
                    <input
                        className="input-form-auth"
                        placeholder={"Пароль 123123..."}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </div>
                {isLogin ?
                    <div style={{margin: "10px"}}>
                        Нет аккаунта? <a href={REGISTER_ROUT} id="form-link">Зарегистрируйся</a>
                    </div>
                    :
                    <div style={{margin: "10px"}}>
                        Есть аккаунт? <a href={LOGIN_ROUT} id="form-link">Войдите</a>
                    </div>
                }
                {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
                <button
                    className='btn-auth'
                    onClick={click}
                >
                    {isLogin ? 'Войти' : 'Регистрация'}
                </button>
            </div>
        </div>
    )
})

export default AuthPage