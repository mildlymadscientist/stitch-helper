import './Loading.css'
import logo from "./assets/SHLogoGreen.png";

function Loading() {

    return (
        <>
            <div className="background">
                <header className={"header"}>
                    <img src={logo} className={"header-logo"} alt={"Stitch Helper Logo"}></img>
                    <h1 className={"title"}>Stitch Helper</h1>
                </header>
                <div className={"upload-area"}>
                    <button className={"upload-button"}>Upload Here</button>
                </div>
            </div>
        </>
    )
}

export default Loading