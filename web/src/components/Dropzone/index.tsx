import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
  // ele recebe uma função.
  // void: quer dizer que ele não tem retorno
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  // eu quero colocar um preview da imagem, então estou pegando a url da imagem.

  const onDrop = useCallback(acceptedFile => {
    // useCallback: e para memorizar uma função, que ele seja recriada so quando um valor de uma variavel mudar.
    // acceptedFile: ele vai pegar todas as informações do arquivo.
    const file = acceptedFile[0];
    // como so vai ser um arquivo, ele sempre vai estar na posição 0.
    
    const fileUrl = URL.createObjectURL(file);
    // URL: e uma variavel global no javascript.

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*' // Ele vai aceita qualquer tipo de image.
    // caso o usuario tire isso do input, na lib continua, acaba envidado isso
  });
  
  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
      {/* se for varios arquivos e so colocar multiple no input */}
      <div className="border">
      <FiUpload className="icon" />
        { selectedFileUrl
          ? <img src={selectedFileUrl} alt="point thumbanail" />
          : (
            isDragActive 
              ? <p className="drag-here">Arraste Aqui...</p>
              : <p>Selecione a Imagem...</p>
          )
          // Se tiver selectedFileUrl ele vai colocar a img, se não ele vai colocar um text.
        }
      </div>
    </div>
  )
}

export default Dropzone;