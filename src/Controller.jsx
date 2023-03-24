import React, {useState} from 'react';
import App from "./App";
import Modal from "./Modal"


export default function Controller() {
    const [show, setShow] = useState(false);

    const [selectedGame, setSelectedGame] = useState(null);

    const handleClose = () => setShow(false);
    const handleOpen = (game) => {
      setSelectedGame(game);
      setShow(true);
    };

  return (
    <>
        <App onOpen={handleOpen} />
        <Modal show={show} onClose={handleClose} selectedGame={selectedGame} />
    </>
  )
}
