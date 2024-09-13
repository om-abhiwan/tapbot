import "./Ton.css"
import Wheel from "../Wheel/Wheel"
import { getReferralUserData, getTonClaim } from "../../services/apis"
import { useContext, useEffect, useState } from "react"
import NoSpin from "../NoSpin/NoSpin"
import TonPop from "../TonPopup/TonPop"
import tonknowk from "../../assets/Earn/tonKnowk.svg"
import { UserInfo } from "../../ContextApi/UserData"
import TonLoader from "../TonLoader/TonLoader"

const Ton = () => {

  const [totalInvite, setTotalInvite] = useState(0)


  // const [allTon, setAllTon] = useState({
  //   "claim1": true,
  //   "claim2": false,
  //   "claim3": false,
  //   "claim4": false,
  //   "claim5": false,
  //   "claim6": false,
  //   "claim7": false,
  //   "claim8": false,
  //   "claim9": false,
  //   "claim10": false
  // })
  const [allTon, setAllTon] = useState({})

  const [showTonPop, setShowTonPop] = useState(false)

  const [winAmount, setWinAmount] = useState(0)


  const { userInfo, setUserInfo } = useContext(UserInfo)


  const [loader, setLoader] = useState(false)



  useEffect(() => {
    setUserInfo({ ...userInfo, isLoaderRequire: true })
  }, [])



  useEffect(() => {

    setLoader(userInfo.isLoaderRequire)

  }, [userInfo.isLoaderRequire])



  const getNoOfInvite = async () => {
    const resp = await getReferralUserData(localStorage.getItem("user_id"))
    // console.log(resp)
    setTotalInvite(resp.data.refralData.length)
  }
  // console.log(allTon.claim1)


  // to count the no of spin user has 
  // const getNoSpin = () => {
  //   let spin = 0
  //   for (let i = 0; i <= totalInvite; i++) {
  //     if (
  //       (i === 1 && allTon.claim1 === false) ||
  //       (i === 3 && allTon.claim2 === false) ||
  //       (i === 10 && allTon.claim3 === false) ||
  //       (i === 25 && allTon.claim4 === false) ||
  //       (i === 50 && allTon.claim5 === false) ||
  //       (i === 100 && allTon.claim6 === false) ||
  //       (i === 500 && allTon.claim7 === false) ||
  //       (i === 1000 && allTon.claim8 === false) ||
  //       (i === 10000 && allTon.claim9 === false) ||
  //       (i === 100000 && allTon.claim10 === false)
  //     ) {
  //       spin += 1
  //     }
  //     setGetSpin(spin)
  //   }
  // }

  const getTonData = async () => {
    const resp = await getTonClaim(localStorage.getItem("user_id"))
    // console.log(resp.data.claim1)
    setAllTon(resp.data.claim1)
    setUserInfo({ ...userInfo, isLoaderRequire: false })
  }

  // const getChatid = () => {
  //   for (const [key, value] of Object.entries(allTon)) {
  //     if (!value) {
  //       return key;
  //     }
  //   }
  //   return null;
  // };




  // useEffect(() => {
  //   let id = getChatid()
  //   setChatId(id)
  // }, [allTon])

  // get no of invite
  useEffect(() => {
    getNoOfInvite()
    getTonData()
  }, [])

  // get no of spin
  // useEffect(() => {
  //   getNoSpin()
  // }, [totalInvite, allTon])





  return (
    <>
      {/* to show the popup */}
      {
        showTonPop ? <TonPop getTonData={getTonData} winAmount={winAmount} setShowTonPop={setShowTonPop} /> : ""
      }
      <div className="tonMainDiv">
        <div className="tonSection">
          {/* {getSpin} */}

          {/* showing messgae if spin is not avail */}
          {
            loader ? <TonLoader /> : allTon ? <NoSpin /> : ""
          }

          {/* making blur if no spin */}
          <div className={`tonspin ${allTon ? "tonBlur" : ""} `}>
            {

              <Wheel tonknowk={tonknowk} getSpin={allTon} setShowTonPop={setShowTonPop} totalInvite={totalInvite} setWinAmount={setWinAmount} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Ton