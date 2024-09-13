import { useContext } from "react"
import "./CoinInfo.css"
import { UserInfo } from "../../ContextApi/UserData"
import goldCoin from "../../assets/Rank/goldLogo.png"
import tonCoin from "../../assets/Rank/TonLogo.png"

const CoinInfo = () => {
    const { userInfo } = useContext(UserInfo)
    // console.log("userInfo",userInfo)
    return (
        <>

            <div className="coinInfoMainDiv">

                {/* ton coins info */}
                <div className="tonCoins">
                    <div className="tonHeading">
                        Ton
                    </div>
                    <div className="noOfCoins">

                        <div className="tonImg">
                            <img src={tonCoin} width={25} />
                        </div>
                        <div className="tonAmount">{ parseFloat(userInfo?.ton_coins)?.toFixed(2)}</div>

                    </div>
                </div>


                {/* gold Coins Info */}
                <div className="goldCoins">
                    <div className="goldHeading">
                        Gold
                    </div>
                    <div className="noOfGoldCoins">

                        <div className="goldImg">
                            <img src={goldCoin} width={25} />
                        </div>
                        <div className="goldAmount">0</div>

                    </div>
                </div>




            </div>

        </>
    )
}

export default CoinInfo