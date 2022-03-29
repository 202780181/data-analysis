// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResultParams = {
    code?: number;
    msg?: string;
  };
  type CurrentUser = {
    admin?: boolean;
    avatar?: string;
    createBy?: string;
    createTime?: string;
    delFlag?: string;
    dept?: object;
    deptId?: number;
    email?: string;
    loginDate?: string;
    loginIp?: string;
    nickName?: string;
    params?: object;
    phonenumber?: string;
    postIds?: string;
    remark?: string;
    roleId?: string;
    roleIds?: string;
    roles?: Record<string, any>[];
    searchValue?: string;
    sex?: string;
    status?: string;
    updateBy?: string;
    updateTime?: string;
    userId?: string;
    userName?: string;
  } & ResultParams;

  type UserInfoParams = {
    permissions?: [string];
    roles: [string];
    user?: object;
  } & ResultParams;

  type LoginResult = {
    token?: string;
  } & ResultParams;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    code?: string;
    uuid?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  /** 菜单泛型 **/
  type menuParams = {
    data?: Record<string, any>[];
  };
}
