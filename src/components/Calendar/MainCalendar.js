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
import id from 'date-fns/locale/id';
import color from '../../assets/colors.scss';

import Header from './Header'
import DaysCell from './DaysCell';
import WeekdaysCell from './WeekdaysCell';
import { baseUrl } from '../../api';

const MainCalendar = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [totalVisitorPerDay, setTotalPerDay] = useState([])

    useEffect(() => {
        baseUrl.get(`api/calendar/monthly?tanggal=${format(currentMonth, 'yyyy-MM-dd')}`)
        .then(res => {
            console.log(res.data);
            setTotalPerDay(res.data)
            setLoaded(true)
        })
        .catch(err => {
            console.log(err.response);
        })
    }, [])

    const renderWeekdays = useCallback(() => {
        const dateFormat = 'EEEE'
        let weekdays = []

        const startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            let weekdaysName = format(addDays(startDate, i), dateFormat, {locale: id})
            weekdays = [...weekdays, <WeekdaysCell key={i} name={weekdaysName} />]
        }

        return (
            <div className='row'>
                {weekdays}
            </div>
        )
    }, [currentMonth])

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
                let currentDate = format(day, 'yyyy-MM-dd')
                let filterTotatVisitor = totalVisitorPerDay.filter(x => x.tanggal === currentDate)
                let totalVisitor = filterTotatVisitor.length > 0 ? filterTotatVisitor[0].total : ''
                store = [
                    ...store, 
                    <DaysCell 
                        day={setDay} 
                        selectedDate={day} 
                        currentDate={currentDate}
                        totalVisitor={totalVisitor}
                        isDisabled={!isSameMonth(day, monthStart)} 
                        isActive={isSameDay(day, currentMonth) && isSameMonth(day, new Date())}
                    />
                ]
                day = addDays(day, 1);
            }
            endResult = [...endResult, <div className='row'>{store}</div>]
            store = []
        }

        return endResult
    }, [currentMonth, totalVisitorPerDay])
    

    return (
        <Div>
            <Header month={currentMonth} setMonth={x => setCurrentMonth(x)} />

            <div className='weekdays'>
                {renderWeekdays()}
            </div>
            <div className='days'>
                { isLoaded && renderDaysCell()}
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