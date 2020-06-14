import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components';
import { 
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    format, 
    addDays,
    isSameMonth,
    isSameDay
} from 'date-fns';
import color from '../../assets/colors.scss';

import DaysCell from './DaysCell';
import WeekdaysCell from './WeekdaysCell';

const MainCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const renderWeekdays = useCallback(() => {
        const dateFormat = 'EEEE'
        let weekdays = []

        const startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            let weekdaysName = format(addDays(startDate, i), dateFormat)
            weekdays = [...weekdays, <WeekdaysCell key={i} name={weekdaysName} />]
        }

        return (
            <div className='row'>
                {weekdays}
            </div>
        )
    }, [])

    const renderDaysCell = useCallback(() => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        let endResult = []

        const dateFormat = 'd';
        let day = startDate
        
        let store = []
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                let setDay = format(day, dateFormat)
                store = [
                    ...store, 
                    <DaysCell 
                        day={setDay} 
                        date={format(day, 'yyyy-MM-dd')}
                        isDisabled={!isSameMonth(day, monthStart)} 
                        isActive={isSameDay(day, currentMonth)}
                    />
                ]
                day = addDays(day, 1);
            }
            endResult = [...endResult, <div className='row'>{store}</div>]
            store = []
        }

        return endResult
    }, [])
    

    return (
        <Div>
            <div className='weekdays'>
                {renderWeekdays()}
            </div>
            <div className='days'>
                {renderDaysCell()}
            </div>
        </Div>
    )
}
export default MainCalendar;

const Div = styled.div`
    margin: 0 auto;
    max-width: 1100px;
    min-width: 1000px;
    overflow: auto;
    
    .row {
        display: flex;
        margin: 0;
        padding: 0;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }

    .days {
        border-left: 1px solid ${color.tableBorder};
        border-bottom: 1px solid ${color.tableBorder};
    }

    .weekdays {
        border-left: 1px solid ${color.tableBorder};
        border-right: 1px solid ${color.tableBorder};
        border-top: 1px solid ${color.tableBorder};
    }

`