import "./BoosterPop.css"
import closeIcon from "../../assets/Task/closeIcon.svg"
import coin from "../../assets/Task/coinTask.svg"
import { useContext, useState } from "react"
import { UserInfo } from "../../ContextApi/UserData"
import { upgradeBooster, upgradeFreeBoosterApi } from "../../services/apis"
import dot from "../../assets/Booster/dot.svg"
import { useNavigate } from "react-router-dom"


const BoosterPop = ({ boost, onClose, setBoost }) => {


    const { userInfo, setUserInfo } = useContext(UserInfo)
    const navigate = useNavigate()
    let [turboTimeoutId, setTurboTimeoutId] = useState();
    let [BoostTimeoutId, setBoostTimeoutId] = useState();
    const [click, setClick] = useState(false)
    if (!boost) return null;



    const handlePurchase = async () => {

        if (click) {
            return
        } else {
            setClick(true)
        }

        const totalCoins = userInfo.total_coins
        const charges = boost.charges

        // if(boost.value=="Turbo"){
        //     // localStorage.setItem("turbo_time")
        // }


        if (charges === 0) {
            const resp = await upgradeFreeBoosterApi(userInfo.user_id, boost.value)
            // console.log(resp)
            if (resp.status === 200) {


                if (boost.value === "Recharge" && boost.limit > 0) {
                    let total_taps = userInfo.total_taps
                    setUserInfo({ ...userInfo, used_taps: total_taps })
                    // console.log(userInfo)
                    // setTimeout(() => {
                    setClick(false)
                    navigate("/")
                    // }, 200)
                } else if (boost.value === "Turbo" && boost.limit > 0) {

                    // let tempTap = userInfo.tap_coins
                    // let tap = userInfo.tap_coins * 10;
                    // console.log("temptap", tempTap)
                    // localStorage.setItem("turbo_use", true);
                    // setUserInfo({ ...userInfo, tap_coins: tap });

                    // if (turboTimeoutId) {
                    //     clearTimeout(turboTimeoutId);
                    // }

                    // setTimeout(() => {
                    //     localStorage.removeItem("turbo_use");
                    //     console.log("temptap", tempTap)
                    //     setUserInfo({ ...userInfo, tap_coins: tempTap});
                    // }, 10000);

                    // setTimeout(() => {
                    //     setBoost("");
                    //     navigate("/")
                    // }, 500)



                    let tempTap = userInfo.tap_coins;
                    let tap = userInfo.tap_coins * 10;
                    console.log("temptap", tempTap);
                    localStorage.setItem("turbo_use", true);
                    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, tap_coins: tap }));

                    if (turboTimeoutId) {
                        clearTimeout(turboTimeoutId);
                    }

                    const turboTimeout = setTimeout(() => {
                        localStorage.removeItem("turbo_use");
                        console.log("temptap", tempTap);
                        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, tap_coins: tempTap }));
                    }, 10000);

                    const boostTimeout = setTimeout(() => {
                        setBoost("");
                        setClick(false)
                        navigate("/");
                    }, 100);

                    // Save the timeouts to the state to potentially clear them later
                    setTurboTimeoutId(turboTimeout);
                    setBoostTimeoutId(boostTimeout);



                } else if (boost.name === "Hire Ant") {
                    const resp = await upgradeBooster(userInfo.user_id, boost.value, boost.charges)
                    console.log(resp)
                }


            }
        } else if (totalCoins > charges) {

            // console.log(userInfo.user_id,boost.value, boost.charges)

            const resp = await upgradeBooster(userInfo.user_id, boost.value, boost.charges)
            // console.log(resp)
            if (resp.status === 200) {
                // console.log("Done")
                let tapCoin = userInfo.tap_coins + 1
                let updateCoins = totalCoins - charges
                let currentTotalTap = userInfo.total_taps + 500
                let flash = userInfo.flash_speed + 1
                // console.log("Hmm checked")
                if (boost.value == "multiTap") {
                    setUserInfo({ ...userInfo, tap_coins: tapCoin, total_coins: updateCoins })
                } else if (boost.value == "fireLimit") {
                    setUserInfo({ ...userInfo, total_coins: updateCoins, total_taps: currentTotalTap })
                } else if (boost.value == "Flashspeed") {
                    setUserInfo({ ...userInfo, total_coins: updateCoins, flash_speed: flash })
                } else if (boost.name == "Hire Ant") {
                    setUserInfo({ ...userInfo, total_coins: updateCoins })
                }
                // setUserInfo({ ...userInfo, total_coins: updateCoins })
                // setTimeout(() => {
                setBoost("")
                setClick(false)
                navigate("/")
                // }, 200)
            }


        } else {
            setBoost("")
            setClick(false)
            navigate("/")
        }


    }

    return (
        <div className={`boosterPopMainDiv`}>


            <div className="crossBtnDiv" onClick={onClose} >
                <img src={closeIcon} width={30} />
            </div>

            <div className="boostPopImg">
                <img src={boost.icon} />
            </div>


            <div className="boostHeads">
                <p className="boostMainHead">{boost.name}</p>
                <p className="boostSubHead">
                    {boost.description}
                </p>
                <p className="boostPower">{boost.power}</p>
            </div>

            <div className="boostPopCharge">
                <div className="BoostPopImg">
                    <img src={coin} width={20} />
                </div>
                <div className="BoostPopCharge mx-1">{boost.charges === 0 ? "Free" : boost.charges}</div>
                <div className="BoostPopCharge mx-1 ">
                    <img src={dot} alt="dot" width={10} />
                    <span className="mx-1">
                        {/* {boost.name === "Hire Ant" ? "Limited" : boost.charges !== 0 ? (parseInt(boost.level.split("")[1]) + 1) + " lvl" : " Free"} */}
                        {boost.name === "Hire Ant" ? boost.level + " left" : boost.charges !== 0 ? (boost.currentLevel + 1) + " lvl" : " Free"}
                    </span>
                </div>
            </div>


            <div className="boostPurchaseBtn">

                <button className="btn" onClick={handlePurchase} >
                    Buy
                </button>
            </div>


        </div>
    )
}

export default BoosterPop