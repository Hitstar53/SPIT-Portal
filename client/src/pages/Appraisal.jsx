import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PDFExport } from '@progress/kendo-react-pdf';
import Content from '../data/Content';
import FacultyStepper from '../components/FacultyStepper';
import '../styles/Appraisal.css';

const Appraisal = () => {
  const pdfExportComponent = React.useRef(null);
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