import { useRef, useState } from 'react';
import './table.css'
import options from "./assets/options.svg";
import useOnClickOutside from '../../utils/useOnClickOutside';
import { Link } from 'react-router-dom';

const ApartmentTableRow = () => {
  const optionsRef = useRef();
  const [option, setOption] = useState(false)
  const [status, setStatus] = useState("Active");

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
            Self Con
          </div>
          <div><span className={status === 'Active' ? 'verified' : 'pending'}>{status}</span></div>
          <div className="options" ref={optionsRef}>
            <img src={options} alt="options" onClick={handleOptions} />
            {option && <div className='option-details'>
              <span><Link to="/user-details">View Details</Link></span>
              <span>Edit</span>
              <span>Suspend</span>
              <span>Delete</span>
            </div>}
          </div>
        </div>
        <div className="table-row-mb"></div>
      </>
  )
}
export default ApartmentTableRow;