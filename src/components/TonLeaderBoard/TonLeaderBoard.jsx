import "../RankList/RankList"
import topPlayerIcon from "../../assets/Rank/topPlayerIcon.svg"
import SecondPlayer from "../../assets/Rank/SecondPlayer.png"
import thirdPlayer from "../../assets/Rank/thirdPlayer.png"
import avatar from "../../assets/Rank/Avatar1.png"
import coin from "../../assets/coin3.ico"
import { getTonLeaderboard } from "../../services/apis"
import { useEffect, useState } from "react"

const TonLeaderBoard = () => {

    const [tonData, setTonData] = useState([])

    const getTonLeaderBoardData = async () => {
        const resp = await getTonLeaderboard()
        setTonData(resp.data.Response)
    }

    useEffect(() => {
        getTonLeaderBoardData()
    }, [])


    return (
        <div className="RankListMainDiv">


            {
                tonData.map((ton, index) => (

                    <div className={`rankUserList ${index === 0 ? "topPlayer" : "notTopPlayer"} `} key={index} >
                        <div className="rankLeftCol">
                            <div className="userPosition">

                                {
                                    index >= 3 ? <p>{index + 1}</p> :
                                        <img src={index === 0 ? topPlayerIcon : index === 1 ? SecondPlayer : index === 2 ? thirdPlayer : ""} width={40} />
                                }


                            </div>
                            <div className="rankUserProfile">
                                <img src={avatar} width={40} />
                            </div>
                            <div className="rankUserInfo">
                                <div className="rankUserName">{ton.name}</div>
                                <div className="rankUserRank">{ton.currentLevel}</div>
                            </div>
                        </div>

                        <div className="rankRightCol">
                            <div className="rankCoinImg">
                                <img src={coin} width={30} />
                            </div>
                            <div className="rankCoins">
                                {ton.tronCoin}
                            </div>
                        </div>
                    </div>

                ))
            }


        </div>
    )
}

export default TonLeaderBoard