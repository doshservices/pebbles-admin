import { TailSpin } from "react-loader-spinner";
import "./spinner.css";
export const Spinner = () => {
  return (
    <div className="tail-spin">
      <TailSpin
        height="40"
        width="40"
        color="#7367f0"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
