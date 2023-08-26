import { useState } from 'react';
import './table.css'
import options from "./assets/options.svg";

const TableRow = () => {
  const [option, setOption] = useState(false)
  const [isVerified, setIsVerified] = useState(true);
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
          <div className="options">
            <img src={options} alt="options" />
            {option && <div className='option-details'>
              <span>View Details</span>
              <span>Suspend</span>
              <span>Verify</span>
              <span>Delete</span>
            </div>}
          </div>
        </div>
        <div className="table-row-mb"></div>
      </>
  )
}
export default TableRow;