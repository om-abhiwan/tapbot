import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import crossBtn from "../../assets/botttombar/crossBtn.svg"
import { useContext } from 'react';
import { UserInfo } from '../../ContextApi/UserData';
import copyBtn from "../../assets/copy.png"
import toast from 'react-hot-toast';

const ProfilePopup = ({ show, setShow }) => {

    const { userInfo } = useContext(UserInfo)

    // const [isData, setIsData] = useState(false)





    const handleCopy = () => {
        navigator.clipboard.writeText(userInfo.user_id).then(() => {
            toast.success("Copied")
        }).catch(() => {
            toast.error("Try Again!!")
        });
    }

    return (
        <Modal className='modalBasicTheme' show={show} centered>
            <Modal.Header>
                <Modal.Title >Profile Details </Modal.Title>
                <img src={crossBtn} width={30} onClick={() => { setShow(false) }} />
            </Modal.Header>
            <Modal.Body className='text-light text-center mb-3'>


                <Row>
                    <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>User Name</p>
                            <p className='timeValue'>{userInfo.name}</p>
                        </div>
                    </Col>
                    <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>User I&apos;D</p>
                            <p className='copyValue'>{userInfo.user_id}<img className='copyBtn' src={copyBtn} width={40} onClick={handleCopy} /></p>
                        </div>
                    </Col>
                    <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>Total Point</p>
                            <p className='timeValue'>{userInfo.allCoins}</p>
                        </div>
                    </Col>
                    <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>Telegram Score</p>
                            <p className='timeValue'>5</p>
                        </div>
                    </Col>
                    <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>Account Status</p>
                            <p className='timeValue'>Premium</p>
                        </div>
                    </Col>
                    <Col xs={6} className='my-3'>
                        <div className='timeDetails'>
                            <p>Ton Earned</p>
                            <p className='timeValue'>{userInfo.ton_coins}</p>
                        </div>
                    </Col>
                </Row>



            </Modal.Body>
        </Modal>
    )
}

export default ProfilePopup