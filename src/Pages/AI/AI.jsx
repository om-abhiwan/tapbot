import "./AI.css"
import Plus from "../../assets/AI/plus.svg"
import hamster from "../../assets/AI/hamster.svg"
import { useState } from "react"


const AI = () => {

  const [option, setOption] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };


  const handleOption = (opt) => {
    setOption(opt)
  }

  return (
    <div className="commingSoon text-light text-center">
      <div className="uploadScreen my-4">
        <div className="uploadFile" onClick={handleClick} style={{ cursor: 'pointer' }}>
          {selectedFile ? (
            <div className="uploadedFile">
              <img src={URL.createObjectURL(selectedFile)} className="uploadedImage" alt="Uploaded" width={100} />
            </div>
          ) : (
            <div className="uploadPlus">
              <img src={Plus} alt="plus" width={20} />
              SCREEN SHORT
            </div>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <div className="uploadBtn my-4">
          <button className="btn" onClick={handleClick}>
            UPLOAD
          </button>
        </div>
      </div>

      {/* option */}
      <div className="AIOptionDiv">
        <div className={`AIoptionDivMenu ${option === 0 ? 'activeAIOption' : "inActiveAIOption"} `} onClick={() => { handleOption(0) }} >
          <p>Pending</p>
        </div>
        <div className={`AIoptionDivMenu ${option === 1 ? 'activeAIOption' : "inActiveAIOption"} `} onClick={() => { handleOption(1) }} >
          <p>Complete</p>
        </div>
        <div className={`AIoptionDivMenu ${option === 2 ? 'activeAIOption' : "inActiveAIOption"} `} onClick={() => { handleOption(2) }} >
          <p>Failed</p>
        </div>
      </div>


      <div className="uploadResultDiv" >
        <div className="uploadResultDivHeader">
          <div></div>
          <div>Name</div>
          <div>Points</div>
        </div>
        <div className={`uploadResultList`}>
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
        <div className="uploadResultList">
          <div className="">
            <img src={hamster} width={40} />
          </div>
          <div className="" >
            Hamster Kombat
          </div>
          <div className={`successAi${option}`} >
            +2000
          </div>
        </div>
      </div>


    </div>
  )
}

export default AI