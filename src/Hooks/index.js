/* eslint-disable array-callback-return */
import { useEffect, useRef, useState } from 'react';
import { baseUrl } from '../api';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

export const useDidUpdateEffect = (fn, dependencies) => {
    const didMountEffect = useRef(false);

    useEffect(() => {
        if (didMountEffect.current)
        fn();
        else
        didMountEffect.current = true;
    }, dependencies);
}

export const useFetch = (url, dependencies) => {
    const [isUnmount, setUnmount] = useState(false)
    const [data, setData] = useState(null)
    const [isLoaded, setLoaded] = useState(false)
    const [checkpoint, setCheckpoint] = useState(1)

    useEffect( () => {
        
        // set init
        setLoaded(false)
        
        baseUrl.get(url)
        .then(res => {
            
            if(!isUnmount) {
                setData(res.data)
                setLoaded(true)
                setCheckpoint(checkpoint + 1)
            }

        })
        .catch(err => {
            console.log(err)
            setLoaded(true)
        })

    }, dependencies)

    return [data, isLoaded, checkpoint]
}

export const useQueryParse = () => {
    const location = useLocation()
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    return query
}