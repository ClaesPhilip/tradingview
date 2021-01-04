import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setError, setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import Stocks from '../Stocks';
import stockSearch from '../StocksSearch';
import Alert from '../Alert';
import Search from '../StocksSearch';
import { setAlert } from '../../store/actions/AlertActions';

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const StocksData = useSelector((state: RootState) => state.Stocks.data);
  const loading = useSelector((state: RootState) => state.Stocks.loading);
  const error = useSelector((state: RootState) => state.Stocks.error);
  const AlertMsg = useSelector((state: RootState) => state.Alert.message);

  useEffect(() => {
    if(success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);

  return(
    <div>
      <Search title='Enter stock here' />
      {loading ? 
      <h2 className='is-size py-2'>Loading...</h2> 
      : StocksData && 
      <Stocks 
      data={StocksData} 
      id={StocksData} 
      name={StocksData} 
      price={StocksData} 
      symbol={StocksData}   
      />}

      {AlertMsg && <Alert message={AlertMsg} onClose={() => dispatch(setAlert(''))} />}
      {error && <Alert message={error} onClose={() => dispatch(setError(AlertMsg))} />}
    </div>






    // <section className="section">
    //   <div className="container">
    //     {needVerification && <Message type="success" msg="Please verify your email address." />}
    //     <h1 className="is-size-1">Welcome {user?.firstName}</h1>
    //     <Link to='/test'>TEST ME</Link>
    //     <Stocks 
    //     id={stock}
    //     name 
    //     price 
    //     symbol 
    //     marketcap 
    //     volume 
    //     image 
    //     priceChange
        
    //     />
    //   </div>
    // </section>
  );
}

export default Dashboard;