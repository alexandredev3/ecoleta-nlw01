import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
  // ele recebe uma função.
  // void: quer dizer que ele não tem retorno
  onImageEmpty: (boolean: Boolean) => void;
  onValidationErrorMessage: (boolean: Boolean) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded, onImageEmpty, onValidationErrorMessage }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  // eu quero colocar um preview da imagem, então estou pegando a url da imagem.

  const onDrop = useCallback(acceptedFile => {
    // useCallback: e para memorizar uma função, que ele seja recriada so quando um valor de uma variavel mudar.
    // acceptedFile: ele vai pegar todas as informações do arquivo.
    const file = acceptedFile[0];
    // como so vai ser um arquivo, ele sempre vai estar na posição 0.
    
    
    try {
      const fileUrl = URL.createObjectURL(file);
      // URL: e uma variavel global no javascript.
      setSelectedFileUrl(fileUrl);
      onValidationErrorMessage(false);
      onFileUploaded(file);
    } catch {
      onImageEmpty(false);
      return onValidationErrorMessage(true);
    };

  }, [onFileUploaded, onImageEmpty, onValidationErrorMessage]);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*' // Ele vai aceita qualquer tipo de image.
    // caso o usuario tire isso do input, na lib continua, acaba envidado isso
  });

  function renderDragMessage() {
    if (!isDragActive) {
      return <p className="seccess">Selecione o Arquivo...</p>;
    };
    
    if (isDragReject) {
      return <p className="error">Arquivo não suportado..</p>;
    };
    
    onValidationErrorMessage(false);
    onImageEmpty(false);
    return <p className="drag-here">Solte o arquivo Aqui...</p>;
  };
  
  return (
    <>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept='image/*' />
        {/* se for varios arquivos e so colocar multiple no input */}
        <div className={isDragReject ? 'border-error' : 'border-success'}>
          { selectedFileUrl
            ? <img src={selectedFileUrl} alt="point thumbanail" />
            : <>
                {renderDragMessage()}
                <FiUpload 
                  className={
                    isDragReject ? 'sucess-icon-hide' : 'sucess-icon'
                  } 
                />

                <FiX 
                  className={
                    isDragReject ? 'err-icon' : 'err-icon-hide' 
                  }
                />
              </>
            // Se tiver selectedFileUrl ele vai colocar a img, se não ele vai colocar um text.
          }
        </div>
      </div>
    </>
  )
}

export default Dropzone;