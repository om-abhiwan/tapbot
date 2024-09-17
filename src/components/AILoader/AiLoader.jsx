import "./AiLoader.css"
import aiImg from "../../assets/AI/loader.svg"
import { useNavigate } from "react-router-dom"

const AiLoader = ({ setAiLoader }) => {

    const navigate = useNavigate()

    return (
        <div className="aiLoader my-4 ">
            <div className="aiLaoderHead my-3 ">
                <h1>What’s new</h1>
            </div>
            <div className="aiLoaderImg">
                <img src={aiImg} />
            </div>
            <div className="aiLaoderHead aiFeature">
                <h1>AI Feature</h1>
            </div>

            <div className="aiList m-2">
                <ul>
                    <li>AI Feature 1AI Feature 1AI Feature 1</li>
                    <li>AI Feature 2AI Feature 2AI Feature 2</li>
                    <li>AI Feature 3AI Feature 3AI Feature 3</li>
                    <li>AI Feature 4AI Feature 4AI Feature 4</li>
                </ul>
            </div>


            <div className="aiLoaderbtn">
                <button className="btn" onClick={() => {
                    setAiLoader(false)
                    navigate("/ai")
                }} >Start</button>
            </div>

        </div>
    )
}

export default AiLoader