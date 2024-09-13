// import profile from "../assets/userProfile.svg"
// import BianceLogo from "../assets/bianceLogo.svg"
import OfficerLogo from "../assets/officeIcon.svg"
import "./Header.css"
import { useContext, useState } from "react"
import { UserInfo } from "../ContextApi/UserData"
import avatar from "../assets/Rank/Avatar1.png"
// import { NavLink } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProfilePopup from "./ProfilePopup/ProfilePopup"



const Header = () => {

    const { userInfo } = useContext(UserInfo)
    const [profilePop, setProfilePop] = useState(false)


    return (
        <>

            <div className="headerMainDiv">


                <div className="leftCol">
                    <div className="userProfile">
                        <img src={avatar} alt="profile" width={40} onClick={() => { setProfilePop(true) }} />
                        <div className="profileNameDiv">
                            <div className="profileName">
                                {userInfo.name.slice(0, 8)}
                            </div>
                        </div>
                    </div>
                    <div className="userName mx-2">
                        {/* {userInfo?.name?.substring(0, 6)}
                        {userInfo?.name.length > 6 ? "..." : ""} */}
                        {/* {userInfo?.name?.substring(0, 6)}
                        {userInfo?.name.length > 6 ? "..." : ""} */}
                    </div>
                </div>

                <div className="rightCol">
                    <NavLink to="/rank" >
                        <div className="walletLogo">
                            <img src={OfficerLogo} alt="BianceLogo" width={20} />
                        </div>
                        <div className="walletName mx-2">
                            {userInfo?.rank}
                            <span style={{ fontWeight: "700" }} ><ChevronRightIcon /></span>
                        </div>
                    </NavLink>
                </div>


            </div>

            {
                profilePop && <ProfilePopup show={profilePop} setShow={setProfilePop} />
            }

        </>
    )
}

export default Header