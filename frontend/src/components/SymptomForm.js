import Select from 'react-select'
import axios from 'axios'
import {useState} from 'react'
import {toast} from 'react-toastify'
import {FaCheckCircle,FaInfoCircle,FaShieldAlt,FaUtensils,FaPills,FaUserMd,FaDownload} from 'react-icons/fa'
import {symptomOptions} from './data/symptomOptions'
import {downloadPrescription} from './downloadPrescription'
import 'react-toastify/dist/ReactToastify.css'

const SymptomForm=()=>{
  const [selectedSymptoms,setSelectedSymptoms]=useState([])
  const [details,setDetails]=useState(null)
  const [error,setError]=useState('')
  const notify=(message,type='success')=>{
    toast[type](message,{
      position:'top-right',
      autoClose:5000,
      hideProgressBar:false,
      closeOnClick:true,
      pauseOnHover:true,
      draggable:true,
      progress:undefined,
      style:{width:'350px'}
    })
  }
  const handleSymptomChange=(selectedOptions)=>{
    const symptomNames=selectedOptions.map((option)=>option.value)
    setSelectedSymptoms(symptomNames)
    setError('')
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(selectedSymptoms.length<2){
      setError('* Please Select at least 2 Symptoms')
      setDetails(null)
      notify('Please Select at least 2 Symptoms','error')
      return
    }
    try{
      const response=await axios.post('http://localhost:5000/predict',{symptoms:selectedSymptoms})
      if(response.data.message==='The Confidence Score of our Model is too low to Provide Prediction'){
        setDetails(response.data)
        notify(response.data.message,'info')
      }
      else if(response.status===200){
        setDetails(response.data)
        notify('Prediction Successful','success')
      }
      else{
        notify('Error: Unable to get Prediction. Please try again later...','error')
      }
    } 
    catch(error){
      if(error.response){
        notify('Error: '+error.response.data.message,'error')
      }
      else if (error.request){
        notify('Network Error: Unable to Connect to the Backend...','warning')
      } 
      else{
        notify('Oops!!! Something went wrong. Please try again...','error')
      }
    }
  }
  const customStyles={
    multiValue:(provided)=>({
      ...provided,
      backgroundColor:'#e3f2fd',
      padding:'6px'
    }),
    multiValueLabel:(provided)=>({
      ...provided,
      color:'#1565c0',
      fontSize:'16px'
    }),
    multiValueRemove:(provided)=>({
      ...provided,
      color:'#666666',
      ':hover':{
        backgroundColor:'#d32f2f',
        color:'#ffffff'
      }
    })
  }

  return(
    <>
      <form onSubmit={handleSubmit} className="form-container" style={{position:'relative'}}>
        <h2>Select Symptoms</h2>
        <Select
          isMulti
          options={symptomOptions}
          value={selectedSymptoms.map((symptom)=>({label:symptom,value:symptom}))}
          onChange={handleSymptomChange}
          placeholder="search for cold, nausea,..."
          className="select-input"
          styles={customStyles}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          <FaCheckCircle/>&nbsp;Submit
        </button>
        {/* Brand Text */}
        <p
          style={{
            position:'absolute',
            bottom:'10px',
            right:'10px',
            fontSize:'14px',
            color:'#666',
            fontStyle:'italic',
          }}
        >
          Medico - An ML Based Health Assistant
        </p>
      </form>
      {
        details && (
          <div className="details-container">
            <h3>Prediction Result: {details.prediction}</h3>
            <div className="confidence-score">
              <h4>Confidence Score</h4>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{width: `${details.confidence_score*100}%`}}
                >
                  <span className="progress-bar-text">
                    {(details.confidence_score*100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
            {
              details.confidence_score >= 0.5 && (
                <>
                  {
                    [
                      {title:'Description',content:details.description,icon:<FaInfoCircle size={23}/>},
                      {title:'Precautions',content:details.precautions,icon:<FaShieldAlt size={23}/>},
                      {title:'Diet',content:details.diet,icon:<FaUtensils size={23}/>},
                      {title:'Medications',content:details.medications,icon:<FaPills size={23}/>},
                      {title:'Consult',content:details.consult,icon:<FaUserMd size={23}/>}
                    ].map(({title,content,icon},index)=>(
                      <div key={index} className="details-section">
                        <h4 style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'18px'}}>
                          <span style={{display:'flex',alignItems:'center',marginTop:'-2.5px'}}>
                            {icon}
                          </span>
                          {title}
                        </h4>
                        {
                          Array.isArray(content) ? 
                          (
                            <ul>
                              {
                                content.map((item,idx)=>(
                                  <li key={idx}>{item}</li>
                                ))
                              }
                            </ul>
                          ) 
                            : 
                          (
                            <p>{content}</p>
                          )
                        }
                      </div>
                    ))
                  }
                  {/* Download Prescription Button */}
                  <button onClick={()=>downloadPrescription(details,selectedSymptoms)} className="download-button">
                    <FaDownload/>&nbsp;Download Prescription
                  </button>
                </>
              )
            }
          </div>
        )
      }
    </>
  )
}

export default SymptomForm