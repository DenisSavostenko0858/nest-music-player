import {useContext, useEffect, useState} from "react";
import {UserInterface} from "./interface/user-interface.tsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.tsx";

const ProfileData = observer(() => {
    const context = useContext(Context);

    const [profile, setProfile] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);

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
                <input className="input-profile" placeholder={`Имя: ${profile?.name}`}/>
                <textarea className="input-profile" placeholder={
                    profile?.lastName && profile.lastName.length > 0 ?
                        profile.lastName
                        :
                        "Фамилия: Укажите вашу Фамилию"
                }/>
                <p>Почта: {profile?.email}</p>
                <textarea className="input-profile" placeholder={
                    profile?.about && profile.about.length > 0 ?
                        profile.about
                        :
                        "Укажите поле о себе"
                }/>
            </div>
            <div className="comment-user-container">
                <h3 style={{borderBottom: "1px solid black", paddingBottom: "10px"}}>Посты к аудиозаписям</h3>
                <div className="comments">
                    {profile?.comments && profile?.comments?.length > 0 ? (
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