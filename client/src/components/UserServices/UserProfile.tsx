import {useContext, useEffect, useState} from "react";
import {UserInterface} from "./interface/user-interface.tsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.tsx";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUT } from "../router/const_routes_path.tsx";
import { updateNewUserDate } from "../../http/userAPI.tsx";

const ProfileData = observer(() => {
    const context = useContext(Context);
    const history = useNavigate();

    const [profile, setProfile] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);

    // Обновление пользовательских данных 
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    // const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const click = async (): Promise<void> => {
        try {
            let id = context?.user.user?.id;
            let dataUser = await updateNewUserDate( name, email, about, lastName, id)
            console.log(dataUser);

            context?.user.setUser(dataUser);
            context?.user.setIsAuth(true);

            history(PROFILE_ROUT);
            window.location.reload();
        } catch (error: any){
            console.log(error.message);
            setErrorMessage("Ошибка: " + error.response.data.message);
        }
    }

    // Захват пользовательских данных из сервера
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${context?.user.user?.id}`);
                const data = await response.json();

                setProfile(data);
            } catch (error) {
                console.error('Ошибка получения данных пользователя ' + error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfileData();
    }, []);
    if (loading) return <div>Loading...</div>;
    return(
        <div className="profile-container">
            <div className="profile-content">
                <input 
                    className="input-profile"
                    placeholder={`Имя: ${profile?.name}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                <textarea className="input-profile" style={{fontSize:"18px"}} placeholder={
                    profile?.lastName && profile.lastName.length > 0 ?
                        "Фамилия:" + profile.lastName
                        :
                        "Фамилия: Укажите вашу Фамилию"
                }
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input 
                    className="input-profile" 
                    placeholder={`Почта: ${profile?.email}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}    
                />
                <textarea className="input-profile" style={{fontSize:"18px"}} placeholder={
                    profile?.about && profile.about.length > 0 ?
                        "О мне: " + profile.about
                        :
                        "Укажите поле о себе"
                }
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
                {errorMessage && <h3 style={{color: 'red'}}>{errorMessage}</h3>}
                <button
                    className='btn-edit-profile'
                    onClick={click}
                >
                    Сохранить изменения
                </button>
            </div>
            <div className="comment-user-container">
                <h3 style={{borderBottom: "1px solid black", paddingBottom: "10px"}}>Посты к аудиозаписям</h3>
                <div className="comments">
                    {profile?.comments && profile.comments.length > 0 ? (
                        profile.comments.map(comment => (
                            <div key={comment.id} className='comment-container'>
                                <div className="text-comment">Трек: {comment.music.name}</div>
                                <div className="text-comment">Коментарий: {comment.text}</div>
                                <div className="text-comment">Рейтинг: {comment.rating}</div>
                            </div>
                        ))
                    ) : (
                        <p>Нет Постов</p>
                    )}
                </div>
            </div>
        </div>
    )
})

export default ProfileData;