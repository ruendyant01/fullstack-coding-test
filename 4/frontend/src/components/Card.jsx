import { useState } from 'react';
import { useEffect } from 'react';
import Tree from 'react-d3-tree';
import { treeFormating } from '../utils/treeArray';

function Card({data}) {

    const [tree, setTree] = useState({});
    useEffect(() => {
        setTree(treeFormating(data?.structure))
    }, [data])

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Tree data={tree} orientation="vertical" translate={{x:200, y:50}}/>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.name}</h5>
        </div>
    )
}

export default Card;