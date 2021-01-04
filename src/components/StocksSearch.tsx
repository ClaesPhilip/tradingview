import React, { FC, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { setAlert } from '../store/actions/AlertActions';
import { getStocks, setLoading } from '../store/actions/StocksAction';

interface SearchProps {
  title: string;
}

const Search: FC<SearchProps> = ({ title }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(name.trim() === '') {
      return dispatch(setAlert('Stock is required!'));
    }

    dispatch(setLoading());
    dispatch(getStocks(name));
    setName('');
  }

  return(
    <div className="hero is-light has-text-centered">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <form className="py-5" onSubmit={submitHandler}>
            <input 
              type="text"
              className="input has-text-centered mb-2"
              placeholder="Enter city name"
              style={{maxWidth: 300}}
              value={name}
              onChange={changeHandler}
            />
            <button className="button is-primary is-fullwidth" style={{maxWidth: 300, margin: '0 auto'}}>Search</button>
          </form>
        </div>
      </div>
    </div>
  );  
}

export default Search;