import './Loading.css'
import logo from "./assets/SHLogoGreen.png";
import upload from "./assets/SHUpload.png";
import React, { useState } from 'react';
import pinkLogo from "./assets/SHLogoPink.png";

function Loading() {
    // maybe doesn't work (will fix soon)
    const [response, setResponse] = useState(null);
    const [havePattern, setHavePattern] = useState(false);
    const [haveResponse, setHaveResponse] = useState(false);

    const handleFileUpload = async (e) => {
        const pattern = e.target.files[0];
        setHavePattern(true);

        const formData = new FormData();
        formData.append('pdfFile', pattern)

        const res = await fetch("http://localhost:5000/upload", {
            method: 'POST',
            body: formData,
        })

        const data = await res.json();

        setResponse(data)
        setHaveResponse(true);
    }

    return (
        <>
            {!havePattern && !haveResponse && (<div className="background">
                <header className={"header"}>
                    <img src={logo} className={"header-logo"} alt={"Stitch Helper Logo"}></img>
                    <h1 className={"title"}>Stitch Helper</h1>
                </header>
                <h2 className={"welcome"}>Welcome to Stitch Helper! Upload a pattern to start.</h2>
                <div className={"upload-area"}>
                    <input type={"file"} className={"upload"} onChange={handleFileUpload} />
                    <img src={upload} className={"upload-img"} alt={"Click to Upload"}></img>
                </div>
            </div>)}
            {havePattern && !haveResponse && (
                <div className={"loading"}>
                    <div className={"scanning-box"}>
                        <img src={pinkLogo} className={"scanning-logo"} alt={"Stitch Helper Logo"}></img>
                        <h2>Scanning Pattern...</h2>
                    </div>
                </div>
            )}
            {havePattern && haveResponse && (
                <div>
                    {response.result}
                </div>
            )}
        </>
    )
}

export default Loading