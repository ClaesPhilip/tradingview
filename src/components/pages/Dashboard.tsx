import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from '../UI/Message';
import { setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import axios from 'axios';

const options: any = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {function: 'GLOBAL_QUOTE', symbol: 'TSLA'},
  headers: {
    'x-rapidapi-key': '3ac8d4ae88msh5e51fe37d8246cbp1d1d55jsnaf860dc19453',
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(success) {
      dispatch(setSuccess(''));
    }
  }, [success, dispatch]);


  return(
    <section className="section">
      <div className="container">
        {needVerification && <Message type="success" msg="Please verify your email address." />}
        <h1 className="is-size-1">Welcome {user?.firstName}</h1>
        <Link to='/test'>TEST ME</Link>
        
      </div>
    </section>
  );
}

export default Dashboard;