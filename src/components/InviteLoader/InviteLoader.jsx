import "./InviteLoader.css"
import Spinner from 'react-bootstrap/Spinner';


const InviteLoader = () => {
    return (
        <div className="inviteLoaderDiv" >
            <Spinner className="tonSpin" style={{ width: "6rem", height: "6rem" }} animation="border" variant="light" />
        </div>
    )
}

export default InviteLoader