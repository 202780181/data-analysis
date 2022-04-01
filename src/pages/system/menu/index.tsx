import { FC, useRef, useState } from 'react';
import { Button, ConfigProvider, message, Popconfirm } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import BorderBox from '@/components/BorderBox';
import { menuList } from './service';
import { TableListItem } from '@/pages/system/user/data';
import AddModuleFunc from './module';
import style from './index.less';
import { deleteMenu } from './service';

type baseProps = {
  title?: '';
};
const valueEnum = {
  '0': {
    text: '显示',
    status: 'Success',
  },
  '1': {
    text: '不显示',
    status: 'Default',
  },
};

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
  const [showModule, setShowModule] = useState(false);
  const [selectRow, setSelectRow] = useState<Partial<TableListItem[]>>([]);

  const updateMenu = (data: any[]) => {
    if (!data.length && data.length !== 1) {
      message.warning('选择要修改的数据必须为1条！');
      return;
    }
    setSelectRow(data);
    setShowModule(true);
  };

  const deleteHandelFirm = (data: TableListItem) => {
    const { menuId } = data;
    if (!menuId) {
      message.error('删除异常,请稍后重试！');
      return;
    }
    const res = deleteMenu(menuId);
    console.log(res);
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
      width: 300,
      valueType: 'option',
      key: 'option',
      render: (formProps, data) => [
        <Button
          key="edit"
          className={style.edit}
          size="small"
          onClick={() => {
            updateMenu([data]);
          }}
        >
          <EditOutlined />
          编辑
        </Button>,
        <Button type="primary" size="small" key="add">
          <PlusOutlined />
          新增
        </Button>,
        <Popconfirm
          placement="topLeft"
          title="确定要此菜单吗?"
          okText="确认"
          cancelText="取消"
          key="delete-prop"
          onConfirm={() => deleteHandelFirm(data)}
        >
          <Button type="primary" danger size="small" key="delete">
            <DeleteOutlined />
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ConfigProvider>
      <div className={style.systemMenu}>
        <BorderBox title="菜单管理" cut={10} autoHigh>
          <ProTable
            pagination={false}
            className={style.useTable}
            headerTitle=""
            actionRef={actionRef}
            cardBordered
            rowKey="menuId"
            search={{
              // span: defaultColConfig,
              defaultCollapsed: false,
              labelWidth: 'auto',
              optionRender: () => [
                <Button
                  key="add-module"
                  className={style.searchBtn}
                  type="primary"
                  onClick={() => setShowModule(true)}
                >
                  <PlusOutlined />
                  新增
                </Button>,
                <Button
                  key="edit-module"
                  className={style.searchBtn}
                  type="primary"
                  onClick={() => updateMenu(selectRow)}
                >
                  <EditOutlined />
                  修改
                </Button>,
                <Button key="export-mf3" className={style.searchBtn} type="primary">
                  <EditOutlined />
                  展开/折叠
                </Button>,
              ],
            }}
            rowSelection={{
              type: 'checkbox',
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectRow(selectedRows);
              },
            }}
            toolBarRender={false}
            request={getMenuList}
            columns={columns}
          />
        </BorderBox>
        <AddModuleFunc
          dataSource={selectRow}
          visible={showModule}
          cancel={setShowModule}
          clearDataSource={setSelectRow}
        />
      </div>
    </ConfigProvider>
  );
};

export default Menu;
