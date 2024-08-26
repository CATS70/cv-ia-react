import React, { useState } from 'react';
import '../styles/styles.css';
import Modal from './Modal';
import CV from './Cv';
import Chatbot from './Chatbot';

// Importez les images
import interviewImage from '../images/interview-8270514.svg';
import photoCvImage from '../images/photocv.jpg';
import neuralNetworkImage from '../images/neural-network-3816319.svg';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <h1>Bienvenue sur mon CV Interactif</h1>
      <p>Découvrez mon parcours et discutez avec un chatbot IA pour en savoir plus sur mes compétences.</p>
      <button onClick={openModal} className="btn">Voir le CV et le Chatbot</button>
      <div className="ai-images">
        <img src={interviewImage} alt="Interview" className="ai-image"/>
        <img src={photoCvImage} alt="Portrait de Christophe FELIX" className="ai-image"/>
        <img src={neuralNetworkImage} alt="Neural Network" className="ai-image"/>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CV />
          <Chatbot />
        </Modal>
      )}
    </div>
  );
};

export default Home;