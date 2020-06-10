import React from 'react';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import Modal from 'react-modal';

import '../Modals/styles.css';

Modal.setAppElement('#root');

interface Props {
  isOpenModalSuccess: boolean;
  isOpenModalError: boolean
}

const Modals: React.FC<Props> = ({ isOpenModalSuccess, isOpenModalError }) => {
  return (
    <>
      <Modal 
        isOpen={isOpenModalSuccess}
        className="modal"
      >
        <div className="icon-success">
          <FiCheckCircle size={90} color="#34CB79" />
          <h1>Cadastro concluído!</h1>
        </div>
      </Modal>

      <Modal
        isOpen={isOpenModalError}
        className="modal"
      >
        <div className="icon-error">
          <FiAlertTriangle size={90} color="#db2e2e" />
          <h1>Falha no Cadastro</h1>
          <h2>Por favor, preencha todos os campos corretamente!</h2>
        </div>
      </Modal>
    </>
  );
};

export default Modals;