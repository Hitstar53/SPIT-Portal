import * as React from 'react';
import FacultyStepper from '../components/FacultyStepper';
import '../styles/Appraisal.css';
import { useContext,useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Appraisal = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    
  }
  , [user])

  return (
    <div className='appraisal-page'>
      <div className='app-title'> 
      <h1 className='ap-title'>Self-Appraisal Form for Faculty</h1>
      <FacultyStepper/>
      </div>     
    </div>
  )
};

export default Appraisal;