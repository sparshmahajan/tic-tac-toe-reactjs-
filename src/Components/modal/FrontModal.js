import { motion } from "framer-motion";
import { useState } from "react";
import './FrontModal.css';

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modal = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },

    visible: {
        y: "00px",
        opacity: 1,
        transition: {
            delay: 0.5,
        },
    },
};

const FrontModal = ({ socket, roomCode, setRoomCode, setCh }) => {

    const [joinRoomModal, setJoinRoomModal] = useState(false);
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [roomCodeInput, setRoomCodeInput] = useState(null);

    const handleSave = () => {
        socket.emit("joinRoom", roomCode);
        setRoomCode(roomCodeInput);
    };

    const handleJoinRoom = () => {
        setCh('O');
        setJoinRoomModal(true);
    }

    const handleCreateRoom = () => {
        socket.emit("createRoom");
        setCh('X');
        setCreateRoomModal(true);
    }

    return (
        <>
            (
            <motion.div
                className="joinRoomModal-container"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {!createRoomModal && !joinRoomModal && (
                    <motion.div className="joinRoomModal-card" variants={modal}>
                        <button onClick={handleCreateRoom} className="joinRoomModal-card-button">
                            Create Room
                        </button>
                        <button onClick={handleJoinRoom} className="joinRoomModal-card-button">
                            Join Room
                        </button>
                    </motion.div>
                )}
                {createRoomModal && (
                    <motion.div className="joinRoomModal-card" variants={modal}>
                        <h1 className="joinRoomModal-card-title">{roomCode}</h1>
                        <h2 className="joinRoomModal-card-subtitle">
                            Enter this code to join your room
                        </h2>
                    </motion.div>
                )}
                {joinRoomModal && (
                    <motion.div className="joinRoomModal-card" variants={modal}>
                        <h1 className="joinRoomModal-card-title">Enter a room code</h1>
                        <input
                            className="joinRoomModal-card-input"
                            type="text"
                            placeholder="eg: 1212"
                            onChange={(e) => setRoomCodeInput(e.target.value)}
                        />
                        <button onClick={handleSave} className="joinRoomModal-card-button">
                            Save
                        </button>
                    </motion.div>
                )}
            </motion.div>
            )
        </>
    );
};

export default FrontModal;
