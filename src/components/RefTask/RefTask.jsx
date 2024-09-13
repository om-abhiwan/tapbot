import "./RefTask.css"
import inviteicon from "../../assets/Task/inviteIcon.svg"
import coin from "../../assets/tonCoins.svg"
import InviteData from "../../Data/InviteData"
import { updateClaimUserData, updateCoins } from "../../services/apis"
import { UserInfo } from "../../ContextApi/UserData"
import { useContext, useEffect, useState } from "react"
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from 'react-bootstrap/Spinner';

const RefTask = () => {


    const { setUserInfo, userInfo } = useContext(UserInfo)

    const [loader, setLoader] = useState(false)


    const [inviteId, setInviteId] = useState(null)


    const [loading, setLoading] = useState(false)



    useEffect(() => {
        setUserInfo({ ...userInfo, isLoaderRequire: true })
    }, [])


    useEffect(() => {
        setLoading(userInfo.isLoaderRequire)
    }, [userInfo.isLoaderRequire])




    useEffect(() => {
        setLoader(true)

        setTimeout(() => {
            setLoader(false)
            setInviteId(null)
        }, 500)


    }, [userInfo.isTaskUpdated])


    const handleClaim = async (name, coins, id) => {
        setInviteId(id)
        const res = await updateClaimUserData(localStorage.getItem("user_id"), name)
        const res1 = await updateCoins(localStorage.getItem("user_id"), coins)
        if (res.status === 200) {
            if (userInfo.isTaskUpdated === true) {
                setUserInfo({ ...userInfo, Test: 0, isTaskUpdated: false })
            } else {
                setUserInfo({ ...userInfo, isTaskUpdated: true })
            }
        }

        if (res1.status == 200) {
            if (userInfo.isTaskUpdated === true) {
                let updatedCoins = userInfo.total_coins + coins
                setUserInfo({ ...userInfo, Test: 0, total_coins: updatedCoins, isTaskUpdated: false })
            } else {
                let updatedCoins = userInfo.total_coins + coins
                setUserInfo({ ...userInfo, Test: 0, total_coins: updatedCoins, isTaskUpdated: true })
            }


        }



    }


    return (
        <>

            <div className="refTaskMainDiv">

                <div className="reftaskHead">
                    Referral Task
                </div>





                {/* 1st invite */}
                <div className="inviteListDiv">



                    {
                        InviteData().map((invite, index) => (
                            <>
                                <div className="inviteDiv my-2 " key={invite.id}>
                                    <div className="inviteUpperDiv">
                                        <div className="leftColInvite">
                                            <div className="inviteIcon">
                                                <img src={inviteicon} alt="invite" width={40} />
                                            </div>
                                            <div className="inviteDetails mx-1 ">
                                                <div className="inviteNos">Invite {invite.no_of_invite} Friend</div>
                                                <div className="inviteCoins">
                                                    <img src={coin} width={15} alt="coin" className="ml-2" />
                                                    {invite.price}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rightColInvite text-center " onClick={() => { invite.done && invite.claim === false ? handleClaim(invite.claimName, invite.price, invite.id) : "" }}>



                                            {

                                                loading ? <Spinner animation="border" variant="light" /> :

                                                    loader && (index + 1 === inviteId) ?
                                                        <button className="btn">
                                                            <Spinner animation="border" variant="light" />
                                                        </button>
                                                        : <button
                                                            className={`btn ${invite.claim === true ? "clamied" : invite.done && invite.claim === false ? 'clamied' : "noClamied"}  `}> {invite.claim ? "Claimed" : "Claim"}</button>
                                            }


                                        </div>
                                    </div>
                                    <div className="inviteLowerDiv">
                                        {/* progress Bar */}
                                        <div className="">
                                            <ProgressBar style={{ height: "14px" }} now={invite.totalRef >= invite.no_of_invite ? 100 : (invite.totalRef / invite.no_of_invite) * 100} />

                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }








                </div>


            </div>


        </>
    )
}

export default RefTask