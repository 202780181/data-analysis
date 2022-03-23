import {useState} from 'react'

// todo: 存放全局menu菜单
export const menuList = () => {
  const [menu, setMenu] = useState([]);
  return {
    menu,
    setMenu
  }
}
