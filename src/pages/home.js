import { Modal, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEntities } from '../redux/piece.reducer';
import Uploader from '../components/Uploader';
import PieceService from '../services/piece.service';
import { UploadOutlined } from '@ant-design/icons';
const getTitle = (val) => {
  return (
    val
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
};

function HomePage() {
  const loading = useSelector((state) => state.piece.loading);

  const pieces = useSelector((state) => state.piece.entities);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntities());
  }, [dispatch]);

  const setModalUploadOpen = (val, changed = false) => {
    setUploadModalOpen(val);
    if (changed) {
      dispatch(getEntities());
    }
  };

  const columns = useMemo(() => {
    return [
      {
        title: 'Type Piece',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Prénom',
        dataIndex: 'prenom',
        key: 'prenom',
      },
      {
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
      },
      {
        title: 'Numéro Piece',
        dataIndex: 'numeroPiece',
        key: 'numeroPiece',
      },
      {
        title: 'Date Naissance',
        dataIndex: 'dateNaissance',
        key: 'dateNaissance',
      },
      {
        title: 'Lieu Naissance',
        dataIndex: 'lieuNaissance',
        key: 'lieuNaissance',
      },
      {
        title: 'Sexe',
        dataIndex: 'sexe',
        key: 'sexe',
      },
      Table.EXPAND_COLUMN,
    ];
  }, []);
  return (
    <div>
      <div className='pt-3 mb-5 flex justify-between items-center'>
        <h1 className='font-bold text-xl'>Pièces d'identité</h1>
        <div className='flex-1 flex justify-end gap-3'>
          <button
            className='button-orange uppercase'
            onClick={() => setUploadModalOpen(true)}
          >
            <UploadOutlined
              style={{ marginRight: '10px', fontWeight: 'bold' }}
            />
            Charger Pièce
          </button>
        </div>
      </div>
      <div>
        <Table
          loading={loading}
          dataSource={pieces}
          rowKey={(p) => p.id}
          columns={columns}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }} className='flex flex-col'>
                {Object.entries(record)
                  .filter(
                    ([key, _]) =>
                      ![
                        'nom',
                        'prenom',
                        'type',
                        'numeroPiece',
                        'dateNaissance',
                        'sexe',
                      ].includes(key)
                  )
                  .map(([key, val]) => (
                    <span>
                      <span className='font-bold'>{getTitle(key)}</span> :{' '}
                      <span>{val}</span>
                    </span>
                  ))}
              </p>
            ),
          }}
        />
      </div>

      <Modal
        destroyOnClose={true}
        open={uploadModalOpen}
        title='Chargement Pièce'
        onCancel={() => setUploadModalOpen(false)}
        footer={null}
        centered
      >
        <Uploader
          setOpen={setModalUploadOpen}
          upload={PieceService.uploadFile}
        />
      </Modal>
    </div>
  );
}

export default HomePage;
