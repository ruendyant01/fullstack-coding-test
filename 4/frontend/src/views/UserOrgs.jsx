import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrgs } from "../store/actions/actionCreator";
import Preloader from '../components/Preloader';
import Card from "../components/Card";
import { Link } from "react-router-dom";

function Home() {

    const disp = useDispatch();
    const {isLoading} = useSelector((state) => state.user);
    
    useEffect(() => {
        disp(fetchUserOrgs(localStorage.access_token));
    }, [])
    
    const {userOrgs} = useSelector((state) => state.user);

    if(isLoading || !userOrgs) {
        return <Preloader />
    } else {

    return (
        <div className="flex flex-col space-y-4 items-center py-28 px-36">
            <Link to="create" className="px-6 py-2 self-end border rounded-full font-bold text-lg">Create new structure</Link>
            <div className="grid-cols-3 w-full grid gap-10">
            {
                userOrgs.map(val => {
                    return <Card data={val} key={val._id}/>
                })
            }
        </div>
        </div>
    )
}}

export default Home;