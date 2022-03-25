import type { FC } from 'react';
import type { HomeProps } from './data';
import styles from './style.less';

const Home: FC<HomeProps> = () => {
  return <div className={styles.home}>首页内容区</div>;
};

export default Home;
