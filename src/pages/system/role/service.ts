// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

export async function rule(
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
  }>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
      ...(options || {}),
    },
  });
}
