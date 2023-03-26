import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import { loadingAction, loginAction, loginUser } from "../store/actions/actionCreator";
import Swal from '../utils/swal';

function Login() {

    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading} = useSelector((state) => state.user);

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(loginUser(data))
        .then(res => {
            if(res.status !== 200) return res.text().then(text => {throw JSON.parse(text)})
            else return res.json()
        })
        .then(datas => {
            dispatch(loginAction(true));
            localStorage.access_token = datas.access_token;
            return Swal.fire({
                title: datas.message,
                icon: "success"
            })
        })
        .then(({isConfirmed}) => {
            if(isConfirmed) navigate("/");
        })
        .catch(err => {
            Swal.fire({
                title: "Invalid data",
                text: err.message,
                icon: "error"
            })
        })
        .finally(() => dispatch(loadingAction(false)))
    }

    if(isLoading) {
        return <Preloader />
    } else {

  return (
    <div className="p-12">
      <h1 className="text-center text-3xl font-bold">Login Page</h1>
      <form onSubmit={submit} class="bg-white rounded px-8 pt-6 pb-8 mb-4 w-1/3 mx-auto">
        <div class="mb-4">
          <input
            class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            name="username"
            required
            onChange={handleInput}
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <input
            class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            required
            onChange={handleInput}
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="flex flex-col items-center space-y-4">
          <button
            class="mx-auto bg-black text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <Link to="/register" className="inline-block text-center mx-auto border-2 border-black text-black font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</Link>
        </div>
      </form>
    </div>
  );
}
}
export default Login;
