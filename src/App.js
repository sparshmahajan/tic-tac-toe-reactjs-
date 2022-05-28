import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import FrontModal from "./Components/modal/FrontModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTurn } from "./Components/store/turnSlice";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [showModal, setShowModal] = useState(true);
  const [roomCode, setRoomCode] = useState(null);
  const [canPlay, setCanPlay] = useState(false);
  const [ch, setCh] = useState(null);

  const dispatch = useDispatch();
  const isGameActive = useSelector(state => state.isGameActive);

  useEffect(() => {
    socket.on('firstPlayerJoin', (roomCode) => {
      setRoomCode(roomCode);
      setCanPlay(true);
      dispatch(changeTurn());
    })

    socket.on('secondPlayerJoin', () => {
      setShowModal(false);
    });

  }, [dispatch, setRoomCode, setCanPlay, setShowModal]);

  return (
    <>
      {isGameActive &&
        <>
          {showModal && <FrontModal socket={socket} roomCode={roomCode} setRoomCode={setRoomCode} setShowModal={setShowModal} setCh={setCh} />}
          <Header />
        </>
      }
      <Main socket={socket} roomCode={roomCode} ch={ch} canPlay={canPlay} setCanPlay={setCanPlay} />
    </>
  );
}

export default App;
