import "../RankList/RankList.css"
// import topPlayerIcon from "../../assets/Rank/topPlayerIcon.svg"
// import SecondPlayer from "../../assets/Rank/SecondPlayer.png"
// import thirdPlayer from "../../assets/Rank/thirdPlayer.png"
// import avatar from "../../assets/Rank/Avatar1.png"
// import coin from "../../assets/coin3.ico"

const GoldLeaderboard = () => {
    return (
        <div className="RankListMainDiv">



            <h4 className="text-center mt-5 " >No Data Found....</h4>


            {/* <div className="rankUserList topPlayer ">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <img src={topPlayerIcon} width={40} />
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList notTopPlayer ">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <img src={SecondPlayer} width={40} />
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList notTopPlayer ">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <img src={thirdPlayer} width={40} />
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList notTopPlayer ">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <p>4</p>
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList  notTopPlayer">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <p>5</p>
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList  notTopPlayer">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <p>6</p>
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList  notTopPlayer">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <p>7</p>
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList notTopPlayer ">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <p>8</p>
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div>


            <div className="rankUserList notTopPlayer ">
                <div className="rankLeftCol">
                    <div className="userPosition">
                        <p>9</p>
                    </div>
                    <div className="rankUserProfile">
                        <img src={avatar} width={40} />
                    </div>
                    <div className="rankUserInfo">
                        <div className="rankUserName">Testing</div>
                        <div className="rankUserRank">Officer</div>
                    </div>
                </div>

                <div className="rankRightCol">
                    <div className="rankCoinImg">
                        <img src={coin} width={30} />
                    </div>
                    <div className="rankCoins">
                        2000K
                    </div>
                </div>
            </div> */}






        </div>
    )
}

export default GoldLeaderboard