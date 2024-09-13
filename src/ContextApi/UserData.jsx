import { useEffect, useState } from "react";
import { createContext } from "react";

import brigadier from "../assets/Char/brigadier.png";
import cadet from "../assets/Char/cadet.png";
import captain from "../assets/Char/captain.png";
import colonel from "../assets/Char/colonel.png";
import general from "../assets/Char/general.png";
import lieutenant from "../assets/Char/lieutenant.png";
import major from "../assets/Char/major.png";
import newbies from "../assets/Char/newbies.png";
import officer from "../assets/Char/officer.png";
import queen from "../assets/Char/queen.png";

export const UserInfo = createContext(null);

const UserData = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    // Retrieve from localStorage or set default state
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo
      ? JSON.parse(savedUserInfo)
      : {
        name: "",
        user_id: "",
        no_of_taps: 0,
        total_coins: 0,
        allCoins: 0,
        rank: "Newbie",
        ton_coins: 0,
        gold_coins: 0,
        tap_coins: 1,
        used_taps: 500,
        total_taps: 500,
        avatar: newbies,
        blur: false,
        isTaskUpdated: false,
        isLoaderRequire: true,
        isLoader2Require: true,
        boost: false,
        boostStart: null,
        boostEnd: null,
        countLimit: 100000,
        count: 0,
        claimed: false
      };
  });

  // Save userInfo to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);
  // 
  // console.log(userInfo)

  useEffect(() => {
    // setting up the user rank 
    const updateUserRank = () => {
      if (userInfo.allCoins >= 0 && userInfo.allCoins <= 199999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Newbies",
          avatar: newbies,
        }));
      } else if (userInfo.allCoins >= 200000  && userInfo.allCoins <= 999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Cadet",
          avatar: cadet,
        }));
      } else if (userInfo.allCoins >= 1000000  && userInfo.allCoins <= 9999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Officer",
          avatar: officer,
        }));
      } else if (userInfo.allCoins >= 10000000  && userInfo.allCoins <= 49999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Lieutenant",
          avatar: lieutenant,
        }));
      } else if (userInfo.allCoins >= 50000000  && userInfo.allCoins <= 99999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Captain",
          avatar: captain,
        }));
      } else if (userInfo.allCoins >= 100000000  && userInfo.allCoins <= 499999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Major",
          avatar: major,
        }));
      } else if (userInfo.allCoins >= 250000000  && userInfo.allCoins <= 499999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Colonel",
          avatar: colonel,
        }));
      } else if (userInfo.allCoins >= 500000000 && userInfo.allCoins <= 999999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Brigadier",
          avatar: brigadier,
        }));
      } else if (userInfo.allCoins >= 1000000000 && userInfo.allCoins <= 9999999999) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "General",
          avatar: general,
        }));
      } else if (userInfo.allCoins >= 10000000000) {
        setUserInfo((prevState) => ({
          ...prevState,
          rank: "Queen",
          avatar: queen,
        }));
      }
    };

    updateUserRank();
  }, [userInfo.allCoins]);

  return (
    <UserInfo.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfo.Provider>
  );
};

export default UserData;
