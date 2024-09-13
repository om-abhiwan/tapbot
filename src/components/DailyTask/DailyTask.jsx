import "./DailyTask.css"
import closeIcon from "../../assets/Task/closeIcon.svg"
import coin from "../../assets/tonCoins.svg"
// import { dailyReward } from "../../Data/DailyReward"
import greyCoin from "../../assets/greyCoin.png"
import { useContext, useEffect, useState } from "react"
import { getDailyRewardDetails, udpateDailyRewardDetails } from "../../services/apis"
import { UserInfo } from "../../ContextApi/UserData"


const DailyTask = ({ onClose }) => {

    const [daysCollected, setDaysCollected] = useState(0)
    const [todayCollected, isTodayCollected] = useState(false)
    const [coins, setCoins] = useState(0)
    const { userInfo, setUserInfo } = useContext(UserInfo)

    // getting details of daily reward
    const getDailyRewardData = async () => {
        const resp = await getDailyRewardDetails(localStorage.getItem("user_id"))
        // console.log(resp)
        setDaysCollected((resp.data.claimDays - 1))
        isTodayCollected(resp.data.isClaimed)
        setCoins(resp.data.rewardCoin)
    }


    // updatingDailyReward
    const updateDailyReward = async () => {
        // alert("hii")
        // console.log(coins)
        const resp = await udpateDailyRewardDetails(localStorage.getItem("user_id"), coins, true)
        //    console.log(resp)
        if (resp.status === 200) {
            let currentCoins = userInfo.total_coins + coins
            let currentAllCoin = userInfo.allCoins + coins
            if (userInfo.isTaskUpdated === true) {
                setUserInfo({ ...userInfo, total_coins: currentCoins, allCoins: currentAllCoin, isTaskUpdated: false })
            } else {
                setUserInfo({ ...userInfo, total_coins: currentCoins, allCoins: currentAllCoin, isTaskUpdated: true })
            }
            getDailyRewardData()
        }
    }


    useEffect(() => {
        getDailyRewardData()
    }, [todayCollected, daysCollected, userInfo.isTaskUpdated])


    const collectCoins = [
        500, 2000, 7500, 100000, 150000, 250000, 500000
    ]


    const getDailyReward = () => {
        let arr = []

        // console.log(8%8)
        if (daysCollected >= 7) {
            setDaysCollected(daysCollected % 7)
        }

        for (let i = 1; i <= 7; i++) {
            arr.push(i)
        }
        return arr
    }

    useEffect(() => {
        getDailyReward()
    }, [userInfo.isTaskUpdated])


    return (
        <div className="dailyTaskMainDiv">


            <div className="dailyTaskcrossBtnDiv" onClick={onClose} >
                <img src={closeIcon} width={30} />
            </div>



            <div className="dailyTaskHead">
                Earn coins by logging into the game every day, ensuring you don&apos;t miss a single day.
            </div>



            <div className="collectList">


                {getDailyReward().map((dt, index) => (
                    <>
                        <div key={index} className={`dailyListData mt-4 ${daysCollected == (index) ? "activeDaily" : daysCollected < index ? "deactiveDaily" : "deactiveDaily"
                            } `}>
                            <div className="dailylistimg">
                                <img src={daysCollected == (index) ? coin : greyCoin} />
                            </div>
                            <div className="dailyData">
                                <p>Day {index + 1}</p>
                                <p>
                                    {collectCoins[index]}
                                </p>
                                {/* <p>

                                    {
                                        daysCollected==(index) && !todayCollected ? "Claim" : daysCollected<index ? "" : "Claimed"
                                    }

                                </p> */}
                            </div>
                        </div>
                    </>

                ))}


                {/* {
                    dailyReward.map((dt) => (
                        <>
                            <div className={`dailyListData mt-3 ${dt.done ? "activeDaily" : "deactiveDaily"} `}>
                                <div className="dailylistimg">
                                    <img src={ dt.done ? coin : greyCoin} width={40} />
                                </div>
                                <div className="dailyData">
                                    <p>Day {dt.day}</p>
                                    <p>{dt.reward}</p>
                                </div>
                            </div>
                        </>
                    ))
                } */}







            </div>




            <div className="dailyTaskBtn my-1">
                <button className="btn popupBtn" disabled={!todayCollected ? false : true} onClick={() => { !todayCollected ? updateDailyReward() : "" }} >
                    {!todayCollected ? "Collect" : "Collected"}
                </button>
            </div>



        </div>
    )
}

export default DailyTask