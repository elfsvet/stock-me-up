import { StockList } from '../components/StockList';
import { AutoComplete } from '../components/AutoComplete';
import logo from '../images/large.png';
export const StockOverviewPage = () => {
  return (
    <div>
      <img className='rounded mx-auto d-block' src={logo} alt='logo' />
      <AutoComplete />
      <StockList />
    </div>
  );
};
