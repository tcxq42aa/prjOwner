/**
 * Created by charles on 16/2/25.
 */
$(document).ready(function () {

    //百分比背景条
    $('.row[data-precent]').each(function (i, e) {
        $tmp = $('<div class="precent" style="width:0"></div>');
        $(e).append($tmp);
        $tmp.width($(e).data('precent') + '%');
    });

    //我的单价分割线
    $('.deal-info[data-precent]').each(function (i, e) {
        $(e).append('<div class="precent" style="width:' + $(e).data('precent') + '%"></div>')
    });

    //图标切换
    $('.btn-group').on('click', function (e) {
        $('.active', this).removeClass('active');
        $(e.target).addClass('active');
        var chartType = $(e.target).data('chart');
        switch (chartType) {
            case 1:
                //todo 数据集成
                drawChat1([48112, 46112, 47190]);
                break;
            case 2:
                //todo 数据集成
                var data = {
                    category: ["12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月"],
                    list1: [5, 5, 5.6, 5.6, 5.8, 5.6, 7, 5.6, 5.6, 5.8, 5.6, 7],
                    list2: [5, 5.6, 5.6, 5.8, 5.6, 7, 5, 5.6, 5.8, 5.6, 7, 5],
                    list3: [5.5, 5.4, 6, 4.3, 5, 5.3, 6.1, 6, 4.3, 5, 5.3, 6.1]
                }
                drawChat2(data);
                break;
        }
    });

    //todo 数据集成
    drawChat1([48112, 46112, 47190]);
});

//挂牌均价图标
function drawChat1(data) {

    var myChart = echarts.init(document.getElementById('chart'));

    var option = {
        tooltip: {
            show: false,
            showContent: false
        },
        grid: {
            top: '5%',
            right: '4%',
            left: '4%',
            bottom: '6%',
            containLabel: true
        },
        xAxis: [
            {
                position: 'top',
                type: 'value',
                boundaryGap: ['2%', '10%'],
                splitNumber: 3,
                min: 20000,
                scale: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    fontWeight: 'bold',
                    color: '#aaa'
                },
                axisLabel: {
                    textStyle: {
                        color: '#aaa'
                    },
                    formatter: function (value, index) {
                        return (value / 10000).toFixed(0);
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        yAxis: [
            {
                inverse: true,
                splitLine: {
                    show: false
                },
                type: 'category',
                data: ["我的房源", "小区挂牌", "浦东挂牌"],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#aaa',
                        fontSize: 14
                    }
                }
            }
        ],
        series: [
            {
                type: 'bar',
                data: data,
                legendHoverLink: false,
                itemStyle: {
                    normal: {
                        color: '#45A45F',
                        opacity: 0.75
                    }
                },
                barCategoryGap: '50%',
            }
        ]
    };

    myChart.setOption(option);

}

//成交均价图标
function drawChat2(data) {
    var myChart = echarts.init(document.getElementById('chart'));

    var option = {
        tooltip: {
            show: false,
            showContent: false
        },
        dataZoom: [
            {
                type: 'inside',
                zoomLock: false,
                xAxisIndex: 0,
                orient: 'horizontal',
                startValue: 3,
                endValue: 8,
                throttle: 60
            }
        ],
        legend: {
            data: ['我的房源', '小区成交', '浦东成交']
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '6%',
            containLabel: true
        },
        xAxis: [
            {
                splitLine: {
                    show: false
                },
                type: 'category',
                data: data.category,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#aaa'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '均价(万/㎡)',
                boundaryGap: ['60%', '10%'],
                splitNumber: 3,
                scale: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    fontWeight: 'bold',
                    color: '#aaa'
                },
                axisLabel: {
                    textStyle: {
                        color: '#aaa'
                    }
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        series: [
            {
                name: '我的房源',
                type: 'line',
                data: data.list1,
                itemStyle: {
                    normal: {
                        color: '#2DAAFF'
                    }
                }
            },
            {
                name: '小区成交',
                type: 'line',
                data: data.list2,
                itemStyle: {
                    normal: {
                        color: '#31A057'
                    }
                }
            },
            {
                name: '浦东成交',
                type: 'bar',
                data: data.list3,
                legendHoverLink: false,
                itemStyle: {
                    normal: {
                        color: '#DAE5EB'
                    },
                    emphasis: {
                        color: '#DAE5EB'
                    }
                }
            }
        ]
    };

    myChart.setOption(option);

}