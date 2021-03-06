import React from 'react';

import Tag from '@components/Tag';
import Tooltip from '@components/Tooltip';
import Button from '@components/Button';
import Icon from '@components/Icon';

export default [
  {
    title: 'Tipo',
    dataIndex: 'type'
  },
  {
    title: 'Ordem',
    dataIndex: 'order'
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    width: 350
  },
  {
    title: 'Rótulo',
    dataIndex: 'initials'
  },
  {
    title: 'Mínimo',
    dataIndex: 'min'
  },
  {
    title: 'Máximo',
    dataIndex: 'max'
  },
  {
    title: 'Referência',
    dataIndex: 'ref'
  },
  {
    title: 'Situação',
    render: (entry, record) => (
      <Tag color={record.active ? 'green' : null}>{record.active ? 'Ativo' : 'Inativo'}</Tag>
    )
  },
  {
    title: 'Ações',
    key: 'operations',
    width: 70,
    align: 'center',
    render: (text, record) => {
      return (
        <Tooltip title={'Alterar exame'}>
          <Button type="primary gtm-bt-view-exam" onClick={() => record.showModal(record)}>
            <Icon type="edit" />
          </Button>
        </Tooltip>
      );
    }
  }
];
