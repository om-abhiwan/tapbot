import ColonySocialData from "../../Data/Colony"
import coin from "../../assets/tonCoins.svg"
import "./Colony.css"
import tickCoin from "../../assets/Task/taskDone.svg"

// popup
import Pop from "../Popup/Pop"
import { useContext, useEffect, useState } from "react"
import { updateClaimUserData, updateCoins } from "../../services/apis"
import { UserInfo } from "../../ContextApi/UserData"
import Spinner from 'react-bootstrap/Spinner';

const Colony = () => {


    const { DailyTaskData, taskList } = ColonySocialData()
    const { setUserInfo, userInfo } = useContext(UserInfo)
    const [loader, setLoader] = useState(true)
    const [selectId, setSelectId] = useState(null)

    const [task, setTask] = useState(null);

    const handleTaskPopup = (data) => {
        setTask(data)
    }

    const handleClosePopup = () => {
        setTask(null)
    }



    useEffect(() => {
        setUserInfo({ ...userInfo, isLoaderRequire: true })
    }, [])



    useEffect(() => {

        // console.log("status3", userInfo.isLoaderRequire)
        setLoader(userInfo.isLoaderRequire)

    }, [userInfo.isLoaderRequire])


    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoader(false)
    //     }, 750)
    // }, [])



    const handleClaim = async (name, price, id) => {

        if (id === selectId) {
            // console.log("dubara hit")
            return;
        } else {
            // console.log("ID ASSIGN")
            setSelectId(id)
        }

        // alert(name)
        const res = await updateClaimUserData(localStorage.getItem("user_id"), name)
        await updateCoins(localStorage.getItem("user_id"), price)
        let coin = userInfo.total_coins + price
        // console.log(res1)
        // console.log(res)
        if (res.status === 200) {
            if (userInfo.isTaskUpdated === true) {
                setUserInfo({ ...userInfo, Test: 0, total_coins: coin, isTaskUpdated: false })
            } else {
                setUserInfo({ ...userInfo, Test: 0, total_coins: coin, isTaskUpdated: true })
            }


        }


        setTimeout(() => {
            // console.log("gaya id")
            setSelectId(null)
        }, 800)




    }



    useEffect(() => {

        if (task) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

    }, [task])

    return (

        <>
            <div className={`refTaskMainDiv ${task ? "blur" : ""} `} >

                {/* heading */}
                <div className="reftaskHead">
                    Daily Task
                </div>

                {/* daily task list */}
                <div className="colonyListDiv">
                    {
                        DailyTaskData.map((colony) => (
                            <>
                                <div className="colonyDiv my-2" key={colony.id} onClick={() => { loader ? "" : colony.done || colony.claim === true ? "" : handleTaskPopup(colony) }} >
                                    {/* {
                                        !colony.done ? "Join" : colony.claim ? "Claimed" : "claim"

                                    } */}
                                    <div className="colonyUpperDiv">
                                        <div className="leftColcolony">
                                            <div className="colonyIcon">
                                                <img src={colony.icon} alt="colony" width={40} />
                                            </div>
                                            <div className="colonyDetails mx-1">
                                                <div className="colonyNos">{colony.name}</div>

                                                {
                                                    colony.id === 1 ? " "
                                                        :
                                                        <div className="colonyCoins">
                                                            <img src={coin} width={15} alt="coin" />
                                                            <span className="mx-1">+{colony.price}</span>
                                                        </div>
                                                }



                                            </div>
                                        </div>
                                        <div className="rightColcolony" onClick={() => {
                                            colony.join && !colony.claim ? handleClaim(colony.claimName, colony.price, colony.id) : ""
                                            //  colony.done && colony.claim === false ? handleClaim(colony.claimName) : "" 
                                        }} >

                                            {
                                                loader ?
                                                    <button className="btn" >
                                                        <Spinner animation="border" variant="light" />
                                                    </button>
                                                    :
                                                    <button className={`btn ${colony.join ? 'clamied' : "noClamied"}  `}>
                                                        {colony.id === 1 ? colony.claim === false ? "Claim" : "Claimed" : !colony.done ? "Join" : colony.join && !colony.claim ? "Claim" : colony.claim ? "Claimed" : "Wait.."}
                                                    </button>
                                            }






                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>

                {/* heading */}
                <div className="reftaskHead mt-">
                    Task List
                </div>


                {/* task list */}
                <div className="listTaskDiv">
                    {
                        taskList.map((colony) => (
                            <>
                                <div className="taskListSubDiv my-2 " key={colony.id} onClick={() => { loader ? "" : colony.done || colony.claim === true ? "" : handleTaskPopup(colony) }} >

                                    <div className="listTaskBoxDiv">
                                        {
                                            colony.claim ?

                                                <div className="listTaskDone">
                                                    <img src={tickCoin} width={20} />
                                                </div>

                                                :
                                                <button onClick={() => {
                                                    colony.join && !colony.claim ? handleClaim(colony.claimName, colony.price) : ""
                                                }} className={`btn ${colony.join ? 'clamied' : "noClamied"}  `}>
                                                    {!colony.done ? "Join" : colony.join && !colony.claim ? "Claim" : colony.claim ? "Claimed" : "Wait.."}
                                                    {/* {colony.join ? "Claim" : !colony.done ? "Join" : "Claimed"} */}
                                                </button>
                                        }
                                        {/* {
                                            !colony.done ? "Join" : colony.join && !colony.claim ?
                                                "Claim"
                                                : colony.claim ?
                                                    <div className="listTaskDone">
                                                        <img src={tickCoin} width={20} />
                                                    </div>
                                                    : "Wait.."


                                            // colony.done ?
                                            //     <div className="listTaskDone">
                                            //         <img src={tickCoin} width={20} />
                                            //     </div>
                                            //     : ""
                                        } */}

                                        <div className="lefttaskColcolony my-3 ">
                                            <div className="colonyIcon">
                                                <img src={colony.icon} alt="colony" width={40} />
                                            </div>
                                            <div className="colonyDetails mt-2">
                                                <div className="colonyListNos"> Join Our <br /> {colony.name}</div>
                                                <div className="listTaskCoins">
                                                    <img src={coin} width={10} alt="coin" className="mx-1" />
                                                    +{colony.price}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="rightColcolony my-1 ">
                                        <button className={`btn ${colony.done ? 'clamied' : "noClamied"}  `}> {colony.claimed ? "Claimed" : "Claim"}</button>
                                        </div> */}
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>



            </div>

            <Pop task={task} setTask={setTask} onClose={handleClosePopup} />

        </>

    )
}

export default Colony