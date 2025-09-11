import './App.css'
import logo from './assets/SHLogoGreen.png'

function App() {

  return (
    <>
        <div className={"box"}>
            <img src={logo} className={"logo"} alt={"Stitch Helper Logo"}></img>
            <div className={"button-div"}>
                <button className={"start"}>Start</button>
            </div>
        </div>
    </>
  )
}

export default App
