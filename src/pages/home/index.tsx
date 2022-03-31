import { FC,useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { HomeProps } from './data';
import styles from './style.less';
import {option} from './config';




const Home: FC<HomeProps> = () => {
  const [count] = useState(Math.random())
  const chartRef:any = useRef(null)
  let chartInstance:any = null

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
    <div>
      <div className={styles.home}>首页内容区</div>
      <div style={{width: "500px", height: "500px"}} ref={chartRef} />
    </div>
  );
};

export default Home;
