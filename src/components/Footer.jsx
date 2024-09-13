import "./Footer.css"
// import BgIcon from "../assets/iconBg.svg"
// import BackIcon from "../assets/backImg.svg"

import { NavLink } from "react-router-dom";
// import Invite from "../assets/footerInvite.svg"
// import Task from "../assets/task.svg"
// import Tap from "../assets/tap.svg"
// import Booster from "../assets/booster.svg"
// import Earn from "../assets/Earn.svg"
// import { useEffect, useState } from "react";

import Tap from "../assets/botttombar/Coin.png"
import AI from "../assets/botttombar/ai.png"
import Task from "../assets/botttombar/Task.png"
import Earn from "../assets/botttombar/earn.png"
import Invite from "../assets/botttombar/invite.png"


const Footer = () => {
  return (
    <>

      <div className="footerMainDiv">







        <div className="footerDiv">

          <NavLink to="/invite" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Invite} />
              </div>

              <div className="footerButtonHeading">
                Invite
              </div>


            </button>
          </NavLink>




          <NavLink to="/task" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Task} />
              </div>

              <div className="footerButtonHeading">
                Task
              </div>


            </button>
          </NavLink>



          <NavLink to="/" activeclassname="active">

            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Tap} />
              </div>

              <div className="footerButtonHeading">
                Click
              </div>


            </button>
          </NavLink>








          <NavLink to="/earn" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={Earn} />
              </div>

              <div className="footerButtonHeading">
                Earn
              </div>


            </button>
          </NavLink>

          <NavLink to="/ai" activeclassname="active">
            <button className="footerButton">

              <div className="footerButtonImg">
                <img src={AI} style={{ height: "120%" }} />
              </div>

              <div className="footerButtonHeading">
                AI
              </div>


            </button>
          </NavLink>


        </div>








      </div>

    </>
  )
}

export default Footer