import React from 'react'
import styled from 'styled-components';

import Header from '../components/Calendar/Header'
import MainCalendar from '../components/Calendar/MainCalendar';

const Home = () => {
    return (
        <Div>
            <Header/>
            <MainCalendar />
        </Div>
    )
}
export default Home

const Div = styled.div`

`