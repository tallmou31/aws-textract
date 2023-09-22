import React, { useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Modal, Spin, Upload } from 'antd';

const { Dragger } = Upload;

function Uploader({ setOpen, upload }) {
  const [loader, setLoader] = useState(false);

  const [file, setFile] = useState(null);
  const onSubmit = () => {
    setLoader(true);
    upload(file)
      .then((res) => {
        Modal.success({
          content: 'Pièce chargée avec succès',
        });
        setOpen(false, true);
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          content: 'Erreur chargement',
        });
      })
      .finally(() => setLoader(false));
  };

  const props = {
    name: 'file',
    //accept: ".csv",
    maxCount: 1,
    beforeUpload: () => {
      return false;
    },

    onChange(info) {
      const { status } = info.file;
      if (status === 'removed') {
        setFile(null);
      }
      if (!status) {
        setFile(info.file);
      }
    },
    onDrop(e) {},
  };

  return (
    <div>
      <Form name='control-ref' onFinish={onSubmit} layout={'vertical'}>
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>
            Cliquer pour choisir un fichier ou glissez-en
          </p>
          <p className='ant-upload-hint'>
            Fichier PNG, JPEG, JPG ou PDF est requis
          </p>
        </Dragger>
        <div className='flex justify-center items-center gap-5 mt-5'>
          <button
            type='submit'
            className='btn btn_primary uppercase button-orange'
            disabled={loader || !file}
          >
            <Spin spinning={loader} />
            <UploadOutlined
              style={{ marginRight: '10px', fontWeight: 'bold' }}
            />
            Importer
          </button>
          <button
            type='button'
            className='btn btn_primary uppercase white-button'
            onClick={() => {
              setOpen(false);
            }}
          >
            Annuler
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Uploader;
