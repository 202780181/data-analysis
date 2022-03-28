import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';
import style from './index.less';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '新友科技股份有限公司',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter className={style.footerBar} copyright={`${currentYear} ${defaultMessage}`} />
  );
};
