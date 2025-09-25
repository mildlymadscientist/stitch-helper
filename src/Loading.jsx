import './Loading.css'
import logo from "./assets/SHLogoGreen.png";
import upload from "./assets/SHUpload.png";
import React, { useState } from 'react';
import pinkLogo from "./assets/SHLogoPink.png";

function Loading() {
    // maybe doesn't work (will fix soon)
    const [pattern, setPattern] = useState(null);
    const [havePattern, setHavePattern] = useState(false);

    const handleFileUpload = (e) => {
        setPattern(e.target.files[0]);
        setHavePattern(true);
    }

    return (
        <>
            {!havePattern && (<div className="background">
                <header className={"header"}>
                    <img src={logo} className={"header-logo"} alt={"Stitch Helper Logo"}></img>
                    <h1 className={"title"}>Stitch Helper</h1>
                </header>
                <div className={"upload-area"}>
                    <input type={"file"} className={"upload"} onChange={handleFileUpload} />
                    <img src={upload} className={"upload-img"} alt={"Click to Upload"}></img>
                </div>
            </div>)}
            {havePattern && (
                <div className={"loading"}>
                    <div className={"scanning-box"}>
                        <img src={pinkLogo} className={"scanning-logo"} alt={"Stitch Helper Logo"}></img>
                        <h2>Scanning Pattern...</h2>
                    </div>
                </div>
            )}
        </>
    )
}

export default Loading