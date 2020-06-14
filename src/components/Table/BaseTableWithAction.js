import React from 'react';
import { useTable, useSortBy, useFlexLayout } from 'react-table';
import {icon_sort_down, icon_sort_up, icon_sort_init} from '../Icon';
import './table.scss';

const BaseTableWithAction = ({ columns, data, action }) => {

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
        useFlexLayout,
        hooks => {
            hooks.allColumns.push(col => [
                ...col, 
                {
                    id: 'action',
                    Header: () => null,
                    Cell: action,
                    disableSortBy: true
                },
            ])
        }
    )

    return (
        <div className='tableWrap'>
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
        </div>
    )
}

export default BaseTableWithAction;