import { useState, useRef } from 'react';
import './table.css'
import options from "./assets/options.svg";
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../utils/useOnClickOutside';

const TableRow = () => {
  const optionsRef = useRef();
  const [option, setOption] = useState(false)
  const [isVerified, setIsVerified] = useState(true);
  const handleOptions = () => {
    setOption(!option)
  }
  useOnClickOutside(optionsRef, ()=> {setOption(false)})

  return (
      <>
        <div className="table-row">
          <div>
            <input type="checkbox"  />
          </div>
          <div>
            #0123450
          </div>
          <div>
            10 March 2023, 08:23 AM
          </div>
          <div>
            Shai Hulud Fred
          </div>
          <div>
            2 Shai Hulud Street, Shazam
          </div>
          <div>
            Host (Basic)
          </div>
          <div><span className={isVerified === true ? 'verified' : 'pending'}>{isVerified === true ? 'Verified' : 'Pending'}</span></div>
          <div className="options" ref={optionsRef}>
            <img src={options} alt="options" onClick={handleOptions} />
            {option && <div className='option-details'>
              <span><Link to="/user-details">View Details</Link></span>
              <span>Verify</span>
              <span>Suspend</span>
              <span>Delete</span>
            </div>}
          </div>
        </div>
        <div className="table-row-mb"></div>
      </>
  )
}
export default TableRow;