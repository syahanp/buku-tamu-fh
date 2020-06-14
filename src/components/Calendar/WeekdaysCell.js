import React from 'react'
import styled from 'styled-components';

const WeekdaysCell = ({name}) => {
    return (
        <Div>{name}</Div>
    )
}
export default WeekdaysCell;

const Div = styled.div`
    position: relative;
    flex-grow: 1;
    flex-basis: 0;
    padding: .5rem;
    text-align: center;
`