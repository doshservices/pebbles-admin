import { useState } from 'react';
import './table.css'
import options from "./assets/options.svg";

const ApartmentTableRow = () => {
  const [option, setOption] = useState(false)
  const [status, setStatus] = useState("Active");
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
            Self Con
          </div>
          <div><span className={status === 'Active' ? 'verified' : 'pending'}>{status}</span></div>
          <div className="options">
            <img src={options} alt="options" />
            {option && <div className='option-details'>
              <span>View Details</span>
              <span>Active</span>
              <span>Pending</span>
              <span>Suspend</span>
            </div>}
          </div>
        </div>
        <div className="table-row-mb"></div>
      </>
  )
}
export default ApartmentTableRow;