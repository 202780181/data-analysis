import { FC, useRef } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import BorderBox from '@/components/BorderBox';
import { menuList } from './service';
import { TableListItem } from '@/pages/system/user/data';
import style from './index.less';

type baseProps = {
  title?: '';
};
const valueEnum = {
  '0': {
    text: '正常',
    status: 'Success',
  },
  '1': {
    text: '关闭',
    status: 'Default',
  },
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
  },
  {
    search: false,
    title: '图标',
    dataIndex: 'icon',
  },
  {
    search: false,
    title: '排序',
    dataIndex: 'orderNum',
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    search: false,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    search: false,
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
    search: false,
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    width: 200,
    valueType: 'option',
    key: 'option',
    render: () => [
      <a key="editable" onClick={() => {}}>
        <EditOutlined />
        编辑
      </a>,
      <a rel="noopener noreferrer" key="add">
        <PlusOutlined />
        新增
      </a>,
      <a rel="noopener noreferrer" key="delete">
        <DeleteOutlined />
        删除
      </a>,
    ],
  },
];

/** 转换组合树结构 */
const handleTree = (
  data: { [key: number]: any }[],
  id: string,
  parentId?: string,
  children?: any,
) => {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  };
  const childrenListMap: object = {};
  const nodeIds: object = {};
  const tree: any = [];

  for (const d of data) {
    if (childrenListMap[d[config.parentId]] == null) {
      childrenListMap[d[config.parentId]] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[d[config.parentId]].push(d);
  }

  for (const d of data) {
    if (nodeIds[d[config.parentId]] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }

  return tree;
};

/** 获取菜单列表 */
const getMenuList = async (): Promise<{ data: []; success: boolean }> => {
  const res = await menuList({});
  const data = handleTree(res.data, 'menuId');
  return Promise.resolve({
    data: data,
    success: true,
  });
};

const Menu: FC<baseProps> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <div className={style.systemMenu}>
      <BorderBox title="菜单管理" actionRef={actionRef}>
        <ProTable
          headerTitle=""
          actionRef={actionRef}
          cardBordered
          rowKey="menuId"
          search={{
            labelWidth: 'auto',
          }}
          toolBarRender={false}
          request={getMenuList}
          columns={columns}
        />
      </BorderBox>
    </div>
  );
};

export default Menu;
