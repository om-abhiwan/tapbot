import { useEffect } from "react"
import { updateTonCoins } from "../../services/apis"
import "./TonPop.css"

const TonPop = ({ getTonData, winAmount, setShowTonPop }) => {

    const updateCoins = async () => {
        await updateTonCoins(localStorage.getItem("user_id"), winAmount, "claim1")
        // console.log(resp)
        getTonData()
    }

    useEffect(() => {
        updateCoins()
    }, [])


    return (
        <div className="tonPop">
            <div className="tonPopHead">
                Congratulations!
            </div>
            <div className="tonPopSubHead">
                You Got <span className="tonWinAmount"> {winAmount} </span>Ton as Reward
            </div>
            <button className="btn" onClick={() => { setShowTonPop(false) }}  >Collect</button>
        </div>
    )
}

export default TonPop