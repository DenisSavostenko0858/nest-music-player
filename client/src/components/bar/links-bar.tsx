import '../../styles/links-bar.css'

function LinksBar(){
    return (
        <>
            <div className="container-bar">
                <div className="logo">
                    <h2>Логотип</h2>
                </div>
                <div className="node">
                    <div className="btn">
                        <a href={'/'}>Ссылка</a>
                    </div>
                    <div className="btn">
                        <a href={'/'}>Ссылка</a>
                    </div>
                    <div className="btn">
                        <a href={'/'}>Ссылка</a>
                    </div>
                    <div className="btn">
                        <a href={'/'}>Ссылка</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LinksBar;