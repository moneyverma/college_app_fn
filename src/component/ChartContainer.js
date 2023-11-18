'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartContainer = ({ data, chartTitle, extraParamName, xAxisTitle, yAxisTitle }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  
  useEffect(() => {
    if (chartInstance.current) {
      // Destroy the previous chart instance
      chartInstance.current.destroy();
    }

    var values = []
    var labelArr = []
    data.map((item,i) => {
      // console.log("item.label",item.label)
      labelArr[i] = item.label
      // labelArr.push(item.label)
    })

    console.log("labelArr", labelArr)
    // // const label = data.map(l=>l.label)
    // const values = data.map(v => v.value)

    console.log("data", data?.length)


    // const labelsArray = data.map(item => item.label);

    // console.log("labelsArray", labelsArray);

    // console.log("values",values)

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labelArr,
          datasets: [{
            label: chartTitle,
            data: values,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }],
        },
        options: {
          onClick: function (evt, item) {
            console.log('legend onClick', evt);
            console.log('legd item', item);
          }
        },
      });
    }

    // Cleanup: Destroy the chart instance when the component is unmounted
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartContainer;