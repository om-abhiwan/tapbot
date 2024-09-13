import "./Booster.css"
import RightArrow from "../../assets/Booster/rightArrow.svg"
import { useContext, useEffect, useState } from "react"
import { UserInfo } from "../../ContextApi/UserData"
// import { freeBooster } from "../../Data/Booster"
import BoosterPop from "../../components/BoosterPopup/BoosterPop"
import BoosterData from "../../Data/Booster"
import NoLimit from "../../components/NoLimit/NoLimit"


const Booster = () => {


  const { freeBoosterData, upgradeBoostData } = BoosterData()
  const [noLimit, setNoLimit] = useState(false)
  const [hireAntStatus, setHireAntStatus] = useState(false)
  const [access, setAccess] = useState(false)
  const { userInfo, setUserInfo } = useContext(UserInfo)

  const [boost, setBoost] = useState(null);

  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)







  useEffect(() => {
    setUserInfo({ ...userInfo, isLoaderRequire: true, isLoader2Require: true })
  }, [])


  useEffect(() => {


    setLoader2(userInfo.isLoaderRequire)
    setLoader(userInfo.isLoader2Require)


  }, [userInfo.isLoaderRequire, userInfo.isLoader2Require])






  const handleTaskPopup = (data) => {
    if (userInfo.total_coins - data.charges >= 0) {
      setBoost(data)
    } else {
      setAccess(true)
    }
  }

  const handleClosePopup = () => {
    setBoost(null)
  }


  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoader(false)
  //   }, 750)
  // })


  const handleNoLimit = () => {
    setNoLimit(true)
  }

  const handleHireAntStatus = () => {
    setHireAntStatus(true)
  }





  useEffect(() => {

    if (access || noLimit || boost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

  }, [boost, noLimit, access])


  return (
    <>
      <div className={`boosterMainDiv  ${boost || hireAntStatus || noLimit || access ? 'blur' : ''} `}>

        {/* balance Info */}
        <div className="balanceInfo my-3">
          <p>Your Balance</p>
          <p className="boosterCoin">${userInfo.total_coins}</p>
        </div>

        {/* Free Boosters */}
        <div className="FreeBoosterMainDiv">
          <p className="mx-3 freeBoosterHeading">Free Boosters</p>
          {freeBoosterData.map((booster) => (
            <div key={booster.id} className="booster my-3" onClick={() => loader ? "" : booster.limit == 0 ? handleNoLimit() : handleTaskPopup(booster)}>
              <div className="boosterLeft"  >
                <div className="boosterIcon">
                  <img src={booster.icon} width={25} alt={booster.name} />
                </div>
                <div className="boosterHeading mx-3">
                  <p className="boosterName">{booster.name}</p>
                  <p className="boosterAvail">{loader ? "loading..." : booster.available ? "Available" : "Not Available"}  {loader ? "" : "| " + booster.limit} </p>
                </div>
              </div>
              <div className="boosterRightColArrow">
                <img src={RightArrow} alt="Right Arrow" />
              </div>
            </div>
          ))}
        </div>





        {/* Upgrade Boosters */}
        <div className="UpgradeBoosterMainDiv">
          <p className="mx-3 freeBoosterHeading">Upgrade Boosters</p>
          {upgradeBoostData
            .map((booster) => (
              <div
                key={booster.id}
                className="booster my-3"
                onClick={() =>
                  loader ? "" :
                    booster.id === 6 && booster.level === '0' ? handleNoLimit() :
                      userInfo.hireant === true && booster.id === 6
                        ? handleHireAntStatus()
                        : booster.currentLevel + 1 !== 11
                          ? handleTaskPopup(booster)
                          : handleNoLimit()
                }  >
                {/* {booster.level === '0' && booster.id === 6 ? "true" : "false"} */}
                <div className="boosterLeft">
                  <div className="boosterIcon">
                    <img src={booster.icon} width={25} alt={booster.name} />
                  </div>
                  <div className="boosterHeading mx-3">
                    <p className="boosterName">{booster.name}</p>



                    {

                      loader2 ? "loading..." :
                        booster.id !== 6 ?
                          <p className="boosterAvail">
                            {booster.currentLevel + 1 !== 11 ? booster.charges : "Limit Full"} | {booster.currentLevel + 1 !== 11 ? booster.currentLevel + 1 : booster.currentLevel}
                          </p> :
                          <p className="boosterAvail">{booster.level !== 0 ? booster.charges : "Limit Full"} | {booster.level}
                          </p>
                    }





                  </div>
                </div>
                <div className="boosterRightColArrow">
                  <img src={RightArrow} alt="Right Arrow" />
                </div>
              </div>
            ))}
        </div>


      </div >
      <BoosterPop boost={boost} setBoost={setBoost} onClose={handleClosePopup} />



      {
        noLimit ? <NoLimit setNoLimit={setNoLimit} id={1} text={"You have reached the maximum limit..."} /> : ""
      }
      {
        access ? <NoLimit setAccess={setAccess} id={2} text={"You don't have enough money to purchase..."} /> : ""
      }
      {
        hireAntStatus ? <NoLimit setAccess={setHireAntStatus} id={2} text={"Hire Ant is active already "} /> : ""
      }

    </>
  )
}

export default Booster