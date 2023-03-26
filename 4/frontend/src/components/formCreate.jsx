import { useEffect, useState } from "react";

function FormStruct({id, handleInput,deleteForm, options}) {

    const [opts, setOpts] = useState([]);

    useEffect(() => {
        const validArr = options.slice(0, (id-2)+1);
        setOpts(validArr);
    }, [options])

    return (
        <div className="flex space-y-3 space-x-1 [&_*]:border [&_*]:py-2 [&_*]:px-2 [&_*]:rounded-lg">
            <input onBlur={handleInput} id={`node-${id}`} name="name" className="focus:outline-none" type="text" placeholder="Node"/>
            <select onChange={handleInput} name="parent" id={`node-${id}`} className="w-1/3">
                <option defaultValue="" selected disabled>Select Parent</option>
                {
                    opts.map(val => {
                        return <option defaultValue={val} key={val}>{val}</option>
                    })
                }
            </select>
            <button id={`node-${id}`} onClick={deleteForm}>-</button>
        </div>
    )
}

export default FormStruct;