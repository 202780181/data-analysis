import React, {useState} from 'react'
import './style.less'

const TestClassInterfacePage: React.FC = () =>  {
  const [count, setCount] = useState(0)

  return (
    <div onClick={()=> setCount(count + 1)}>这是class测试页面内容:{count}</div>
  )
}

export default TestClassInterfacePage
