import { FC, useRef, useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  TreeSelect,
  Radio,
  Popover,
  Row,
  Col,
  ConfigProvider,
  message,
} from 'antd';
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
    text: '显示',
    status: 'Success',
  },
  '1': {
    text: '不显示',
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
    width: 300,
    valueType: 'option',
    key: 'option',
    render: () => [
      <Button key="edit" className={style.edit} size="small" onClick={() => {}}>
        <EditOutlined />
        编辑
      </Button>,
      <Button type="primary" size="small" rel="noopener noreferrer" key="add">
        <PlusOutlined />
        新增
      </Button>,
      <Button type="primary" danger size="small" rel="noopener noreferrer" key="delete">
        <DeleteOutlined />
        删除
      </Button>,
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

const AddModuleFunc: FC<{
  visible?: boolean;
}> = (props) => {
  const { visible } = props;
  const [form] = Form.useForm();
  const [menuData] = useState({
    parentId: '',
    name: '测试菜单',
    menuType: '1',
    visible: '0',
    status: '0',
  });
  const handleOk = () => {
    console.log('点击确认---->');
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  const menuTypeChange = () => {};

  useEffect(() => {
    // form.resetFields();
  }, []);

  return (
    <Modal
      width="700px"
      key="addModule-a543"
      title="添加菜单"
      visible={visible}
      onOk={handleOk}
      getContainer={false}
      onCancel={() => {}}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="上级菜单"
          name="parentId"
          rules={[{ required: true, message: '请选择上级菜单' }]}
        >
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [{ title: 'Bamboo', value: 'bamboo' }],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="菜单类型" name="menuType">
          <Radio.Group onChange={menuTypeChange} value={menuData.menuType}>
            <Radio value={'1'}>目录</Radio>
            <Radio value={'2'}>菜单</Radio>
            <Radio value={'3'}>按钮</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="菜单图标" name="icon">
          <Popover placement="bottom" content={'这是现实内容'} trigger="click">
            <Input readOnly />
          </Popover>
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="菜单名称:"
              name="name"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
            >
              <Input value={menuData.name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="显示排序:"
              name="sort"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="路由地址" name="component">
          <Input />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="显示状态:"
              name="visible"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group onChange={menuTypeChange} value={menuData.visible}>
                <Radio value={1}>显示</Radio>
                <Radio value={2}>隐藏</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="菜单状态:"
              name="status"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group onChange={menuTypeChange} value={menuData.status}>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>停用</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const Menu: FC<baseProps> = () => {
  const actionRef = useRef<ActionType>();
  const [showModule, setShowModule] = useState(false);
  const [selectRow, setSelectRow] = useState<any[]>([]);

  const updateMenu = (data: any[]) => {
    if (!data.length && data.length !== 1) {
      message.warning('选择要修改的数据必须为1条！');
      return;
    }
    console.log('点击修改---->');
    console.log(data);
  };

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
        <AddModuleFunc visible={showModule} />
      </div>
    </ConfigProvider>
  );
};

export default Menu;
