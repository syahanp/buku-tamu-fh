import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useLocation, useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import {baseUrl} from '../api';

import { icon_true, icon_refresh } from '../components/Icon';
import {Button} from '../components/Buttons';
import BaseTableWithAction from '../components/Table/BaseTableWithAction';
import Searchbar from '../components/Searchbar';
import { toast } from 'react-toastify';
import { useDidUpdateEffect } from '../Hooks';

const SingleDays = () => {
    const params = useParams();
    const location = useLocation();
    
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const [totalVisitor, setTotalVisitor] = useState(0);
    const [isRefreshing, setRefreshing] = useState(false);

    const getData = () => {
        setRefreshing(true)

        const url = query ? `api/list-kunjungan?page=1&search=${params.date}&find=${query}` : `api/list-kunjungan?page=1&search=${params.date}`

        baseUrl.get(url)
        .then(res => {
            // console.log(res.data);
            setData(res.data.records);
            setPage(1)
            setTotalVisitor(res.data.total[0].totalRecords)
            setTotalPage(res.data.total[0].totalPage)
            setRefreshing(false)
        })
        .catch(err => {
            console.log(err.response);
            toast.error('Error getting new data', {
                autoClose: 1500,
                hideProgressBar: true,
            });
            setRefreshing(false)
        })
    }

    useEffect(() => {
        setInterval(getData, 300000) // 5 menit
    }, [])

    useEffect(() => {
        const url = query ? `api/list-kunjungan?page=1&search=${params.date}&find=${query}` : `api/list-kunjungan?page=1&search=${params.date}`

        baseUrl.get(url)
        .then(res => {
            // console.log(res.data);
            setData(res.data.records);
            setTotalVisitor(res.data.total[0].totalRecords)
            setTotalPage(res.data.total[0].totalPages)
        })
        .catch(err => {
            console.log(err.response);
        })
    }, [query])

    useDidUpdateEffect(() => { 
        let url
        
        if (query) url = `api/list-kunjungan?page=${page}&search=${params.date}&find=${query}`
        url = `api/list-kunjungan?page=${page}&search=${params.date}`

        baseUrl.get(url)
        .then(res => {
            setData([...data, ...res.data.records]);
        })
        .catch(err => {
            console.log(err.response);
        })

    }, [page])

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
        },
        {
            Header : 'Tujuan',
            accessor : 'unit',
            sortType: 'basic',
            width: 140
        },
        {
            Header : 'APD',
            accessor : 'apd',
            sortType: 'basic',
            width: 80,
            Cell: ({row}) => {
                if (row.original.apd === "true") return <div>{icon_true}</div>
                return <div/>
            }
        },
        {
            Header : 'Masuk',
            accessor : 'masuk',
            sortType: 'basic',
            width: 100,
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
            width: 100,
            Cell: ({row}) => {
                if (row.original.keluar === "00:00:00") return <div/>
                return <div>{row.original.keluar}</div>
            }
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
                <Button set='primary' onClick={getData} isLoading={isRefreshing} isDisabled={isRefreshing}> 
                    {icon_refresh} Refresh 
                </Button>
                <h2>{format(location.state.selectedDate, 'PPPP', {locale: id})}</h2>
                <span>{totalVisitor} Pengunjung</span>
            </div>

            <br/>

            <Searchbar placeholder='Cari nama atau nomor...' outputValue={x => setQuery(x)} />

            <br/>

            <BaseTableWithAction 
                columns={columns} 
                data={data}
                action={({row, data}) => (
                    <Action id={data[row.index].id} />
                )}
            />

            <br/>

            <Button 
                set="primary" 
                size='lg'
                isVisible={page < totalPage}
                onClick={() => setPage(page+1)}
            >
                Muat Lebih Banyak
            </Button>

            <br/>
        </Div>
    )
}
export default SingleDays

const Div = styled.div`
    padding-bottom: 2rem;
    text-align: center;

    .single_header {
        text-align: center;
        margin-bottom: 1.5rem;

        h2 {
            margin-top: 1rem;
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