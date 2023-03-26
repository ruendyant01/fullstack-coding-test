import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrgs } from "../store/actions/actionCreator";
import Preloader from '../components/Preloader';
import Card from "../components/Card";

function Home() {

    // const [data, setData] = useState(null);
    const disp = useDispatch();
    const {isLoading} = useSelector((state) => state.user);
    
    useEffect(() => {
        disp(fetchAllOrgs())
    }, [])
    
    const {organizations} = useSelector((state) => state.organization);

    if(isLoading || !organizations) {
        return <Preloader />
    } else {

    return (
        <div className="p-28 grid-cols-3 w-full grid gap-10">
            {
                organizations.map(val => {
                    return <Card data={val} key={val._id}/>
                })
            }
        </div>
    )
}}

export default Home;