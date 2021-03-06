import React from 'react';
import styled from 'styled-components/macro';
import { format } from 'date-fns';

import Icon from '@components/Icon';
import Button from '@components/Button';
import Descriptions from '@components/Descriptions';
import Tag from '@components/Tag';
import Menu from '@components/Menu';
import Dropdown from '@components/Dropdown';
import Tooltip from '@components/Tooltip';
import RichTextView from '@components/RichTextView';
import isEmpty from 'lodash.isempty';

const NestedTableContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 35px;

  .ant-descriptions-item-label {
    font-weight: 600;
    color: #2e3c5a;
  }
`;

const TableLink = styled.a`
  color: rgba(0, 0, 0, 0.65);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const menu = (id, saveInterventionStatus, onShowModal) => (
  <Menu>
    <Menu.Item
      onClick={() => saveInterventionStatus(id, 'a')}
      className={onShowModal ? 'gtm-btn-menu-interv-accept' : 'gtm-btn-tab-interv-accept'}
    >
      Aceita
    </Menu.Item>
    <Menu.Item
      onClick={() => saveInterventionStatus(id, 'n')}
      className={onShowModal ? 'gtm-btn-menu-interv-not-accept' : 'gtm-btn-tab-interv-not-accept'}
    >
      Não aceita
    </Menu.Item>
    <Menu.Item
      onClick={() => saveInterventionStatus(id, 'x')}
      className={onShowModal ? 'gtm-btn-menu-interv-not-apply' : 'gtm-btn-tab-interv-not-apply'}
    >
      Não se aplica
    </Menu.Item>
  </Menu>
);

export const PrescriptionInline = ({ dose, measureUnit, frequency, route, time }) => (
  <>
    {dose}
    {measureUnit.label} x {frequency.label} {route} ({time})
  </>
);

export const InterventionView = ({ intervention, showReasons, showDate, status }) => (
  <Descriptions bordered>
    {status}
    <Descriptions.Item label="Prescrição:" span={3}>
      <PrescriptionInline {...intervention} />
    </Descriptions.Item>
    {showDate && (
      <Descriptions.Item label="Data" span={3}>
        {format(new Date(intervention.date), 'dd/MM/yyyy HH:mm')}
      </Descriptions.Item>
    )}
    <Descriptions.Item label="Possível erro de prescrição:" span={3}>
      {intervention.error ? 'Sim' : 'Não'}
    </Descriptions.Item>
    <Descriptions.Item label="Gera redução de custo:" span={3}>
      {intervention.cost ? 'Sim' : 'Não'}
    </Descriptions.Item>
    {showReasons && (
      <Descriptions.Item label="Motivos:" span={3}>
        {intervention.reasonDescription}
      </Descriptions.Item>
    )}

    <Descriptions.Item
      label={
        <Tooltip title="Lista de medicamentos com Interações, Incompatibilidades ou Duplicidade">
          Relações:
        </Tooltip>
      }
      span={3}
    >
      {!isEmpty(intervention.interactionsList) &&
        intervention.interactionsList.map(item => item.name).join(', ')}
    </Descriptions.Item>
    <Descriptions.Item label="Observação:" span={3}>
      <RichTextView text={intervention.observation} />
    </Descriptions.Item>
  </Descriptions>
);

export const expandedInterventionRowRender = record => {
  return (
    <NestedTableContainer>
      <InterventionView intervention={record} />
    </NestedTableContainer>
  );
};

const Action = ({ check, id, saveInterventionStatus, onShowModal, admissionNumber, ...data }) => {
  const isDisabled = check.currentId !== id && check.isChecking;
  const isChecking = check.currentId === id && check.isChecking;
  const isChecked = data.status !== 's';
  const closedStatuses = ['a', 'n', 'x'];
  const isClosed = closedStatuses.indexOf(data.status) !== -1;

  return (
    <>
      {isChecked && (
        <Tooltip title="Desfazer situação" placement="left">
          <Button
            type={
              onShowModal
                ? 'danger gtm-bt-menu-undo-interv-status'
                : 'danger gtm-bt-tab-undo-interv-status'
            }
            ghost
            onClick={() => saveInterventionStatus(id, 's')}
            loading={isChecking}
            disabled={isDisabled}
          >
            <Icon type="rollback" style={{ fontSize: 16 }} />
          </Button>
        </Tooltip>
      )}
      {!isChecked && (
        <Dropdown
          overlay={menu(id, saveInterventionStatus, onShowModal)}
          loading={isChecking}
          disabled={isDisabled}
        >
          <Button
            type="primary"
            loading={isChecking}
            disabled={isDisabled}
            className={onShowModal ? 'gtm-bt-menu-interv-status' : 'gtm-bt-tab-interv-status'}
          >
            <Icon type="caret-down" style={{ fontSize: 16 }} />
          </Button>
        </Dropdown>
      )}
      {onShowModal && (
        <Tooltip
          title={
            isClosed
              ? 'Esta intervenção não pode mais ser alterada, pois já foi resolvida.'
              : 'Alterar intervenção'
          }
          placement="left"
        >
          <Button
            type="primary gtm-bt-menu-interv"
            style={{ marginLeft: '5px' }}
            disabled={isClosed}
            onClick={() => {
              onShowModal({
                ...data,
                idPrescriptionDrug: id,
                uniqueDrugList: [],
                admissionNumber
              });
            }}
          >
            <Icon type="warning" style={{ fontSize: 16 }} />
          </Button>
        </Tooltip>
      )}
    </>
  );
};

const columns = filteredInfo => [
  {
    title: 'Data',
    dataIndex: 'date',
    align: 'center',
    width: 80,
    render: (text, record) => {
      return format(new Date(record.date), 'dd/MM/yyyy HH:mm');
    }
  },
  {
    title: 'Prescrição',
    dataIndex: 'idPrescription',
    align: 'center',
    width: 80,
    render: (text, record) => {
      return (
        <TableLink
          href={`/triagem/${record.idPrescription}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          # {record.idPrescription}
        </TableLink>
      );
    }
  },
  {
    title: 'Medicamento',
    dataIndex: 'drugName',
    align: 'left',
    width: 200
  },
  {
    title: 'Motivo',
    dataIndex: 'reasonDescription',
    align: 'left',
    width: 100
  },
  {
    title: 'Situação',
    dataIndex: 'status',
    align: 'center',
    width: 80,
    filteredValue: filteredInfo.status || null,
    onFilter: (value, record) => record.status === value,
    render: (text, record) => {
      const config = {};
      switch (record.status) {
        case 'a':
          config.label = 'Aceita';
          config.color = 'green';
          break;
        case 'n':
          config.label = 'Não aceita';
          config.color = 'red';
          break;
        case 'x':
          config.label = 'Não se aplica';
          config.color = null;
          break;
        case 's':
          config.label = 'Pendente';
          config.color = 'orange';
          break;
        default:
          config.label = `Indefinido (${record.status})`;
          config.color = null;
          break;
      }

      return <Tag color={config.color}>{config.label}</Tag>;
    }
  },
  {
    title: 'Ações',
    align: 'center',
    width: 80,
    render: (text, record) => {
      return <Action {...record} />;
    }
  }
];

export default columns;
