import React, { FC, useEffect, useState } from 'react';
import style from './index.less';
import Icon, {
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  HeatMapOutlined,
  FallOutlined,
  RiseOutlined,
  StockOutlined,
  FundOutlined,
} from '@ant-design/icons';
import { Col, Form, Input, Modal, Popover, Radio, Row, TreeSelect } from 'antd';
import { TableListItem } from './data';

const iconMap: any = [
  AreaChartOutlined,
  PieChartOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  RadarChartOutlined,
  HeatMapOutlined,
  FallOutlined,
  RiseOutlined,
  StockOutlined,
  FundOutlined,
];

const defaultIcon = (
  <div className={style.iconBox} style={{ width: '400px' }}>
    {iconMap.map((item: any, index: number) => {
      return <Icon className={style.icon} data-name={item.value} component={item} key={index} />;
    })}
  </div>
);

const AddModuleFunc: FC<{
  dataSource?: Partial<TableListItem[]>;
  visible?: boolean;
  cancel: (params: boolean) => void;
  clearDataSource?: React.SetStateAction<any>;
}> = (props) => {
  const { visible, cancel, dataSource, clearDataSource } = props;
  const [form] = Form.useForm();

  const [type, setType] = useState<string>('M');

  const handleOk = () => {
    console.log('点击确认---->');
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  const menuTypeChange = (e: any) => {
    setType(e.target.value);
  };

  useEffect(() => {
    const value = dataSource?.[0] || {};
    form.setFieldsValue(value);
    setType(dataSource?.[0]?.menuType || '');
  }, [dataSource]);

  // 清除表单内容
  // const clearSource = () => {
  //   clearDataSource &&
  // }
  return (
    <Modal
      width="700px"
      key="addModule-a543"
      title="添加菜单"
      visible={visible}
      onOk={handleOk}
      getContainer={false}
      onCancel={() => {
        cancel(false);
        setType('M');
        clearDataSource();
      }}
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
          <Radio.Group onChange={menuTypeChange}>
            <Radio value={'M'}>目录</Radio>
            <Radio value={'C'}>菜单</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="菜单图标" name="icon">
          <Popover placement="bottom" content={defaultIcon} trigger="click">
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
              <Input />
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
        {type === 'C' && (
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                label="路由地址"
                name="component"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                label="组件路径"
                name="path"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}
        {type === 'C' && (
          <Row>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                label="权限字符"
                name="perms"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                label="路由参数"
                name="query"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Form.Item label="是否缓存" name="query">
          <Radio.Group>
            <Radio value={1}>缓存</Radio>
            <Radio value={2}>不缓存</Radio>
          </Radio.Group>
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              label="显示状态:"
              name="visible"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
            >
              <Radio.Group>
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
              <Radio.Group onChange={menuTypeChange}>
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

export default AddModuleFunc;
