import '../../styles/home-page.css'
import '../../styles/profile.css'
import UserProfile from "../UserServices/UserProfile.tsx";
function ProfilePage(){
    return (
        <>
            <div className="container">
                <UserProfile/>
            </div>
        </>
    )
}

export default ProfilePage