import "./NoLimit.css"

const NoLimit = ({ setNoLimit, setHireAntStatus, text, setAccess, id }) => {
    const handleClose = () => {

        if (id === 1) {
            setNoLimit(false)
        } else if (id === 6) {
            setHireAntStatus(false)
        } else {
            setAccess(false)
        }

    }
    return (
        <div className="NoLimitDiv">
            <div className="NoLimithead">
                {text}
            </div>

            <div className="NoLimitBtn">
                <button className="btn" onClick={handleClose} >Close</button>
            </div>

        </div>
    )
}

export default NoLimit