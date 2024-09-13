import "./Invite.css"
import Reloader from "../../assets/reloader.svg"
import HrInvite from "../../assets/hrInvite.svg"
// import Avatar1 from "../../assets/userAvatar1.svg"
import CoinInvite from "../../assets/coinInvite.svg"
import inviteImg from "../../assets/inviteCoins.svg"
import { getReferralLinkData, getReferralUserData } from "../../services/apis"
import { useContext, useEffect, useState } from "react"
import avatar from "../../assets/avatar.png"
// import inviteFrndBtn from "../../assets/invitefrndBtn.svg"
import inviteFrndBtn from "../../assets/invite.png"
import copyIcon from "../../assets/copyIcon.svg"
import { UserInfo } from "../../ContextApi/UserData"
import InviteLoader from "../../components/InviteLoader/InviteLoader"

const Invite = () => {

  const [referalLink, setReferalLink] = useState("")
  const [refferalLength, setReferralLength] = useState(0)
  const [refferData, setReferraData] = useState([])
  const [rotate, setRotate] = useState(false);
  const [shareLink, setShareLink] = useState("")
  const [showCopyMessage, setShowCopyMessage] = useState(false);


  const [loader, setLoader] = useState(false)



  const { userInfo, setUserInfo } = useContext(UserInfo)



  useEffect(() => {
    setUserInfo({ ...userInfo, isLoaderRequire: true })
  }, [])

  useEffect(() => {

    setLoader(userInfo.isLoaderRequire)

  }, [userInfo.isLoaderRequire])








  // getting refferalLink
  const refferalLink = async () => {
    try {
      const resp = await getReferralLinkData(localStorage.getItem("user_id"))
      // console.log(resp)
      setReferalLink(resp.data.refralCode)
    } catch (err) {
      console.log(err)
    }
  }

  // getting the info of refferal Link
  const getRefferalUserData = async () => {

    const resp = await getReferralUserData(localStorage.getItem("user_id"))
    setReferraData(resp.data.refralData)
    setReferralLength(resp.data.refralData.length)
    setUserInfo({ ...userInfo, isLoaderRequire: false })
  }

  // hanlde reload function
  const handleReload = () => {
    setRotate(true);
    refferalLink()
    getRefferalUserData()
    setTimeout(() => {
      setRotate(false);
    }, 3000);
  }


  const handleInvite = () => {
    let text = `invite!`;
    let url = referalLink
    var encodedUrl = encodeURIComponent(url);
    var encodedText = encodeURIComponent(text);
    var shareUrl = 'https://t.me/share/url?url=' + encodedUrl + '&text=' + encodedText;
    var shareLinkHtml = shareUrl;
    // alert(shareLinkHtml)
    setShareLink(shareLinkHtml)
  }


  const handleCopyLink = () => {
    navigator.clipboard.writeText(referalLink).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => {
        setShowCopyMessage(false);
      }, 2000); // Message will disappear after 2 seconds
    }).catch((err) => {
      console.error('Failed to copy: ', err);
    });
  }



  useEffect(() => {

    refferalLink()
    getRefferalUserData()
    handleInvite()


  }, [referalLink])


  return (
    <div className="inviteMainDiv">

      <div className="inviteImg">
        <img src={inviteImg} />
      </div>


      {/* heading of ivite friends */}
      <div className="inviteHeading">
        <p className="inviteHead">Invite Friends</p>
        <p className="inviteDesc">
          You and your buddy will receive bonusses! Get ready for some awesome rewards coming your way!
        </p>
      </div>


      {/* invite friends */}
      <div className="inviteButtonMainDiv">
        <div className="inviteButton telegram-container">
          <a href={shareLink} target="_blank" >
            <button className="btn invitebtn" >
              <img src={inviteFrndBtn} />
            </button>
          </a>


          <div className="copyLink" onClick={handleCopyLink}>
            <img src={copyIcon} width={20} />
          </div>

        </div>
      </div>



      {showCopyMessage && <div className="copy-message">Link copied to clipboard!</div>}





      {/* List of our friends */}

      <div className="inviteListMainDiv">
        <div className="inviteListheader">
          <div className="noOfFriends">
            List of your friends ({refferalLength})
          </div>
          <div className="Reloader">
            <img src={Reloader} alt="reloader" width={20} height={20} onClick={handleReload} className={rotate ? 'rotate' : ''} />
          </div>
        </div>


        {/* HR divider */}
        <div className="hrInvite">
          <img src={HrInvite} alt="hrInvite" />
        </div>






        {/* User lists */}

        {loader ? <InviteLoader /> :


          refferalLength === 0 ?
            <div className="noDataInvite" >
              <h3>No Data Found....</h3>
            </div> :
            < div className="mainUserList">

              {/* 1st user */}




              {
                refferData.map((ref, index) => (

                  <div className="userListInvite my-2" key={index} >

                    <div className="leftInvitecol">
                      <div className="userInviteAvatar">
                        <img src={avatar} alt="avatar" width={30} />
                      </div>
                      <div className="userInviteInfo px-2">
                        <div className="userInviteName">{ref.name}</div>
                        <div className="userInviteRank">
                          <span className="inviteRank">{ref.currentLevel}</span>
                        </div>
                      </div>
                    </div>


                    <div className="rightInviteCol px-2">
                      <div className="inviteColInfo">
                        <div className="coinInviteAvatar px-2">
                          <img src={CoinInvite} alt="coin" width={35} />
                        </div>
                        <div className="coinIniviteNo">
                          +{ref.totalCoin / 1000}k
                        </div>
                      </div>
                    </div>

                  </div>
                ))
              }



















            </div>

        }

      </div>

    </div >
  )
}

export default Invite