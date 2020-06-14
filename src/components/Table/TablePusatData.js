import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, useFlexLayout, usePagination } from 'react-table';
// import { icon_sort_down, icon_sort_up, icon_sort_init } from '../FontAwesome';
import './table.scss';
import { useDidUpdateEffect } from '../../Hooks';
import color from '../../assets/css/colors.scss';

const TablePusatData = ({ 
    columns, 
    data, 
    noData,
    fetchData,
    loading, 
    pageCount
}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // pageOptions,
        page,
        state: { pageIndex },
        gotoPage,
        previousPage,
        nextPage,
        // canPreviousPage,
        // canNextPage,
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            initialState: { pageIndex: 1 },
            pageCount: pageCount + 1,
            autoResetPage : false
        },
        useFlexLayout,
        usePagination
    )

    useDidUpdateEffect(() => {
        fetchData({ pageIndex })
    }, [pageIndex])

    return (
        <div className='tableWrap table_pusat_data'>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((header, i) => (
                        <tr key={i} {...header.getHeaderGroupProps()}>
                            {
                                header.headers.map(col => (
                                    <th {...col.getHeaderProps()} className={col.isSorted ? 'sort_active' : null}>
                                        {col.render('Header')}
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr key={i} {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return (
                                                <td {...cell.getCellProps({className: cell.column.collapse ? 'collapse' : '',})}>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            { rows.length === 0 ? <NoData>{noData}</NoData> : null }

            <Pagination>
                <div>
                <BtnPagination className={pageIndex === 1 ? 'disabled' : ''} onClick={() => gotoPage(1)} disabled={pageIndex === 1}>
                {'<<'}
                </BtnPagination>{' '}
                <BtnPagination className={pageIndex === 1 ? 'disabled' : ''} onClick={() => previousPage()} disabled={pageIndex === 1}>
                {'<'}
                </BtnPagination>{' '}

                <span className='show'>
                    Page{' '}
                    <strong>
                        {pageIndex} of {pageCount}
                    </strong>{' '}
                </span>

                <BtnPagination className={pageIndex === pageCount ? 'disabled' : ''} onClick={() => nextPage()} disabled={pageIndex === pageCount}>
                {'>'}
                </BtnPagination>{' '}
                <BtnPagination className={pageIndex === pageCount ? 'disabled' : ''} onClick={() => gotoPage(pageCount)} disabled={pageIndex === pageCount}>
                {'>>'}
                </BtnPagination>{' '}
                </div>
            </Pagination>

        </div>
    )
}

export default TablePusatData;

const NoData = styled.div`
    width: 100%;
    padding: 1rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BtnPagination = styled.button`
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid ${color.primary};
    padding: .2rem .6rem;
    color: ${color.primary};
    transition: all .15s ease-in-out;

    &.dsabled {
        border: 1px solid ${color.neutral};
        color: ${color.neutral};

        &:hover {
            color: ${color.neutral};
        }

    }

    &:hover {
        background-color: ${color.primary};
        color: #fff;
    }
`

const Pagination = styled.div`
    margin: 1rem 0rem;
    display: flex;
    justify-content: center;

    .show {
        vertical-align: middle;
    }
`