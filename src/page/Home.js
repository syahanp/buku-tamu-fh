import React, { useState } from 'react'
import styled from 'styled-components';

import MainCalendar from '../components/Calendar/MainCalendar';
import SuhuKeluarModal from '../components/SuhuKeluarModal';
import {Button} from '../components/Buttons';

const Home = () => {

    return (
        <Div>
            <SuhuKeluarModal 
                isOpen={modalSuhuOpen}
                setOpen={x => setModalSuhuOpen(x)}
            />
        </Div>
    )
}
export default Home

const Div = styled.div`

`