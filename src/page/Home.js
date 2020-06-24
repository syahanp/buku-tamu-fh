import React, { useState } from 'react'
import styled from 'styled-components';

import MainCalendar from '../components/Calendar/MainCalendar';
import SuhuKeluarModal from '../components/SuhuKeluarModal';
import {Button} from '../components/Buttons';

const Home = () => {
    const [modalSuhuOpen, setModalSuhuOpen] = useState(false)

    return (
        <Div>
            <center>
                <Button onClick={() => setModalSuhuOpen(true)} set='primary' type="submit"> 
                    Update Suhu Keluar 
                </Button>
            </center>

            <SuhuKeluarModal 
                isOpen={modalSuhuOpen}
                setOpen={x => setModalSuhuOpen(x)}
            />

            <br/>

            <MainCalendar />
        </Div>
    )
}
export default Home

const Div = styled.div`

`