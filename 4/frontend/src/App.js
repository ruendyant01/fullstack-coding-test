
import './App.css';
import { Outlet } from 'react-router';
import Header from './components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './store/actions/actionCreator';

function App() {
  
  const disp = useDispatch();

  useEffect(() => {
    if(localStorage.access_token) {
      disp(loginAction(true));
    }
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
