import backLogo from "../../assets/Rank/rankHeadBg.png"
import "./RankHeader.css"
import Reloader from "../../assets/Rank/reload.png"
import { NavLink } from "react-router-dom"

const RankHeader = ({rotate, setRotate}) => {


    // useEffect(()=>{
    //     setRotate(false)
    // },[])
    const handleUpdate = () => {
        setRotate(true);
        setTimeout(() => {
            setRotate(false);
        }, 3000);
    }

    return (
        <div className="rankHeaderMainDiv">
            <div className="headLeftCol">
                <div className="rankHeaderBack">
                    <NavLink to="/">
                        <img src={backLogo} width={35} />
                    </NavLink>
                </div>
                <p>Leaderboard</p>
            </div>
            <div className="headRightCol">
                <div className="Reloader">
                    <img src={Reloader} alt="reloader" width={20} height={20} onClick={handleUpdate} className={rotate ? 'rotate' : ''} />
                </div>
            </div>
        </div>
    )

}

export default RankHeader