import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import finnHub from '../apis/finnHub';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { WatchListContext } from '../context/watchListContext';

export const StockList = () => {
  const [stock, setStock] = useState([]);
  const {watchList,deleteStock} = useContext(WatchListContext);
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const displayTheWatchList = (watchList) => {
          return watchList.map((stock) => {
            return finnHub.get('/quote', {
              params: {
                symbol: stock,
              },
            });
          });
        };

        const responses = await Promise.all(
  
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
  }, [watchList]);

  const changeColor = (data) => {
    return data < 0 ? 'danger' : 'success';
  };

  const renderIcon = (data) => {
    return data < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;
  };

  const handleStockSelect = (symbol)=> {
    navigate(`detail/${symbol}`)
  }

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
              <tr style={{cursor: 'pointer'}} onClick={() => handleStockSelect(stockData.symbol)} className='table-row' key={stockData.symbol}>
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
                {/* To not bubble up we will use event method stopPropagation */}
                <td>{stockData.data.pc} <button onClick={(e) =>{
                  e.stopPropagation();
                   deleteStock(stockData.symbol)
                   }} className='btn btn-danger btn-sm ml-3 d-inline-block delete-button'>remove</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
