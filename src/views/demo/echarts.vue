<template>
  <div>
    <el-card header="ECharts 图表">
      基于
      <el-link type="primary" href="https://echarts.apache.org/zh/index.html" target="_blank"> Apache ECharts </el-link>
      的二次封装。详细使用请参考官方文档。
    </el-card>
    <div class="page">
      <el-row :gutter="15">
        <el-col v-for="(item, index) in list" :key="index" class="col" :sm="24" :md="12" :lg="8" :xl="6">
          <el-card :header="item.title" body-style="padding:0">
            <e-charts :option="item.option" height="250px" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import ECharts from '@/components/ECharts.vue'
const list = [
  {
    title: '折线图',
    option: {
      grid: {
        left: '6%',
        right: '6%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
    },
  },
  {
    title: '折线图',
    option: {
      grid: {
        left: '6%',
        right: '6%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    },
  },
  {
    title: '饼图',
    option: {
      grid: {
        left: '6%',
        right: '6%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' },
          ],
        },
      ],
    },
  },
  {
    title: '散点图',
    option: {
      grid: {
        left: '6%',
        right: '6%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {},
      yAxis: {},
      series: [
        {
          symbolSize: 20,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68],
          ],
          type: 'scatter',
        },
      ],
    },
  },
  {
    title: 'K线图',
    option: {
      grid: {
        left: '6%',
        right: '6%',
        bottom: '10%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
      },
      yAxis: {},
      series: [
        {
          type: 'k',
          data: [
            [20, 34, 10, 38],
            [40, 35, 30, 50],
            [31, 38, 33, 44],
            [38, 15, 5, 42],
          ],
        },
      ],
    },
  },
  //   {
  //     title: '雷达图',
  //     option: {
  //       radar: {
  //         indicator: [
  //           { name: '销售', max: 6500 },
  //           { name: '管理', max: 16000 },
  //           { name: '信息技术', max: 30000 },
  //           { name: '客服', max: 38000 },
  //           { name: '研发', max: 52000 },
  //           { name: '市场', max: 25000 },
  //         ],
  //       },
  //       series: [
  //         {
  //           type: 'radar',
  //           data: [
  //             {
  //               value: [4200, 3000, 20000, 35000, 50000, 18000],
  //               name: '预算分配（Allocated Budget）',
  //             },
  //             {
  //               value: [5000, 14000, 28000, 26000, 42000, 21000],
  //               name: '实际开销（Actual Spending）',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  {
    title: '旭日图',
    option: {
      series: {
        type: 'sunburst',
        data: [
          {
            name: 'Grandpa',
            children: [
              {
                name: 'Uncle Leo',
                value: 15,
                children: [
                  {
                    name: 'Cousin Jack',
                    value: 2,
                  },
                  {
                    name: 'Cousin Mary',
                    value: 5,
                    children: [
                      {
                        name: 'Jackson',
                        value: 2,
                      },
                    ],
                  },
                  {
                    name: 'Cousin Ben',
                    value: 4,
                  },
                ],
              },
              {
                name: 'Father',
                value: 10,
                children: [
                  {
                    name: 'Me',
                    value: 5,
                  },
                  {
                    name: 'Brother Peter',
                    value: 1,
                  },
                ],
              },
            ],
          },
          {
            name: 'Nancy',
            children: [
              {
                name: 'Uncle Nike',
                children: [
                  {
                    name: 'Cousin Betty',
                    value: 1,
                  },
                  {
                    name: 'Cousin Jenny',
                    value: 2,
                  },
                ],
              },
            ],
          },
        ],
        radius: [60, '90%'],
        itemStyle: {
          borderRadius: 7,
          borderWidth: 2,
        },
        label: {
          show: false,
        },
      },
    },
  },
  {
    title: '仪表盘',
    option: {
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}',
          },
          data: [
            {
              value: 50,
              name: 'SCORE',
            },
          ],
        },
      ],
    },
  },
]
</script>

<style lang="scss" scoped>
.page {
  padding: 15px;
  .col {
    margin-bottom: 15px;
  }
}
</style>
