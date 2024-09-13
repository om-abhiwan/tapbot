import { useState } from "react"
import "./Earn.css"
import { useContext } from "react"
import { UserInfo } from "../../ContextApi/UserData"
import Gold from "../../components/Gold/Gold"
import Ton from "../../components/Ton/Ton"


const Earn = () => {


    const [isTon, setIsTon] = useState(1)
    const { userInfo } = useContext(UserInfo)

    const handleOption = (id) => {
        setIsTon(id)
    }

    return (
        <div className="earnMainDiv">



            {/* balance Info */}
            <div className="balanceInfo my-3">
                <p>Your Balance</p>
                <p className="boosterCoin">${userInfo.total_coins}</p>
            </div>



            {/* option */}
            <div className="earnOptionDiv">
                <div className={`earnoptionDivMenu ${isTon === 1 ? 'activeEarnOption' : "inActiveEarnOption"} `} onClick={() => { handleOption(1) }} >
                    <p>TON</p>
                </div>
                <div className={`earnoptionDivMenu ${isTon === 2 ? 'activeEarnOption' : "inActiveEarnOption"} `} onClick={() => { handleOption(2) }} >
                    <p>GOLD</p>
                </div>
            </div>



            <div className="m-3">

                {isTon === 1 ? <Ton /> : <Gold />}

            </div>




            {/* <div className="earnTreasureDiv">
                <img src={Treasure} alt="treasure" className="treasureIcon" />
            </div>
            <div className="earnHeadings">
                <h1>Airdrop Tasks</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div> */}


        </div>


    )
}

export default Earn