import React from 'react';
import { Line } from '@ant-design/charts';
import { useModel } from 'umi'

const Page: React.FC = () => {
  const message = useModel('chart')
  console.log('message', message)

  const { add, minus, count } = useModel('counter', (ret) => ({
    add: ret.increment,
    minus: ret.decrement,
    count: ret.counter
  }))
  console.log('counter')

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return <div className="1234">
    测试页面
      <Line {...config} />
    <div>
      <button onClick={add}>add by 1</button>
      <button onClick={minus}>minus by 1 </button>
      <p>计数器：{count}</p>
    </div>
  </div>;
};
export default Page;
