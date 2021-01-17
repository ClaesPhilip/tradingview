import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import '../sections/Header.scss';


const Test: FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
  return(
    <div>
      <h1 className="bulle">Welcome {user?.firstName} to your page</h1>
    </div>
  );
}

export default Test;