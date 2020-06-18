import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useQueryParse } from '../Hooks';
import { baseUrl } from '../api';
import color from '../assets/colors.scss';

import UpdateForm from '../components/Form/template/UpdateForm';
import { icon_arrow_left } from '../components/Icon';

const Update = () => {
    const history = useHistory();
    const query = useQueryParse();
    const [data, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        baseUrl.get(`api/kunjungan?id=${query.id}`)
        .then(res => {
            // console.log(res.data);
            setData(res.data)
            setLoaded(true)
        })
        .catch(err => {
            console.log(err.response);
        })
    }, [])
    
    return (
        <Div>
            <h1> 
                <span onClick={() => history.goBack()}>{icon_arrow_left}</span> 
                Update Data Pengunjung
            </h1>
            <br/>

            {isLoaded && <UpdateForm {...data} history={history} />}
        </Div>
    )
}
export default Update

const Div = styled.div`
    padding: 0rem 10rem;

    h1 span svg {
        cursor: pointer;
        margin-right: .5rem;
        
        &:hover {
            color: ${color.primary}
        }
    }

    @media (max-width: 900px) {
        padding: 0rem 2rem;
    }
`