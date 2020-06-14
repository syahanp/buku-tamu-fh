/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { baseUrl } from '../api/BaseUrl';
import { setLastVisit } from '../helper';
import { useLocation, useHistory } from 'react-router-dom';
import { icon_ok, icon_warning_triangle } from '../components/FontAwesome'
import qs from 'qs';
import color from '../assets/css/colors.scss'

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

export const useStatusResolver = (data) => {
    const [status, setStatus] = useState('')
    const [statusColor, setStatusColor] = useState('')
    
    useEffect(() => {
        if (data && data.length > 0) {
            let check = data.find(x => x.status === 'dicabut')
            if (check) {
                setStatus('dicabut') 
                setStatusColor(color.danger)
            } else {
                data.map(x => {
                    if (x.status === 'dirubah sebagian') {
                        setStatus('dirubah sebagian')
                        setStatusColor(color.warning)
                        return true
                    }

                    setStatus('berlaku')
                    setStatusColor(color.primary)

                })
            }


        } else {
            setStatus('berlaku')
            setStatusColor(color.primary)
        }
    }, [])

    // if status histories found
    return {
        color : statusColor,
        status : status
    }
}

export const useMultipleQuery = (data, query, store = []) => {

    // sort untuk loop dari keyword terbanyak dulu
    let sortedQuery = query.sort((a, b) => b.length - a.length)

    sortedQuery.map((x, i) => {

        // const regex = new RegExp(`(^|\\s)${x}(\\s|$)`, 'ig');
        const regex = new RegExp(`${x}`, 'ig');
        if (i > 0) {
            let saveStore = []
            store.map(str => {
                if (regex.test(str)) {
                    let matchQuery = str.replace(regex, ` <span class='highlight'>${x}</span> `)
                    saveStore = [...saveStore, matchQuery]
                } else {
                    return saveStore = [...saveStore, `${str}`]
                }
            })
            
            store = saveStore
        }

        if (i === 0) {
            data.map(str => {
                if (regex.test(str)) {
                    let matchQuery = str.replace(regex, ` <span class='highlight'>${x}</span> `)
                    store = [...store, matchQuery]
                } else {
                    return store = [...store, `${str}`]
                }
            })
        }
    })

    return store
}

export const useQueryParse = () => {
    const location = useLocation()
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    return query
}

export const useViewStatusResolver = (loginStatus, status) => {
    const history = useHistory()

    if (loginStatus) {
        switch (status) {
            case 'berlaku':
                return <MyStatus color={color.primary}> {icon_ok} Peraturan ini masih berlaku</MyStatus>

            case 'dirubah sebagian' :
                return <MyStatus color={color.warning}> {icon_warning_triangle} Peraturan ini telah diubah sebagian</MyStatus>

            case 'dicabut':
                return <MyStatus color={color.danger}> {icon_warning_triangle} Peraturan ini telah dicabut</MyStatus>
        
            default:
                break;
        }
    }
    else {
        const loginOnClick = () => {
            setLastVisit()
            history.push('/login')
        }
        return (
            <MyStatus color={color.primary}> 
                <span 
                    style={{textDecoration : 'underline', cursor: 'pointer'}} 
                    onClick={() => loginOnClick}
                >Login</span> untuk melihat status peraturan ini.
            </MyStatus>
        )
    }
}
const MyStatus = styled.div`
    padding: .75rem 1rem;
    font-weight: 600;
    background-color: ${props => props.color};
    color: #fff;
    border-radius: 5px;

    svg {
        margin-right: .5rem;
        font-size: 18px;
    }
`