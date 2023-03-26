import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import FormStruct from "../components/formCreate";
import {generateTree, saveTreeFormating} from '../utils/treeArray';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import { addNewUserOrg, createOrgAction } from "../store/actions/actionCreator";
import MySwal from "../utils/swal";

function CreateOrgs() {

    const [data, setData] = useState({});
    const [count, setCount] = useState([]);
    const [tree, setTree] = useState({});
    const [options, setOptions] = useState([]);
    const [name, setName] = useState(null);
    const disp = useDispatch()
    const navi = useNavigate()
    

    useEffect(() => {
        const arrTree = ObjToArr(data)
        setTree(generateTree(arrTree));
    }, [data]);

    const add = () => {
        setCount([...count, (count.length === 0 ? 2 : ++count[count.length - 1])])
    }

    const ObjToArr = (obj) => {
        const rest = Object.keys(data).map(val => {
            return obj[val];
        })
        return rest;
    }

    const handleInput = (e) => {
        setData({
            ...data,
            "node-1": {
                ...data["node-1"],
                parent: "null"
            },
            [e.target.id]: {
                ...data[e.target.id],
                [e.target.name]:+e.target.value
            }
        })
        if(e.target.name === "name") {
            setOptions([...options, e.target.value])
        }
    }

    const save = () => {
        if(!name || !data) {
            const datas = name ? "structure" : "name"
            MySwal.fire({
                title: "Invalid data",
                text: `${datas} is required`
            })
            return;
        }
        const newData = saveTreeFormating(data);
        disp(createOrgAction({name, structure:newData}))
        .then(res => {
            if(res.status !== 201) return res.text().then(text => {throw text});
            return res.json();
        })
        .then(resp => {
            disp(addNewUserOrg(data));
            return MySwal.fire({
                title: "Success created",
                text: resp.message,
                icon:"success"
            })
        })
        .then(({isConfirmed}) => {
            if(isConfirmed) navi("/organization");
        })
        .catch(err => MySwal.fire({
            title: err.message,
            icon:"error"
        }))
    }

    const deleteForm = (e) => {
        const id = e.target.id;
        const idNumber = id[id.length-1];
        setCount(count.filter(val => val !== +idNumber));
        const newData = data;
        delete newData[id];
        setData(newData);
    }


    return (
        <div className="flex space-x-10 p-28">
            <div className="basis-1/2 space-y-6"> 
            <input name="orgsName" onChange={(e) => setName(e.target.value)} className="focus:outline-none" type="text" placeholder="Organization Name"/>
                <div className="flex space-x-1 [&_*]:border [&_*]:py-1 [&_*]:px-2 [&_*]:rounded-lg">
                    <input onBlur={handleInput} id="node-1" name="name" className="focus:outline-none" type="text" placeholder="Node"/>
                    <input id="node-1" name="parent" onChange={handleInput} className="focus:outline-none" type="text" placeholder="Parent"  defaultValue="null"/>
                    <button id="node-1" onClick={deleteForm}>-</button>
                </div>
                {
                    count.map((val) => {
                        return <FormStruct id={val} key={val} handleInput={handleInput} deleteForm={deleteForm} options={[...new Set(options)]}/>
                    })
                }
                <button onClick={add} className="font-bold border-2 border-black py-1 w-1/2 px-4 text-center rounded-lg"> + Add</button>
            </div>
            <div className="basis-1/2 space-y-6">
                {
                    Object.keys(tree).length !== 0 ? 
                    <Tree data={tree} orientation="vertical" translate={{x:200, y:50}}/> : 
                    <div>Add Node</div>
                }
                <button className="mx-auto rounded-lg py-1 w-1/2 px-4 text-center text-white font-bold bg-black" onClick={save}>Save</button>
            </div>
        </div>
    )
}

export default CreateOrgs;