// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 从服务器获左侧取菜单列表 GET /api/currentUser */
export async function fetchMenuData (options?: { [key: string]: any }) {
  return request<API.menuParams>('/api/menu',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  })
}

