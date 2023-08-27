import { useState } from 'react';
import './table.css'
import options from "./assets/options.svg";

const ApartmentTableHead = () => {
  const [option, setOption] = useState({})
  const [isVerified, setIsVerified] = useState(true);
  return (
      <>
        <div>
          <input type="checkbox"  />
        </div>
        <div>
          Listing ID 
          <span>
            <svg width="22" height="30" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 8.25013L15.5833 12.8105H6.41667L11 8.25013Z" fill="#F8F8F8"/>
              <path d="M11 21.7499L15.5833 17.1895H6.41667L11 21.7499Z" fill="#F8F8F8"/>
            </svg>
          </span>
        </div>
        <div>
          Join Date
          <span>
            <svg width="22" height="30" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 8.25013L15.5833 12.8105H6.41667L11 8.25013Z" fill="#F8F8F8"/>
              <path d="M11 21.7499L15.5833 17.1895H6.41667L11 21.7499Z" fill="#F8F8F8"/>
            </svg>
          </span>
        </div>
        <div>
          Listing Name
          <span>
            <svg width="22" height="30" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 8.25013L15.5833 12.8105H6.41667L11 8.25013Z" fill="#F8F8F8"/>
              <path d="M11 21.7499L15.5833 17.1895H6.41667L11 21.7499Z" fill="#F8F8F8"/>
            </svg>
          </span>
        </div>
        <div>
          Address
          <span>
            <svg width="22" height="30" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 8.25013L15.5833 12.8105H6.41667L11 8.25013Z" fill="#F8F8F8"/>
              <path d="M11 21.7499L15.5833 17.1895H6.41667L11 21.7499Z" fill="#F8F8F8"/>
            </svg>
          </span>
        </div>
        <div>
          Listing Type
          <span>
            <svg width="22" height="30" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 8.25013L15.5833 12.8105H6.41667L11 8.25013Z" fill="#F8F8F8"/>
              <path d="M11 21.7499L15.5833 17.1895H6.41667L11 21.7499Z" fill="#F8F8F8"/>
            </svg>
          </span>
        </div>
        <div>
          Status
          <span>
            <svg width="22" height="30" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 8.25013L15.5833 12.8105H6.41667L11 8.25013Z" fill="#F8F8F8"/>
              <path d="M11 21.7499L15.5833 17.1895H6.41667L11 21.7499Z" fill="#F8F8F8"/>
            </svg>
          </span>
        </div>
        <div>

        </div>
      </>
  )
}
export default ApartmentTableHead;