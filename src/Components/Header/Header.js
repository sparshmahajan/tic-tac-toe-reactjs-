import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {

  const turn = useSelector(state => state.turn);

  return (

    <header>
      <h1 className="header-title">Tic Tac Toe</h1>
      <h2 className="turn_show">{turn} turn </h2>
    </header>
  );
};

export default Header;
