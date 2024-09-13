import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import crossBtn from "../../assets/botttombar/crossBtn.svg"
import { useContext, useEffect, useState } from 'react';
import { UserInfo } from '../../ContextApi/UserData';

const TimePopup = ({ show, setShow }) => {

    const { userInfo } = useContext(UserInfo)
    const [isData, setIsData] = useState(false)
    // Declare calculateRemainingTime before using it
    const calculateRemainingTime = (endTime) => {
        const now = new Date();
        const distance = new Date(endTime) - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            total: distance,
            hours,
            minutes,
            seconds
        };
    };

    // Initialize state after the function declaration
    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(userInfo.boostEnd));


    const handleClose = () => {
        setShow(false);
    };


    useEffect(() => {
        let endTime = new Date(userInfo.boostEnd)
        let now = new Date()
        if (now < endTime) {
            setIsData(true)
        } else {
            setIsData(false)
        }
    }, [])


    useEffect(() => {
        const timerId = setInterval(() => {
            const timeLeft = calculateRemainingTime(userInfo.boostEnd);
            setRemainingTime(timeLeft);

            if (timeLeft.total <= 0) {
                clearInterval(timerId);
            }
        }, 1000);

        return () => clearInterval(timerId); // Clean up the interval on component unmount
    }, [userInfo.boostEnd]);


    const formatTime = (time) => (time < 10 ? `0${time}` : time);


    return (
        <Modal className='modalBasicTheme' show={show} centered onHide={handleClose}>
            <Modal.Header>
                <Modal.Title >Active Details </Modal.Title>
                <img src={crossBtn} width={30} onClick={handleClose} />
            </Modal.Header>
            <Modal.Body className='text-light text-center mb-3'>

                {
                    isData ?
                        <Row>
                            {/* <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>Start Time</p>
                            <p className='timeValue'>120</p>
                        </div>
                    </Col>
                    <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>End Time</p>
                            <p className='timeValue'>120</p>
                        </div>
                    </Col> */}
                            <Col xs={6} className='my-3'>
                                <div className='timeDetails'>
                                    <p>Pending Time</p>
                                    <p className='timeValue'>
                                        {remainingTime.hours}:{formatTime(remainingTime.minutes)}:{formatTime(remainingTime.seconds)}
                                    </p>
                                </div>
                            </Col>
                            <Col xs={6} className='my-3'>
                                <div className='timeDetails'>
                                    <p>Coins Mined</p>
                                    <p className='timeValue'>{userInfo.count}</p>
                                </div>
                            </Col>
                        </Row>
                        : <p className='dataNotAvaial' >No Data Available</p>
                }

            </Modal.Body>
        </Modal>
    )
}

export default TimePopup