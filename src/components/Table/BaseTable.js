import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, useFlexLayout } from 'react-table';
import { icon_sort_down, icon_sort_up, icon_sort_init } from '../Icon';
import './table.scss';

const BaseTable = ({ columns, data, noData }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
        useFlexLayout
    )

    return (
        <div className='tableWrap base_table'>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((header, i) => (
                        <tr key={i} {...header.getHeaderGroupProps()}>
                            {
                                header.headers.map(col => (
                                    <th {...col.getHeaderProps(col.getSortByToggleProps())} className={col.isSorted ? 'sort_active' : null}>
                                        {col.render('Header')}
                                        <span>
                                            {
                                                col.id === 'action' ? null :
                                                col.isSorted ? 
                                                (col.isSortedDesc ? icon_sort_down : icon_sort_up) : 
                                                icon_sort_init
                                            }
                                        </span>
                                    </th>
                                ))
                            }
                        </tr>
                    ))}
                </thead>
                
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row, i) => {
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

            {rows.length === 0 ? <NoData>{noData}</NoData> : null}
        </div>
    )
}

export default BaseTable;

const NoData = styled.div`
    width: 100%;
    padding: 1rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
`