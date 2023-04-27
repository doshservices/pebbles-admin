import "./search.css";
import searchicon from "./search.svg";

export const Search = (props) => {
  return (
    <div style={{ padding: "0 1rem" }}>
      <form className="search">
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          onChange={props.onChange}
        />
        <img src={searchicon} alt="search" />
      </form>
    </div>
  );
};
