import { useEffect, useState } from "react";
import "./Loadder.css"
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";
import char from "../../assets/Char/newbies.svg"
const Loader = () => {
    // const style = { background: "linear-gradient(180deg, #D5C10D - 560.6 %, #F09000 - 460.6 %)!important" };

    const StyledProgressBar = styled(ProgressBar)`
  .progress-bar {
    background: linear-gradient(180deg, #D5C10D -560.6%, #F09000 -460.6%) !important;
    transition: background 0.5s ease-in-out;
  }


`;



    const [LoaderPerc, setLoaderPer] = useState(0);

    useEffect(() => {
        let intervalId = setInterval(() => {
            setLoaderPer((prevPerc) => prevPerc + 1);
            if (LoaderPerc >= 100) {
                clearInterval(intervalId);
            }
        }, 10); // update every 10ms
        return () => clearInterval(intervalId); // clean up
    }, []);

    return (
        <div className="loaderMainDiv">

            <div className="loaderProgress">
                <img src={char} alt="char" />
                <StyledProgressBar variant="warning" now={LoaderPerc} />
            </div>
        </div>
    );
};

export default Loader;