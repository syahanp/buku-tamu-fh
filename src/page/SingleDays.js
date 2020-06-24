import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useLocation, useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import {baseUrl} from '../api';

import {Button} from '../components/Buttons';
import BaseTableWithAction from '../components/Table/BaseTableWithAction';

const SingleDays = () => {
    const params = useParams();
    const location = useLocation();
    
    const [data, setData] = useState([])
    const [totalVisitor, setTotalVisitor] = useState(0);

    useEffect(() => {
        baseUrl.get(`api/list-kunjungan?page=1&search=${params.date}`)
        .then(res => {
            // console.log(res.data);
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
            Header : 'Tujuan',
            accessor : 'tujuan',
            sortType: 'basic',
            width: 140
        },
        {
            Header : 'APD',
            accessor : 'pelindung',
            sortType: 'basic',
            width: 80,
            // Cell: ({row}) => <div></div>
        },
        {
            Header : 'Masuk',
            accessor : 'masuk',
            sortType: 'basic',
        },
        {
            Header : 'Suhu 1',
            accessor : 'suhu1',
            sortType: 'basic',
            width: 100
        },
        {
            Header : 'Keluar',
            accessor : 'keluar',
            sortType: 'basic',
        },
        {
            Header : 'Suhu 2',
            accessor : 'suhu2',
            sortType: 'basic',
            width: 100
        },
    ]

    return (
        <Div>
            <div className='single_header'>
                <h2>{format(location.state.selectedDate, 'PPPP', {locale: id})}</h2>
                <span>{totalVisitor} Pengunjung</span>
            </div>
            <BaseTableWithAction 
                columns={columns} 
                data={data}
                action={({row, data}) => (
                    <Action id={data[row.index].id} />
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

const Action = ({ id }) => {
    return (
        <Link to={`/update?id=${id}`}>
            <Button set='primary' size='sm'>
                Update
            </Button>
        </Link>
    )
}