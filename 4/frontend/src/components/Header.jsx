import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadingAction, loginAction } from "../store/actions/actionCreator";
import MySwal from "../utils/swal";

function Header() {

    const {isLogin} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const disp = useDispatch();

    const logout = () => {
        disp(loadingAction(true));
        MySwal.fire({
            title: "Log out successfull",
            icon:"success"
        })
        .then(({isConfirmed}) => {
            if(isConfirmed) {
                disp(loginAction(false));
                localStorage.removeItem("access_token");
                navigate("/")
            }
        })
        .finally(() => disp(loadingAction(false)))
    }

    return (
        <div className="[&_*]:text-xl [&_*]:font-semibold py-4 [&_*]:focus:border-0 px-12 [&_a]:text-black flex justify-between items-center">
            <Link to="/">Home</Link>
            {
                !isLogin ? 
                    <Link to="/login">Login</Link> : 
                <div className="flex justify-between space-x-4">
                    <Link to="/organization">My Works</Link>
                    <button className="text-red-500" onClick={logout}>Log Out</button>
                </div>
            }
        </div>
    )
}

export default Header;