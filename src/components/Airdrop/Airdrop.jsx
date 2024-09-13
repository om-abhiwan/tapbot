import "./Airdrop.css"
import Treasure from "../../assets/treasure.png"


const Airdrop = () => {
    return (
        <div className="airdropTask">
            <div className="taskTreasureDiv">
                <img src={Treasure} alt="treasure" className="treasureIcon" />
            </div>
            <div className="taskHeadings">
                <h1>Airdrop Tasks</h1>
                <p>
                    COMING SOON...
                </p>
            </div>
        </div>
    )
}

export default Airdrop