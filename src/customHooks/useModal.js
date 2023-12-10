import { useState } from "react";

const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const ModalStyles = {
    content: {
      width: '90%', // Set the width as desired
      maxWidth: "400px",
      margin: 'auto', // Center the modal horizontally
      border: '1px solid #ccc',
      borderRadius: '8px',      
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      left:"10px",
      right:"10px",
      minHeight:"80vh",
      padding:"0"
    },            
  };        

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return {
    modalIsOpen,
    openModal,
    closeModal,
    ModalStyles, // Merge styles
  };
};

export default useModal;
