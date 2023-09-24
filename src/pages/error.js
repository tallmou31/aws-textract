import { Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEntities } from '../redux/error.reducer';

function ErrorPage() {
  const loading = useSelector((state) => state.error.loading);

  const errors = useSelector((state) => state.error.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntities());
  }, [dispatch]);

  const columns = useMemo(() => {
    return [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
      },
      {
        title: 'Fichier',
        dataIndex: 'fichier',
        key: 'fichier',
      },
    ];
  }, []);
  return (
    <div>
      <div className='pt-3 mb-5 flex justify-between items-center'>
        <h1 className='font-bold text-xl'>Erreurs Textract</h1>
      </div>
      <div>
        <Table
          loading={loading}
          dataSource={[...errors].sort(
            (a, b) =>
              moment(b.date, 'DD/MM/YYYY HH:mm:ss') -
              moment(a.date, 'DD/MM/YYYY HH:mm:ss')
          )}
          rowKey={(p) => p.id}
          columns={columns}
          pagination={null}
        />
      </div>
    </div>
  );
}

export default ErrorPage;
