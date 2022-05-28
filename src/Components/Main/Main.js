import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cell from "../Cell/Cell";
import EndModal from "../modal/EndModal";
import { changeTurn, changeIsGameActive } from "../store/turnSlice";
import "./Main.css";

const Main = ({ socket, roomCode, ch, canPlay, setCanPlay }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [win, setWin] = useState(null);

  const dispatch = useDispatch();
  const isGameActive = useSelector(state => state.isGameActive);

  useEffect(() => {
    socket.on("updateGame", (id, ch) => {
      setBoard((data) => ({ ...data, [id]: ch }));
      setCanPlay(true);
      dispatch(changeTurn());
    });

    const checkWinner = () => {
      const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let index = 0; index < wins.length; index++) {
        const element = wins[index];
        if ((board[element[0]] === board[element[1]]) && (board[element[1]] === board[element[2]]) && (board[element[0]] !== "")) {
          dispatch(changeIsGameActive(false));
          if (board[element[0]] === ch) {
            setWin('You win!');
            return;
          }
          else {
            setWin('You lose!');
            return;
          }
        }
      }
      if (board[0] !== "" && board[1] !== "" && board[2] !== "" && board[3] !== "" && board[4] !== "" && board[5] !== "" && board[6] !== "" && board[7] !== "" && board[8] !== "") {
        dispatch(changeIsGameActive(false));
        setWin('Draw!');
        return;
      }
    };
    checkWinner();

    return () => socket.off("updateGame");

  }, [ch, socket, dispatch, board, setCanPlay]);

  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
    if (isGameActive && canPlay && board[id] === "") {
      setBoard((data) => ({ ...data, [id]: ch }));
      socket.emit("play", { id, roomCode, ch });
      setCanPlay(false);
      dispatch(changeTurn());
    }
  };

  const handleRestart = () => {
    if (win === 'You win!' || win === 'You lose!' || win === 'Draw!') {
      setWin('Waiting for opponent...');
      socket.emit('newGame', roomCode);
    } else if (win === 'Opponent asking for new game...') {
      setWin(null);
      dispatch(changeIsGameActive(true));
      setBoard(["", "", "", "", "", "", "", "", ""]);
      socket.emit('secondPlayerNewGame', roomCode);
    }
  }

  useEffect(() => {
    socket.on('newGame', () => {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setWin('Opponent asking for new game...');
    });

    socket.on('secondPlayerNewGame', () => {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setWin(null);
      dispatch(changeIsGameActive(true));
    });

  }, [socket, roomCode, dispatch, setBoard, win]);

  return (
    <main>
      {(!isGameActive || win) && <EndModal win={win} handleRestart={handleRestart} />}
      {
        isGameActive && (
          <section className="main-section">
            <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
            <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
            <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />

            <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
            <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
            <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />

            <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
            <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
            <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
          </section>
        )
      }
    </main>
  );
};

export default Main;
