import './App.css'
import logo from './assets/SHLogoGreen.png'
import Loading from './Loading.jsx'
import {Route, Routes, useNavigate} from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleSwitch = () => {
      navigate('/loading');
  }

  return (
    <>
        <Routes>
            <Route path={"/"} element={
                <div className={"background"}>
                    <div className={"box"}>
                        <img src={logo} className={"logo"} alt={"Stitch Helper Logo"}></img>
                        <div className={"button-div"}>
                            <button className={"start"} onClick={handleSwitch}>Start</button>
                        </div>
                    </div>
                </div>
            }/>
            <Route path={"/loading"} element={<Loading />} />
        </Routes>
    </>
  )
}

export default App
