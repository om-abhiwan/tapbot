// import WheelComponent from 'react-wheel-of-prizes'

import { useContext } from "react";
import { UserInfo } from "../../ContextApi/UserData";
import WheelComponent from "./WheelComponent";

// import 'react-wheel-of-prizes/dist/index.css'

const Wheel = ({ tonknowk, totalInvite, getSpin, setShowTonPop, setWinAmount }) => {

    const { userInfo, setUserInfo } = useContext(UserInfo)

    const invite = totalInvite;
    // const invite = 2;
    // console.log("inviteDta",invite)

    const invite1 = [
        "0.1",
        "0.2",
        "0.25",
        "0.3",
        "0.35",
        "0.4",
        "0.45",
        "0.5",
        "0.55",
        "0.6",
        "0.7",
        "0.7.5",
        "0.85",
        "0.9",
        "0.95",
        "1",
    ]

    const invite2 = [
        "0.2",
        "0.3",
        "0.4",
        "0.5",
        "0.6",
        "0.7",
        "0.8",
        "0.9",
        "1",
        "1.2",
        "1.3",
        "1.4",
        "1.5",
        "1.7",
        "1.9",
        "2",
    ]

    const invite3 = [
        "0.5",
        "0.25",
        "0.45",
        "0.65",
        "0.85",
        "1.5",
        "1.25",
        "1.45",
        "1.65",
        "1.85",
        "2",
        "2.25",
        "2.45",
        "2.65",
        "2.85",
        "3",
    ]
    const invite4 = [
        "1",
        "1.2",
        "1.4",
        "1.6",
        "1.8",
        "2",
        "2.2",
        "2.4",
        "2.6",
        "2.8",
        "3",
        "3.2",
        "3.4",
        "3.6",
        "3.8",
        "4"
    ]
    const invite5 = [
        "1.5",
        "1.8",
        "2.1",
        "2.4",
        "2.7",
        "3",
        "3.3",
        "3.6",
        "3.9",
        "4.2",
        "4.3",
        "4.4",
        "4.6",
        "4.7",
        "4.8",
        "5",
    ]
    const invite6 = [
        "2",
        "2.5",
        "2.8",
        "3.1",
        "3.4",
        "3.7",
        "4",
        "4.3",
        "4.6",
        "4.9",
        "5",
        "5.1",
        "5.3",
        "5.5",
        "5.8",
        "6",
    ]
    const invite7 = [
        "3",
        "3.3",
        "3.6",
        "3.9",
        "4.2",
        "4.5",
        "4.8",
        "5.1",
        "5.4",
        "5.7",
        "6",
        "6.2",
        "6.4",
        "6.6",
        "6.8",
        "8",
    ]
    const invite8 = [
        "4",
        "4.4",
        "4.8",
        "5.2",
        "5.6",
        "6",
        "6.4",
        "6.8",
        "7.2",
        "7.6",
        "8",
        "8.4",
        "8.8",
        "9.2",
        "9.6",
        "10",
    ]
    const invite9 = [
        "5",
        "5.5",
        "6",
        "6.5",
        "7",
        "7.5",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
        "15",
        "15",
        "15",
        "15",
        "15",
    ]
    const invite10 = [
        "0.2",
        "0.4",
        "0.6",
        "0.8",
        "1",
        "1.2",
        "1.4",
        "1.6",
        "1.8",
        "2"
    ]



    // const segments = [
    //     'better luck next time',
    //     'won 70',
    //     'won 10',
    //     'better luck next time',
    //     'won 2',
    //     'won uber pass',
    //     'better luck next time',
    //     'won a voucher'
    // ]



    const onFinished = (winner) => {
        let ton = parseFloat(userInfo.ton_coins) + parseFloat(winner)
        setUserInfo({ ...userInfo, ton_coins: ton })
        setTimeout(() => {
            setShowTonPop(true)
            setWinAmount(winner)
        }, 1500)
    }


    return (

        <>
            <img src={tonknowk} width={20} className="tonknowk" />
            <WheelComponent
                segments={invite == 1 ? invite1 : invite === 2 ? invite2 : invite === 3 ? invite3 : invite === 4 ? invite4 : invite === 5 ? invite5 : invite === 6 ? invite6 : invite === 7 ? invite7 : invite === 8 ? invite8 : invite === 9 ? invite9 : invite10}
                className="wheel-gradient"
                // winningSegment="2.6"
                onFinished={(winner) => onFinished(winner)}
                primaryColor="black"
                primaryColoraround="#ffffffb4"
                contrastColor="white"
                buttonText="Spin"
                isOnlyOnce={!getSpin}
                size={120}
                upDuration={100}
                downDuration={500}
                fontFamily='Arial'
                disablePointerEvents={!getSpin ? true : false}
            />

        </>


    )
}

export default Wheel