import "./RankList.css"
import topPlayerIcon from "../../assets/Rank/topPlayerIcon.svg"
import SecondPlayer from "../../assets/Rank/SecondPlayer.png"
import thirdPlayer from "../../assets/Rank/thirdPlayer.png"
import avatar from "../../assets/Rank/Avatar1.png"
import coin from "../../assets/coin3.ico"

const RankList = ({ filteredData }) => {


    return (
        <div className="RankListMainDiv">








            {
                filteredData.length > 0 ? filteredData.map((ton, index) => (

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
                                {ton.coin / 1000} K
                            </div>
                        </div>
                    </div>

                )) :
                    <>
                        <p className='text-center dataNotAvaial' >No Result Found!</p>
                    </>
            }





        </div>
    )
}

export default RankList