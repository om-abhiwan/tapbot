// import announce from "../assets/Colony/announce.png"
// import comment from "../assets/Colony/comment.png"
import dailyReward from "../assets/Colony/dailReward.png"
// import retweet from "../assets/Colony/retweet.png"
import telegram from "../assets/social/TELEGRAM.png"
// import tiktok from "../assets/Colony/tiktok.png"
// import x from "../assets/Colony/x.png"
// import yt from "../assets/Colony/Yt.png"
// import insta from "../assets/Colony/insta.png"
import { checkJoinedSocial, getClaimUserData, getDailyRewardDetails, getSocailTasks } from "../services/apis"
import { useEffect, useState, useContext } from "react"
import { UserInfo } from "../ContextApi/UserData";

import YoutTube from "../assets/social/YOUTUBE.png"
import instagram from "../assets/social/INSTAGRAM.png"
import comment from "../assets/social/comment.png"
import announce from "../assets/social/announcement.png"
import retweet from "../assets/social/retweet.png"
import tiktok from "../assets/social/tiktok.png"
import twitter from "../assets/social/X.png"




const ColonySocialData = () => {

    const [data, setData] = useState([])
    const [claimData, setClaimData] = useState([])
    const [join, setJoin] = useState([])
    const { userInfo, setUserInfo } = useContext(UserInfo)
    const [todayCollected, isTodayCollected] = useState(false)



    const getSocialData = async () => {
        const resp = await getSocailTasks(localStorage.getItem("user_id"))
        const resp1 = await getClaimUserData(localStorage.getItem("user_id"))
        const resp2 = await checkJoinedSocial(localStorage.getItem("user_id"))
        const resp3 = await getDailyRewardDetails(localStorage.getItem("user_id"))
        setJoin(resp2.data)
        setData(resp.data)
        setClaimData(resp1.data)
        isTodayCollected(resp3.data.isClaimed)


        // console.log("status1",userInfo.isLoaderRequire)
        setUserInfo({ ...userInfo, isLoaderRequire: false })
        // console.log("status2",userInfo.isLoaderRequire)


        // console.log(resp)
        // console.log(resp1)
        // console.log(resp2)
        // console.log(resp3)
        // console.log(resp3.data.isClaimed)
    }

    useEffect(() => {
        getSocialData()
    }, [userInfo.isTaskUpdated])



    const DailyTaskData = [
        {
            id: 1,
            name: "Daily Rewards",
            value: "dailytask",
            icon: dailyReward,
            price: 0,
            done: false,
            join: true,
            claim: todayCollected,
            claimName: ""
        },
        // {
        //     id: 2,
        //     name: "Follow X Account",
        //     value: "twitter",
        //     icon: twitter,
        //     price: 20000,
        //     done: data.twitter ? true : false,
        //     join: join.xclaim ? true : false,
        //     claim: claimData.xclaim ? true : false,
        //     claimName: "xclaim",
        //     popText: "Join Our X Account"
        // },
        {
            id: 3,
            name: "Retweet",
            icon: retweet,
            price: 20000,
            value: "retweet",
            done: data.retweet ? true : false,
            claim: claimData.retweetclaim ? true : false,
            join: join.retweetclaim ? true : false,
            claimName: "retweetclaim",
            popText: "Retweet"
        },
        {
            id: 4,
            name: "Comment",
            value: "comment",
            icon: comment,
            price: 20000,
            done: data.comment ? true : false,
            claim: claimData.commentclaim ? true : false,
            join: join.commentclaim ? true : false,
            claimName: "commentclaim",
            popText: "Comment"
        },
    ]

    const taskList = [
        {
            id: 5,
            name: "Telegram Channel",
            value: "telegramChannel",
            icon: telegram,
            price: 5000,
            done: data.telegramChannel ? true : false,
            claim: claimData.telchclaim ? true : false,
            join: join.telchclaim ? true : false,
            claimName: "telchclaim",
            popText: "Join Our TG Channel"
        },
        {
            id: 6,
            name: "Announce Channel",
            value: "telegramAnnouncement",
            icon: announce,
            price: 5000,
            done: data.telegramAnnouncement ? true : false,
            claim: claimData.telanclain ? true : false,
            join: join.telanclain ? true : false,
            claimName: "telanclain",
            popText: "Join Our Announce Channel"
        },
        {
            id: 7,
            name: "X Channel",
            value: "twitter",
            icon: twitter,
            price: 5000,
            done: data.twitter ? true : false,
            claim: claimData.xclaim ? true : false,
            join: join.xclaim ? true : false,
            claimName: "xclaim",
            popText: "Join Our X Account"
        },
        {
            id: 8,
            name: "YouTube Channel",
            value: "youtube",
            icon: YoutTube,
            price: 15000,
            done: data.youtube ? true : false,
            claim: claimData.ytclaim ? true : false,
            join: join.ytclaim ? true : false,
            claimName: "ytclaim",
            popText: "Join Our YT Channel"
        },
        {
            id: 9,
            name: "Instagram Channel",
            value: "instagram",
            icon: instagram,
            price: 5000,
            done: data.instagram ? true : false,
            join: join.instaclaim ? true : false,
            claim: claimData.instaclaim ? true : false,
            claimName: "instaclaim",
            popText: "Join Our IG Account"
        },
        {
            id: 10,
            name: "TikTok Channel",
            value: "tiktok",
            icon: tiktok,
            price: 5000,
            done: data.tiktok ? true : false,
            join: join.tiktokclaim ? true : false,
            claim: claimData.tiktokclaim ? true : false,
            claimName: "tiktokclaim",
            popText: "Join Our Tiktok Account"
        },
    ]

    return { DailyTaskData, taskList }

}

export default ColonySocialData

