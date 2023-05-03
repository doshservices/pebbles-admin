import { PulseLoader } from "react-spinners";
import './spinner.css'

export const CssLoader = () => {
  return (
    <div className="spinner">
      <PulseLoader color=" hsl(220, 87%, 51%)" />
    </div>
  )
};
