import './App.css'
import Home from './Pages/Home'
import { Routes, Route, useLocation } from "react-router-dom"
import Layout from './Layout/Layout'
import Earn from './Pages/Earn/Earn';
import Invite from './Pages/Invite/Invite';
import Booster from './Pages/Booster/Booster';
import Task from './Pages/Task/Task';

import { useContext, useEffect, useState } from 'react';
import { UserInfo } from './ContextApi/UserData';
import BoosterData from './ContextApi/BoosterData';
import Loader from './components/Loader/Loader';
import SocialContext from './ContextApi/SocialContext';
import Rank from './Pages/Rank/Rank';
import Offline from './components/Offline/Offline';
import { getUserData } from './services/apis';
import AI from './Pages/AI/AI';


import { Toaster } from 'react-hot-toast';
import AiLoader from './components/AILoader/AiLoader';





function App() {
  const location = useLocation();
  const [loader, setloadder] = useState(false)
  const [offline, setOffline] = useState(false)
  const [user_id, setUser_id] = useState("")
  const { userInfo, setUserInfo } = useContext(UserInfo)
  const [isAiLoader, setAiLoader] = useState(false)


  const [shouldCalculate, setShouldCalculate] = useState(false);


  // api addedd 
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    const tgWebAppData = searchParams.get("tgWebAppData");
    if (tgWebAppData) {
      const userParam = new URLSearchParams(tgWebAppData).get("user");
      if (userParam) {
        const decodedUserParam = decodeURIComponent(userParam);
        const userObject = JSON.parse(decodedUserParam);
        const userId = userObject.id;
        console.log(userId)
        setUser_id(userId);
        localStorage.setItem("user_id", userId);
      }
    } else {
      // when user came from another page so we need to maintain and save the id
      const savedUserId = localStorage.getItem("user_id");
      if (savedUserId) {
        setUser_id(savedUserId)
      }
    }
  }, []);





  const getData = async (id) => {
    let resp = await getUserData(id)
    let respData = resp.data
    console.log("respdata", respData)
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      name: respData?.name,
      user_id: user_id ? user_id : "",
      allCoins: respData?.totalCoin,
      total_coins: respData?.coin,
      rank: respData?.currentLevel,
      ton_coins: respData?.toncoin,
    }));


    setShouldCalculate(true);



  }





  // for expand the screen with no movement
  useEffect(() => {
    if (user_id) {
      getData(user_id)
    }
  }, [user_id])


  useEffect(() => {
    setTimeout(() => {
      window.Telegram?.WebApp.expand();
    }, 0);
  }, []);


  // loader
  useEffect(() => {
    setloadder(true)
    setTimeout(() => {
      setloadder(false)
      setAiLoader(true)
    }, 2000)
  }, [])






  useEffect(() => {
    function isOffLine() {
      setOffline(true)
    }

    function isOnline() {
      setOffline(false)
    }

    window.addEventListener('online', isOnline);
    window.addEventListener('offline', isOffLine);

    return () => {
      window.removeEventListener('online', isOnline);
      window.removeEventListener('offline', isOffLine);
    }
  }, [])











  // making home page unscrollable and other page can scroll
  useEffect(() => {
    const pathsToAllowOverflow = ["task", "boost", "invite", "earn", "rank", "ai"];
    const currentPath = location.pathname;

    if (pathsToAllowOverflow.some(path => currentPath.includes(path))) {
      document.body.style.overflowY = 'auto';
    } else {
      document.body.style.overflowY = 'hidden';
    }
  }, [location]);



  // agr startime hai and end time h toh hm current token nikal kr provide kr rhe h 
  useEffect(() => {

    // let count = userInfo.count
    let startTime = new Date(userInfo.boostStart)
    let endTime = new Date(userInfo.boostEnd)

    if (startTime && endTime) {
      let now = new Date()

      if (now < new Date(endTime)) {
        // const timeDiff = (now - new Date(startTime)) / (1000 * 60 * 60 * 24); // Fraction of the 24 hours passed
        // const expectedCount = Math.min(count + Math.floor(timeDiff * userInfo.countLimit), userInfo.countLimit);
        const timeDiff = (now - new Date(startTime)) / (endTime - startTime); // Fraction of the 24 hours passed
        const expectedCount = Math.min(Math.floor(timeDiff * userInfo.countLimit), userInfo.countLimit);

        console.log("expected---", expectedCount)

        setUserInfo((prevTapsInfo) => ({
          ...prevTapsInfo,
          total_coins: prevTapsInfo.total_coins + expectedCount,
          allCoins: prevTapsInfo.allCoins + expectedCount,
          count: expectedCount,
        }));


        setShouldCalculate(false);


      } else if (now >= new Date(endTime)) {

        let restCoins = userInfo.countLimit - userInfo.count;

        setUserInfo((prevTapsInfo) => ({
          ...prevTapsInfo,
          total_coins: prevTapsInfo.total_coins + restCoins,
          allCoins: prevTapsInfo.allCoins + restCoins,
          count: prevTapsInfo.count + restCoins,
        }));


      }
    }

  }, [shouldCalculate, userInfo.boost])



  // if boost true then we have to provide the coins and need to check the status of boost each time

  const provideCoins = async () => {
    setUserInfo((prevTapsInfo) => ({
      ...prevTapsInfo,
      total_coins: prevTapsInfo.total_coins + 1,
      allCoins: prevTapsInfo.allCoins + 1,
      count: prevTapsInfo.count + 1
    }));
  }

  useEffect(() => {

    const totalCoins = userInfo.countLimit; // Total coins to distribute
    const totalSeconds = 24 * 60 * 60; // Total seconds in 24 hours
    const intervalMs = (totalSeconds / totalCoins) * 1000; // Interval in milliseconds per coin

    const intervalId = setInterval(() => {
      if (userInfo.boost && (userInfo.count < userInfo.countLimit)) {   //checking ki kya boost true h if yes toh kya countLimit ko cross kr rha h ya nhi if not then increase else not
        // console.log("hmm bhai ")
        provideCoins();
      }
    }, (intervalMs))
    return () => clearInterval(intervalId);
  }, [userInfo.boost, userInfo.count, userInfo.countLimit])



  return (
    <>

      {
        offline ? <Offline /> : loader ?
          <Loader />
          : isAiLoader ? <AiLoader setAiLoader={setAiLoader} /> :

            <SocialContext>
              <BoosterData>
                <Routes>
                  <Route path='' element={<Layout />} >
                    <Route path="/" element={<Home />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/boost" element={<Booster />} />
                    <Route path="/invite" element={<Invite />} />
                    <Route path="/earn" element={<Earn />} />
                    <Route path="/rank" element={<Rank />} />
                    <Route path="/ai" element={<AI />} />
                  </Route>
                </Routes>
                <Toaster />
              </BoosterData>
            </SocialContext>

      }

    </>
  )
}

export default App