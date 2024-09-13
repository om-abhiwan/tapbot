import hireAnt from "../assets/Booster/hireAnt.png"
import turbo from "../assets/Booster/turbo.png"
import recharge from "../assets/Booster/freeRecharge.png"
import fireLimit from "../assets/Booster/fireLimit.png"
import flashSpeed from "../assets/Booster/flashSpeed.png"
import multtap from "../assets/Booster/multiTap.png"

import { useContext, useEffect, useState } from "react";
import { getBooster, getFreeBoosterApi } from "../services/apis";
import { UserInfo } from "../ContextApi/UserData";



// export const freeBooster = [
//     {
//         id: 1,
//         name: "Free Recharge",
//         icon: FreeRecharge,
//         available: true,
//         limit: 3,
//         value: "Recharge",
//         charges: 0,
//         description: "Increase the amount of energy",
//         power: "+100 energy points for level 1"
//     },
//     {
//         id: 2,
//         name: "Turbo",
//         icon: Turbo,
//         available: true,
//         limit: 3,
//         value: "Turbo",
//         charges: 0,
//         description: "Increase the amount of energy",
//         power: "+100 energy points for level 1"
//     }
// ]

const BoosterData = () => {

    const { userInfo, setUserInfo } = useContext(UserInfo)

    const [level, setLevel] = useState({

        multiLevel: 0,
        fireLimit: 0,
        flashSpeed: 0,
        Hireant: false

    })


    const [hireAntLimit, setHireAnt] = useState({
        status: false,
        limit: 0
    })


    const [freeLevel, setFreeLevel] = useState({
        Recharge: "",
        Turbo: "",
    })

    const getPaidBoosterData = async () => {
        const resp = await getBooster(userInfo.user_id)
        console.log("paid booster", resp)
        setLevel({ ...level, multiLevel: resp.data.multiTap, fireLimit: resp.data.firelimit, flashSpeed: resp.data.flashSpeed, Hireant: resp.data.Hireant })

        setUserInfo({ ...userInfo, isLoaderRequire: false })

    }

    const getFreeBoosterData = async () => {
        const resp = await getFreeBoosterApi(userInfo.user_id)
        console.log("free booster", resp)
        setHireAnt({ ...hireAnt, limit: resp.data.hireant })
        setFreeLevel({ ...freeLevel, Recharge: resp.data.recharge, Turbo: resp.data.turbo })
        setUserInfo({ ...userInfo, isLoader2Require: false })
    }



    useEffect(() => {
        getPaidBoosterData()
        getFreeBoosterData()
    }, [])




    const freeBoosterData = [

        {
            id: 1,
            name: "Free Recharge",
            icon: recharge,
            available: true,
            limit: freeLevel.Recharge,
            value: "Recharge",
            charges: 0,
            description: "Recharge your flash to the maximum and do another round of mining.",
            power: "You can only use this boost three times in 24hrs"
        },
        {
            id: 2,
            name: "Turbo",
            icon: turbo,
            available: true,
            limit: freeLevel.Turbo,
            value: "Turbo",
            charges: 0,
            description: "Tap ten times than usual and earn more coin.",
            power: "You can only enable the turbo mode for 10 seconds"
        }
    ]





    const upgradeBoostData = [
        {
            id: 3,
            name: "Multi Tap",
            icon: multtap,
            charges: 2500 * (2 ** (level.multiLevel - 1)),
            level: ` ${level.multiLevel} Level`,
            value: "multiTap",
            description: "Increase the amount of coins you can earn per tap.",
            power: `+1 Coin for tap for ${level.multiLevel + 1} level`,
            currentLevel: level.multiLevel
        },
        {
            id: 4,
            name: "Flash Energy Limit",
            icon: fireLimit,
            charges: 2500 * (2 ** (level.fireLimit - 1)),
            level: ` ${level.fireLimit} Level`,
            value: "fireLimit",
            description: "Increase the amount of flash limit.",
            power: `+500 flash energy point for ${level.fireLimit + 1} level`,
            currentLevel: level.fireLimit
        },
        {
            id: 5,
            name: "Flash Energy Speed",
            icon: flashSpeed,
            charges: 2500 * (2 ** (level.flashSpeed - 1)),
            level: ` ${level.flashSpeed} Level`,
            value: "Flashspeed",
            description: "Recover flash energy faster by increasing your flash energy replenishment speed.",
            power: `+1 speed for flash energy faster for ${level.flashSpeed + 1} level`,
            currentLevel: level.flashSpeed
        },
        {
            id: 6,
            name: "Hire Ant",
            icon: hireAnt,
            charges: 200000,
            level: `${hireAntLimit.limit}`,
            value: "Hireant",
            description: "Auto Tap Bot",
            power: "which can be used only three times daily and would work for 3 hours on each activation",
            currentLevel: 0
        }
    ];
    return { upgradeBoostData, freeBoosterData }
}

export default BoosterData

