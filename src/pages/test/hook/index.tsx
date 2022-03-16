import React,{useState, useEffect} from 'react'
import {Row, Col} from 'antd'
import styles from './style.less'
import C from './components/customizeContext'
import TablePane from './components/table'
import {Table} from 'antd'

type Greeting = {
  name: string;
  age: number;
  clear: () => void;
}

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]

const TestHookInterfacePage: React.FC<Greeting> = () => {
  const [count, setCount] = useState(0)

  // console.log(props)
  // console.log(this) Error this is undefined
  // const [isOnline, setIsOnline] = useState(null)
  //
  // function handleStatusChange (status) {
  //   setIsOnline(status.isOnline)
  // }

  // const [fruit, setFruit] = useState('banana')
  useEffect(()=> {
    console.log('改变了:'+ count)
  }, [count])
  return (
    <Row gutter={24}>
      <Col span={24}>
        <div className={styles.hookRoot} onClick={()=> setCount(count + 1)}>这是hook测试页面内容:{count}</div>
        <C.Provider value={{count}}>
          <TablePane/>
          <Table dataSource={dataSource} columns={columns}>

          </Table>
        </C.Provider>
      </Col>
    </Row>
  )
}

export default TestHookInterfacePage
