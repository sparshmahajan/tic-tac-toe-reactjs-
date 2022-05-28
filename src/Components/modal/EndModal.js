import { motion } from "framer-motion";
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

const EndModal = ({ win, handleRestart }) => {

    return (
        <motion.div
            className="joinRoomModal-container"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {win !== 'Waiting for opponent...' &&
                <motion.div className="joinRoomModal-card" variants={modal}>
                    <h1 className="joinRoomModal-card-title">{win}</h1>
                    <button className="joinRoomModal-card-button" onClick={handleRestart}>
                        New Game
                    </button>
                </motion.div>
            }
            {
                win === 'Waiting for opponent...' &&
                <motion.div className="joinRoomModal-card" variants={modal}>
                    <h1 className="joinRoomModal-card-title">{win}</h1>
                </motion.div>
            }
        </motion.div>
    );
};

export default EndModal;
