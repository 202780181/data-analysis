import { FC, useRef } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { rule } from '@/pages/system/user/service';
import { TableListItem } from '@/pages/system/user/data';
import style from './index.less';

// const valueEnumMap = {
//   0: 'close',
//   1: 'running'
// }
const valueEnum = {
  close: { text: '正常', status: '0' },
  running: { text: '停用', status: '1' },
};

const columns: ProColumns<TableListItem>[] = [
  {
    search: false,
    title: '角色编码',
    dataIndex: 'name',
  },
  {
    title: '角色名称',
    dataIndex: 'icon',
  },
  {
    title: '权限字符',
    dataIndex: 'sort',
  },
  {
    search: false,
    title: '显示顺序',
    dataIndex: 'permissions',
  },
  {
    title: '状态',
    filters: true,
    onFilter: true,
    dataIndex: 'status',
    valueType: 'select',
    valueEnum,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    width: 200,
    valueType: 'option',
    key: 'option',
    render: () => [
      <a key="editable" onClick={() => { }}>
        <EditOutlined />
        修改
      </a>,
      <a rel="noopener noreferrer" key="delete">
        <DeleteOutlined />
        院系部门权限
      </a>,
      <a rel="noopener noreferrer" key="delete">
        <DeleteOutlined />
        商户部门权限
      </a>,
      <a rel="noopener noreferrer" key="delete">
        <DeleteOutlined />
        删除
      </a>,
    ],
  },
];
const User: FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <div className={style.userMain}>
      <ProTable
        headerTitle=""
        actionRef={actionRef}
        cardBordered
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={false}
        request={rule}
        columns={columns}
      ></ProTable>
    </div>
  );
};

export default User;
