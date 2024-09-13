/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from "react";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import OrangeImg from "../assets/orange.svg"
import { UserInfo } from "../ContextApi/UserData";
import newbiewsAnim from "../assets/Char/newbiesAnim.png"
import cadetAnim from "../assets/Char/cadetAnim.png"
import captainAnim from "../assets/Char/captainAnim.png"
import colonelAnim from "../assets/Char/colonelAnim.png"
import generalAnim from "../assets/Char/generalAnim.png"
import lieutenantAnim from "../assets/Char/lieutenantAnim.png"
import majorAnim from "../assets/Char/majorAnim.png"
import officerAnim from "../assets/Char/officerAnim.png"
import queenAnim from "../assets/Char/queenAnim.png"
import brigadierAnim from "../assets/Char/brigadierAnim.png"
import clickCoin from "../assets/coinClick.png"
import coinBoostImg from "../assets/botttombar/Coin.png"

const Home = ({ socket }) => {
  // const [totalCoins, setTotalCoins] = useState(0);
  const { userInfo, setUserInfo } = useContext(UserInfo)

  // at time of animation displaying the charcter pain animation 
  const [isAnimating, setIsAnimating] = useState(false);
  // console.log(userInfo)

  // setting clicks
  const [clicks, setClicks] = useState([]);
  // const [coinStyle, setCoinStyle] = useState({});


  // using to set the value to check user is currently on sleeping mode or not
  const [isSleep] = useState("false")
  const [isPer] = useState("100%")



  const handleTap = () => {
    // console.log(userInfo.tap_coins)
    if (userInfo.used_taps > 0 && !localStorage.getItem("turbo_use")) {

      if (userInfo.used_taps - userInfo.tap_coins >= 0) {
        setUserInfo((prevTapsInfo) => ({
          ...prevTapsInfo,
          used_taps: prevTapsInfo.used_taps - userInfo.tap_coins,
        }));
      } else {
        setUserInfo((prevTapsInfo) => ({
          ...prevTapsInfo,
          used_taps: 0,
        }));
      }

    }
  };



  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const emitData = () => {
    if (userInfo) {
      // console.log(userInfo)
      // socket.emit("message", `${userInfo.user_id}, ${userInfo.tap_coins}`);
      socket.emit("addcoin", `${userInfo.user_id}, ${userInfo.total_coins + userInfo.tap_coins}, ${userInfo.tap_coins}`);
      // console.log(userInfo.total_coins + userInfo.tap_coins)
    }
  }

  // facing issue while tapping with 2 fingure that is solution
  const handleTouchStart = useCallback((e) => {

    // e.preventDefault()
    window.Telegram?.WebApp.expand(); // expand telegram web app

    // vibration for android and ios both
    const navigatorVibrate =
      navigator.vibrate ||
      navigator.webkitVibrate ||
      navigator.mozVibrate ||
      navigator.msVibrate;
    if (navigatorVibrate) {
      navigatorVibrate.call(navigator, [50]);
    } else {
      window.Telegram?.WebApp?.HapticFeedback.impactOccurred("medium");
    }

    // for char anim
    if (isAnimating !== true) {
      setIsAnimating(true);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    Array.from(e.touches).forEach((touch) => {
      const newTotalCoins = userInfo.total_coins + userInfo.tap_coins;
      const newAllcoins = userInfo.allCoins + userInfo.tap_coins
      setUserInfo({ ...userInfo, total_coins: newTotalCoins, allCoins: newAllcoins });
      // to update 
      handleTap()
      setClicks((prevClicks) => [
        ...prevClicks,
        { left: touch.clientX, top: touch.clientY },
      ]);
    });





    const d = debounce(emitData, 500);
    d();


  })

  useEffect(() => {
    let time = setTimeout(() => {
      setClicks((prevClicks) => prevClicks.slice(clicks.length - 1));
    }, 500)

    return () => clearTimeout(time);
  }, [clicks])


  // Dynamic source for the image based on animation state
  const getImageSource = () => {

    if (isAnimating) {

      // alert(userInfo.rank)

      if (userInfo.rank === "Newbies") {
        return newbiewsAnim
      }
      else if (userInfo.rank === "Officer") {
        return officerAnim
      }
      else if (userInfo.rank === "Cadet") {
        return cadetAnim
      }
      else if (userInfo.rank === "Lieutenant") {
        return lieutenantAnim
      }
      else if (userInfo.rank === "Captain") {
        return captainAnim
      }
      else if (userInfo.rank === "Major") {
        return majorAnim
      }
      else if (userInfo.rank === "Colonel") {
        return colonelAnim
      }
      else if (userInfo.rank === "Brigadier") {
        return brigadierAnim
      }
      else if (userInfo.rank === "General") {
        return generalAnim
      }
      else if (userInfo.rank === "Queen") {
        return queenAnim
      }



    } else {
      return userInfo.avatar;
    }
  };


  return (
    <>
      <div className="coinDiv">
        {/* ton and gol coin info */}
        <CoinInfo />

        {/* total no of coins */}
        <div className="totalCoins">
          <img src={clickCoin} width={40} />{userInfo.total_coins}
        </div>

        {/* backgorund Orange Img */}
        <div className="orangeImg">
          <img src={OrangeImg} className="orgImg" />
        </div>

        <div
          className="charAnim"
          onScroll={(e) => e.target.scrollTop = 0}
        >
          <img
            src={getImageSource()}
            className="coinTest"
            tabIndex="0"
            role="button"
            aria-pressed="false"
          />
        </div>


        <div className="homeBoostOption">
          <div className="homeBoostDetails" style={{ width: isPer }}></div>
          {
            isSleep === "false" ?
              <div className="homeBoostData1">
                START
              </div> : ""
          }
          {
            isSleep === "active" ?
              <div className="homeBoostData">
                <div>
                  <img src={coinBoostImg} alt="coin" width={30} />
                </div>
                <div>
                  Sleep To Earn
                </div>
                <div >
                  03:52:51
                </div>
              </div> : ""
          }
          {
            isSleep === "claim" ?
              <div className="homeBoostData1">
                <img src={coinBoostImg} alt="coin" width={30} /> CLAIM
              </div> : ""
          }
        </div>
      </div>
    </>
  );
};

export default Home;
