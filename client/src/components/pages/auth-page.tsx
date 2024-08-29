import '../../styles/home-page.css'
import {observer} from "mobx-react-lite";
import {HOME_ROUT, LOGIN_ROUT} from "../router/const_routes_path.tsx";
import {login, registration} from "../../http/userAPI.tsx";
import {useContext} from "react";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";

const AuthPage = observer(() => {
    const isLogin = location.pathname === LOGIN_ROUT;
    const context = useContext(Context);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async (): Promise<void> => {
        try {
            let dataUser;

            if(isLogin) {
                dataUser = await login(email, password)
            } else {
                dataUser = await registration(name, email, password)
            }

            context?.user.setUser(data);
            context?.user.setIsAuth(true);

            const history = useNavigate();
            history(HOME_ROUT);
        } catch (error: any){
            console.log(error.message);
        }
    }
    return (
        <>
            <div className="container">
                <h1 className="logo">AUTH Page</h1>
                <div className="form-auth">
                    <h2 >{isLogin ? 'Войти' : "Регистрация"}</h2>

                </div>
            </div>
        </>
    )
})

export default AuthPage