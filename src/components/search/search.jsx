import "./search.css";
import searchicon from "./search.svg";

export const Search = (props) => {
  return (
    <div className="search">
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        aria-autocomplete="off"
      />
      <img src={searchicon} alt="search" />
    </div>
  );
};
