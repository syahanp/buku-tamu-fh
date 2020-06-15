import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {baseUrl} from '../api';
// import color from '../assets/colors.scss';

import {Button} from '../components/Buttons';
import BaseTableWithAction from '../components/Table/BaseTableWithAction';

const SingleDays = (props) => {
    const params = useParams();
    const location = useLocation();
    
    const [data, setData] = useState([])
    const [totalVisitor, setTotalVisitor] = useState(0);
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        baseUrl.get(`api/list-kunjungan?page=1&search=${params.date}`)
        .then(res => {
            console.log(res.data);
            setData(res.data.records);
            setTotalVisitor(res.data.total[0].totalRecords)
        })
        .catch(err => {
            console.log(err.response);
        })
    }, [])

    let columns = [
        {
            Header : 'No.',
            accessor : 'nomor',
            sortType: 'basic',
            width: 80
        },
        {
            Header : 'Nama',
            accessor : 'nama',
            sortType: 'basic',
            width: 150
        },
        {
            Header : 'Keperluan',
            accessor : 'keperluan',
            sortType: 'basic',
            width: 200
        },
        {
            Header : 'Unit',
            accessor : 'unit',
            sortType: 'basic',
        },
        {
            Header : 'APD',
            accessor : 'pelindung',
            sortType: 'basic',
            width: 80
        },
        {
            Header : 'Masuk',
            accessor : 'masuk',
            sortType: 'basic',
        },
        {
            Header : 'Keluar',
            accessor : 'keluar',
            sortType: 'basic',
        },
    ]

    return (
        <Div>
            <div className='single_header'>
                <h2>{format(location.state.selectedDate, 'PPPP')}</h2>
                <span>{totalVisitor} visitors</span>
            </div>
            <BaseTableWithAction 
                columns={columns} 
                data={data}
                action={({row, data}) => (
                    <Action onClick={() => {
                        setCurrentId(data[row.index].id)
                        // setModalOpen(true)
                    }}/>
                )}
            />
        </Div>
    )
}
export default SingleDays

const Div = styled.div`
    .single_header {
        text-align: center;
        margin-bottom: 1.5rem;

        h2 {
            margin-bottom: .5rem;
        }
    }
`

const Action = ({onClick}) => {
    return (
        <div className='table_action'>
            <Button set='primary' size='sm' onClick={onClick}>
                Update
            </Button>
        </div>
    )
}