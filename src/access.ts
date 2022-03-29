/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserInfoParams | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser?.permissions?.[0] === 'admin',
  };
}
