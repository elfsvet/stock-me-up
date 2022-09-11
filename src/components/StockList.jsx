import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';

export const StockList = () => {
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const responses = [];
      try {
        // const response1 = await finnHub.get('/quote', {
        //   params: {
        //     symbol: 'GOOGL',
        //   },
        // })
        // responses.push(response1);
        // const response2 = await finnHub.get('/quote', {
        //     params: {
        //         symbol: 'MSFT',
        //     },
        // });
        // responses.push(response2);
        // const response3 = await finnHub.get('/quote', {
        //     params: {
        //         symbol: 'AMZN',
        //     },
        // });
        // responses.push(response3);
        const displayTheWatchList = (watchList) => {
          return watchList.map((stock) => {
            return finnHub.get('/quote', {
              params: {
                symbol: stock.toUpperCase(),
              },
            });
          });
        };

        const responses = await Promise.all(
          // finnHub.get('/quote', {
          //     params: {
          //       symbol: 'GOOGL',
          //     },
          //   }), finnHub.get('/quote', {
          //     params: {
          //         symbol: 'MSFT',
          //     },
          // }), finnHub.get('/quote', {
          //     params: {
          //         symbol: 'AMZN',
          //     },
          // })
          displayTheWatchList(watchList)
        );

        console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        if (isMounted) {
          console.log(data);
          setStock(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, []);

  const changeColor = (data) => {
    return data < 0 ? 'danger' : 'success';
  };

  const renderIcon = (data) => {
    return data < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;
  };

  return (
    <div>
      <table className='table hover mt-5'>
        <thead style={{ color: 'rgb(79,89,102' }}>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Last</th>
            <th scope='col'>Chn</th>
            <th scope='col'>Chn%</th>
            <th scope='col'>High</th>
            <th scope='col'>Low</th>
            <th scope='col'>Open</th>
            <th scope='col'>Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr className='table-row' key={stockData.symbol}>
                <th scope='row'>{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d} {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp} {renderIcon(stockData.data.dp)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
