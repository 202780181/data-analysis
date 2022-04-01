import { FC, useState, useEffect, useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { RingProgress } from '@ant-design/charts';
import { Button, Radio } from 'antd';
import BorderBox from '@/components/BorderBox';

import * as echarts from 'echarts';
import type { HomeProps } from './data';
import styles from './style.less';
import { option, breakfastRing, LunchRing, dinnerRing, lineOption } from './config';




const Home: FC<HomeProps> = () => {
  const [count] = useState(Math.random())
  const lineRef: any = useRef(null)
  const merchantRef: any = useRef(null)
  const posRef: any = useRef(null)
  let chartInstance: any = null

  // function renderChart() {
  //   const renderedInstance = echarts.getInstanceByDom(chartRef.current)
  //   if (renderedInstance) {
  //     chartInstance = renderedInstance
  //   } else {
  //     chartInstance = echarts.init(chartRef.current)
  //   }
  //   chartInstance.setOption(option)
  // }



  const renderChart = (chart: HTMLDivElement | HTMLCanvasElement, option: object) => {
    const renderedInstance = echarts.getInstanceByDom(chart)
    if (renderedInstance) {
      chartInstance = renderedInstance
    } else {
      chartInstance = echarts.init(chart)
    }
    chartInstance.setOption(option)
  }

  useEffect(() => {
    renderChart(lineRef.current, option)
    renderChart(merchantRef.current, lineOption)
    renderChart(posRef.current, lineOption)
    // renderChart()
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
          <ProCard colSpan="62.7%" bordered className={styles.shadow}>
            <div className={styles.leftHeader}>
              <p className={styles.titleText}>
                趋势
              </p>
              <div className={styles.btnArea}>
                <Button type="primary" shape="round" >交易金额趋势</Button>
                <Button shape="round" >餐均价趋势</Button>
              </div>
            </div>

            <div className={styles.trendChange}>
              <Radio.Group defaultValue="1" className={styles.radioGroup}>
                <Radio.Button value="1">近一周</Radio.Button>
                <Radio.Button value="2">近一月</Radio.Button>
                <Radio.Button value="3">近半年</Radio.Button>
              </Radio.Group>
              <div className={styles.legand}>
                <span className={styles.point1}>学生交易金额</span>
                <span className={styles.point2}>教职工交易金额</span>
                <span className={styles.point3}>校外人员交易金额</span>
              </div>

            </div>


            <div style={{ width: "100%", height: "540px" }} ref={lineRef} />
          </ProCard>
          <div className={styles.right}>
            <BorderBox title="最受欢迎商铺排行榜" autoHigh={false} margin={['0', '0', '24px', '0']}>
              <div style={{ width: "100%", height: "280px" }} ref={merchantRef} />
            </BorderBox>
            <BorderBox title="POS利用率排行榜" autoHigh={false} >
              <div style={{ width: "100%", height: "280px" }} ref={posRef} />
            </BorderBox>
          </div>

        </ProCard>
      </div>

    </div>
  );
};

export default Home;
