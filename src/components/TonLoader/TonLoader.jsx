import "./TonLoader.css"
import Spinner from 'react-bootstrap/Spinner';

const TonLoader = () => {
    return (
        <div className="tonLoaderdiv">
            <Spinner className="tonSpin" style={{ width: "6rem", height: "6rem" }} animation="border" variant="light" />
        </div>
    )
}

export default TonLoader