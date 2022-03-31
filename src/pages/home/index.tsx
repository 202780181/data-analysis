import { FC, useState, useEffect, useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { RingProgress } from '@ant-design/charts';
import * as echarts from 'echarts';
import type { HomeProps } from './data';
import styles from './style.less';
import { option, breakfastRing, LunchRing, dinnerRing } from './config';




const Home: FC<HomeProps> = () => {
  const [count] = useState(Math.random())
  const chartRef: any = useRef(null)
  let chartInstance: any = null

  function renderChart() {
    const renderedInstance = echarts.getInstanceByDom(chartRef.current)
    if (renderedInstance) {
      chartInstance = renderedInstance
    } else {
      chartInstance = echarts.init(chartRef.current)
    }
    chartInstance.setOption(option)
  }

  useEffect(() => {
    renderChart()
  }, [count]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      chartInstance.dispose()
    }
  })


  return (
    <div className="ant-layout-content">
      <div className={styles.home}>
        <div className={styles.header}>
          <p className={styles.titleText}>交易情况</p>
          <div className={styles.headerContent}  >
            <div className={`${styles.headerItem} ${styles.purple}`}>
              <div className={styles.top}>
                <span className={styles.amount}>72.1万元</span>
              </div>
              <div className={styles.type}>
                <span>昨日交易金额</span>
                <span>-18%<i className={styles.down}></i></span>
              </div>
            </div>
            <div className={`${styles.headerItem} ${styles.orange}`}>
              <div className={styles.top}>
                <span className={styles.amount}>72.1万元</span>
              </div>
              <div className={styles.type}>
                <span>昨日充值金额</span>
                <span>-18%<i className={styles.up}></i></span>
              </div>
            </div>
            <div className={`${styles.headerItem} ${styles.pink}`}>
              <div className={styles.top}>
                <span className={styles.amount}>200人</span>
                <div className={styles.circle}>
                  <RingProgress  {...breakfastRing} />
                </div>
              </div>
              <div className={styles.type}>
                <span>昨日早餐就餐人数</span>
                <span>-18%<i className={styles.down}></i></span>
              </div>
            </div>
            <div className={`${styles.headerItem} ${styles.green}`}>
              <div className={styles.top}>
                <span className={styles.amount}>200人</span>
                <div className={styles.circle}>
                  <RingProgress  {...LunchRing} />
                </div>
              </div>
              <div className={styles.type}>
                <span>昨日午餐就餐人数</span>
                <span>-18%<i className={styles.down}></i></span>
              </div>
            </div>
            <div className={`${styles.headerItem} ${styles.blue}`}>
              <div className={styles.top}>
                <span className={styles.amount}>200人</span>
                <div className={styles.circle}>
                  <RingProgress  {...dinnerRing} />
                </div>
              </div>
              <div className={styles.type}>
                <span>昨日晚餐就餐人数</span>
                <span>-18%<i className={styles.down}></i></span>
              </div>
            </div>
          </div>
        </div>
        <ProCard style={{ marginTop: 24 }} gutter={24} ghost>
          <ProCard colSpan="62.7%" layout="center" bordered className={styles.shadow}>
            <div style={{ width: "100%", height: "500px" }} ref={chartRef} />
          </ProCard>
          <ProCard layout="center" bordered className={styles.shadow}>
            右侧区域
          </ProCard>
        </ProCard>
      </div>

    </div>
  );
};

export default Home;
