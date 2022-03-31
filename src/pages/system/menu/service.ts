// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

export async function menuList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    total?: number;
    success?: boolean;
  }>('/dev-api/system/menu/list', {
    method: 'GET',
    params: {
      ...params,
      ...(options || {}),
    },
  });
}
