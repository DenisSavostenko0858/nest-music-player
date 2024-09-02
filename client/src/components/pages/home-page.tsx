import '../../styles/home-page.css'
import TrackList from "../TrackServices/TrackList.tsx";

function HomePage(){
    return (
        <>
            <div className="container">
                <TrackList />
            </div>
        </>
    )
}

export default HomePage