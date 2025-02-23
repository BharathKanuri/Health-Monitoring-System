import SymptomForm from './SymptomForm'
import logo from '../assets/stethoscope.jpg'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App(){
  return(
    <div className="app-container">
      {/* Header with Logo and Text */}
      <div
        style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'15px',marginBottom:'30px',marginTop:'30px'}}
      >
        <img
          src={logo}
          style={{width:'100px',height:'75px',borderRadius:'10px'}}
          alt="Health Monitoring System Logo"
        />
        <h1 style={{margin:0}}>Health Monitoring System</h1>
      </div>
      <SymptomForm/>
      <ToastContainer/>
    </div>
  )
}

export default App