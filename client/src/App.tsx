import './App.css'
import PrimarySearchAppBar from "./components/bar/header-bar.tsx";
import HomePage from "./components/pages/home-page.tsx";
import LinksBar from "./components/bar/links-bar.tsx";
import MediaControlCard from "./components/bar/footer-player.tsx";


function App() {

  return (
    <>
        <PrimarySearchAppBar />
        <div className="container-content">
            <LinksBar />
            <HomePage />
        </div>
        <MediaControlCard />
    </>
  )
}

export default App
