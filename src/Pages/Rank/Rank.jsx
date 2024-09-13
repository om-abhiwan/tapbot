import RankHeader from "../../components/RankHeader/RankHeader"
import topChar from "../../assets/Rank/charImg.svg"
import leftArrow from "../../assets/Rank/leftArrow.svg"
import rightArrow from "../../assets/Rank/rightArrow.svg"
import { useContext, useEffect, useState } from "react"
import "./Rank.css"
import RankList from "../../components/RankList/RankList"
import TonLeaderBoard from "../../components/TonLeaderBoard/TonLeaderBoard"
import GoldLeaderboard from "../../components/GoldLeaderBoard/GoldLeaderboard"
import tonCoin from "../../assets/Rank/TonLogo.png"
import goldCoin from "../../assets/Rank/goldLogo.png"
import { getGoldLeaderboard } from "../../services/apis"
import { UserInfo } from "../../ContextApi/UserData"

const Rank = () => {

    const [rotate, setRotate] = useState(false);
    const [option, setOption] = useState(0)

    const [currentRank, setCurrentRank] = useState(0);
    const [userRank, setUserRank] = useState(0)
    const [goldData, setGoldData] = useState([]);
    const { userInfo } = useContext(UserInfo)


    const handleOption = (opt) => {
        setTimeout(() => {
            setOption(opt)
        }, 400)
    }

    const rankDivisions = [
        { name: "Newbies", min: 0, max: 199999 },
        { name: "Cadet", min: 200000, max: 999999 },
        { name: "Officer", min: 1000000, max: 9999999 },
        { name: "Lieutenant", min: 10000000, max: 49999999 },
        { name: "Captain", min: 50000000, max: 99999999 },
        { name: "Major", min: 100000000, max: 249999999 },
        { name: "Colonel", min: 250000000, max: 499999999 },
        { name: "Brigadier", min: 500000000, max: 999999999 },
        { name: "General", min: 1000000000, max: 9999999999 },
        { name: "Queen", min: 10000000000, max: Infinity },
    ];

    const getLeaderborad = async () => {
        const resp = await getGoldLeaderboard();
        setGoldData(resp.data.Response);
    }


    useEffect(() => {
        getLeaderborad();

        // Determine the user's rank based on their coins
        const userRank = rankDivisions.findIndex(rank => userInfo.allCoins >= rank.min && userInfo.allCoins <= rank.max);
        // console.log(userRank)
        setUserRank(userRank !== -1 ? userRank : 0)
        setCurrentRank(userRank !== -1 ? userRank : 0); // Set to user's rank or default to first rank
    }, []);



    const filteredData = goldData
        .filter(ton => ton.coin >= rankDivisions[currentRank].min && ton.coin <= rankDivisions[currentRank].max)
        .slice(0, 50)

    const handlePrevRank = () => {
        if (currentRank > 0) setCurrentRank(currentRank - 1);
    };

    const handleNextRank = () => {
        if (currentRank < rankDivisions.length - 1) setCurrentRank(currentRank + 1);
    };


    // console.log("filtered", filteredData)



    return (
        <div className="RankMainDiv">
            <RankHeader rotate={rotate} setRotate={setRotate} />


            <div className="RankTopSection">

                {/* top image */}
                <div className="topCharImg">

                    <img src={
                        option === 0 ? topChar : option === 1 ? tonCoin : goldCoin
                    }
                        alt="topChar"
                        className={option === 0 ? "rankLeaderImg" : option === 1 ? "tonCoinImg" : "goldCoinImg"}

                    />


                </div>


                {/* Arrow section */}
                <div className="rightLeftArr">
                    <div className="leftArrow" onClick={handlePrevRank} >
                        <img src={leftArrow} width={15} />
                    </div>
                    <div className="arrowInfo">
                        <div className="arrowInfoHead">
                            {
                                option === 0 ? rankDivisions[currentRank].name : option === 1 ? "Ton Coins" : "Gold"
                            }
                        </div>
                        {
                            option === 0 ?
                                <div className="arrowInfoSubHead">
                                    {
                                        userRank === currentRank ? "$" + userInfo.allCoins + " / " + rankDivisions[currentRank].max : "From $" + rankDivisions[currentRank].min
                                    }
                                </div>
                                : ""
                        }
                    </div>
                    <div className="rightArrow" onClick={handleNextRank} >
                        <img src={rightArrow} width={15} />
                    </div>
                </div>
            </div>


            {/* option */}
            <div className="rankOptionDiv">
                <div className={`rankoptionDivMenu ${option === 0 ? 'activerankOption' : "inActiverankOption"} `} onClick={() => { handleOption(0) }} >
                    <p>RANK</p>
                </div>
                <div className={`rankoptionDivMenu ${option === 1 ? 'activerankOption' : "inActiverankOption"} `} onClick={() => { handleOption(1) }} >
                    <p>TON</p>
                </div>
                <div className={`rankoptionDivMenu ${option === 2 ? 'activerankOption' : "inActiverankOption"} `} onClick={() => { handleOption(2) }} >
                    <p>GOLD</p>
                </div>
            </div>

            {/* list */}
            {
                option === 0 ? <RankList filteredData={filteredData} /> : option === 2 ? <GoldLeaderboard /> : <TonLeaderBoard />
            }

        </div>
    )
}

export default Rank