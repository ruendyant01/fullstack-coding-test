import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import { loadingAction, registerNewUser } from "../store/actions/actionCreator";
import Swal from '../utils/swal';

function Register() {

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
        dispatch(registerNewUser(data))
        .then(res => {
            if(res.status !== 201) return res.text().then(text => {throw JSON.parse(text)})
            else return res.json()
        })
        .then(datas => {
            return Swal.fire({
                title: datas.message,
                icon: "success"
            })
        })
        .then(({isConfirmed}) => {
            if(isConfirmed) navigate("/login");
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
      <h1 className="text-center text-3xl font-bold">Register</h1>
      <form onSubmit={submit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mx-auto">
        <div className="mb-4">
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            required
            name="name"
            onChange={handleInput}
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            required
            name="username"
            onChange={handleInput}
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            required
            name="password"
            onChange={handleInput}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Link to="/login" className="mx-auto text-center bg-black text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">Login</Link>
          <button
            className="inline-block text-center mx-auto border-2 border-black text-black font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
}
export default Register;
