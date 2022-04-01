import * as echarts from 'echarts';
export const option = {
  title: {
    show: 'false',
  },

  color: ['#949FF7', '#FF6666 ', '#EC8965'],
  grid: {
    top: 0
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: false,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}',
      showMaxLabel: false, // 是否显示最大tick的label
    },
    axisPointer: {
      snap: true
    }
  },
  // visualMap: {
  //   show: false,
  //   dimension: 0,
  //   pieces: [
  //     {
  //       lte: 6,
  //       color: 'green'
  //     },
  //     {
  //       gt: 6,
  //       lte: 8,
  //       color: 'red'
  //     },
  //     {
  //       gt: 8,
  //       lte: 14,
  //       color: 'green'
  //     },
  //     {
  //       gt: 14,
  //       lte: 17,
  //       color: 'red'
  //     },
  //     {
  //       gt: 17,
  //       color: 'green'
  //     }
  //   ]
  // },
  series: [
    {
      name: '学生交易金额',
      type: 'line',
      smooth: true,
      showSymbol: false,
      // prettier-ignore
      data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
      markArea: {
        data: [
          [
            {
              itemStyle: {
                color: 'rgba(93, 212, 223, 0.1)'
              },
              xAxis: '07:30'

            },
            {
              xAxis: '10:00'
            }

          ],
          [
            {
              itemStyle: {
                color: 'rgba(90, 127, 216, 0.1)'
              },
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      }
    },
    {
      name: '教职工交易金额',
      type: 'line',
      smooth: true,
      showSymbol: false,
      // prettier-ignore
      data: [400, 580, 150, 280, 390, 400, 500, 600, 750, 800, 700, 600, 400, 270, 300, 550, 500, 400, 390, 380],
      markArea: {

        data: [
          [
            {
              itemStyle: {
                color: 'rgba(93, 212, 223, 0.1)'
              },
              xAxis: '07:30'

            },
            {
              xAxis: '10:00'
            }

          ],
          [
            {
              itemStyle: {
                color: 'rgba(90, 127, 216, 0.1)'
              },
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      }
    },
    {
      name: '校外人员交易金额',
      type: 'line',
      smooth: true,
      showSymbol: false,
      // prettier-ignore
      data: [700, 600, 400, 270, 300, 550, 500, 400, 390, 380, 400, 580, 150, 280, 390, 400, 500, 600, 750, 800],
      markArea: {

        data: [
          [
            {
              itemStyle: {
                color: 'rgba(93, 212, 223, 0.1)'
              },
              xAxis: '07:30'

            },
            {
              xAxis: '10:00'
            }

          ],
          [
            {
              itemStyle: {
                color: 'rgba(90, 127, 216, 0.1)'
              },
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      }
    }
  ]
};



export const breakfastRing = {
  height: 50,
  width: 50,
  autoFit: false,
  percent: 0.7,
  color: ['#FFF', '#d1aeef'],
}
export const LunchRing = {
  height: 50,
  width: 50,
  autoFit: false,
  percent: 0.7,
  color: ['#FFF', '#80d8ee'],
}
export const dinnerRing = {
  height: 50,
  width: 50,
  autoFit: false,
  percent: 0.7,
  color: ['#FFF', '#7fb6ec'],
}

var datas = [
  {
    value: 80,
    name: '喜茶',
    data: [
      {
        name: '去年',
        value: 600,
      },
      {
        name: '今年',
        value: 500,
      },
    ],
  },
  {
    value: 70,
    name: 'CoCo',
    data: [
      {
        name: '去年',
        value: 600,
      },
      {
        name: '今年',
        value: 500,
      },
    ],
  },
  {
    value: 60,
    name: '鱼你在一起',
    data: [
      {
        name: '去年',
        value: 600,
      },
      {
        name: '今年',
        value: 500,
      },
    ],
  },
  {
    value: 50,
    name: '潇湘阁',
    data: [
      {
        name: '去年',
        value: 600,
      },
      {
        name: '今年',
        value: 500,
      },
    ],
  },
  {
    value: 40,
    name: '柒公主',
    data: [
      {
        name: '去年',
        value: 600,
      },
      {
        name: '今年',
        value: 500,
      },
    ],
  },
  {
    value: 35,
    name: '西贝筱面村',
    data: [
      {
        name: '去年',
        value: 600,
      },
      {
        name: '今年',
        value: 500,
      },
    ],
  },
  {
    value: 25,
    name: '嘉和一品',
    data: [
      {
        name: '去年',
        value: 600,
      },
      {
        name: '今年',
        value: 500,
      },
    ],
  },
];
var maxArr = new Array(datas.length).fill(100);

export const lineOption = {
  backgroundColor: '#fff',
  grid: {
    left: '5%',
    right: '5%',
    bottom: 0,
    top: 0,
    containLabel: true,
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'none',
    },
    formatter: function (params: { name: string; value: string; }) {
      return params.name + ' : ' + params.value;
    },
  },
  xAxis: {
    show: false,
    type: 'value',
  },
  yAxis: [
    {
      type: 'category',
      inverse: true,
      axisLabel: {
        show: true,
        align: 'right',
        textStyle: {
          fontSize: 14,
          color: '#333',
          rich: {
            index: {
              color: '#9d9d9d',
              fontWeight: 'bold',
              fontStyle: 'italic',
            },
            name: {
              width: 7 * 14,
              align: 'left',
              textAlign: 'left',
            },
          },
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      data: datas.map((item) => item.name),
    },
    {
      type: 'category',
      inverse: true,
      axisTick: 'none',
      axisLine: 'none',
      show: true,
      axisLabel: {
        textStyle: {
          color: '#3196fa',
          fontSize: '12',
        },
        formatter: '{value}人',
      },
      data: datas.map((item) => item.value),
    },
  ],
  series: [
    {
      name: '值',
      type: 'bar',
      zlevel: 1,
      itemStyle: {
        normal: {
          barBorderRadius: 10,
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 1,
              color: 'rgba(255, 102, 102, 0.35)',
            },
            {
              offset: 0,
              color: '#FF6666',
            },
          ]),
        },
      },
      barWidth: 8,
      data: datas,
    },
    {
      name: '背景',
      type: 'bar',
      barWidth: 8,
      barGap: '-100%',
      data: maxArr,
      itemStyle: {
        normal: {
          color: '#ededed',
          barBorderRadius: 10,
        },
      },
    },
  ],
};
