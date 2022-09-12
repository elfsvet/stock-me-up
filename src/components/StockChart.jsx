import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';

export const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState('24h');
  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case '24h':
        return day;
      case '7d':
        return week;
      case '1y':
        return year;
      default:
        return day;
    }
  };
  //   console.log(day);
  const colorOfChart = (dayOrWeekOrYear) => {
    const currentValue = dayOrWeekOrYear[dayOrWeekOrYear.length - 1].y;
    // console.log(currentValue);
    const firstValue = dayOrWeekOrYear[0].y;
    if (currentValue - firstValue > 0) {
      return ['#00E396'];
    } else {
      return ['#FF4560'];
    }
  };
//   console.log(colorOfChart(determineTimeFormat()));

//   const color = (determineTimeFormat)

  const options = {
    colors: colorOfChart(determineTimeFormat()),
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '24px',
      },
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:MM',
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const renderButtonSelect = (button) => {
    const classes = 'btn m-1 ';
    if (button === dateFormat) {
      return classes + 'btn-primary';
    } else {
      return classes + 'btn-outline-primary';
    }
  };

  return (
    <div className='mt5 p-4 shadow-sm bg-white'>
      <Chart options={options} series={series} type='area' width='100%' />
      <div>
        <button
          className={renderButtonSelect('24h')}
          onClick={() => setDateFormat('24h')}
        >
          24h
        </button>
        <button
          className={renderButtonSelect('7d')}
          onClick={() => setDateFormat('7d')}
        >
          7d
        </button>
        <button
          className={renderButtonSelect('1y')}
          onClick={() => setDateFormat('1y')}
        >
          1y
        </button>
      </div>
    </div>
  );
};
