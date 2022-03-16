import React,{useContext} from 'react'
import C from './customizeContext'


const TablePane: React.FC = ()=> {
  const ctx = useContext(C)
  console.log(ctx)
  return (
    <div>子组件接受到的父组件值：{ctx.count}</div>
  )
}

export default TablePane
