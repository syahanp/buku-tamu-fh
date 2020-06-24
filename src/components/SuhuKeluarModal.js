import React from 'react';
import ReactModal from './Modal';
import './Modal/modal.scss';
import InputSuhuForm from './Form/template/InputSuhuForm'

const SuhuKeluarModal = ({ isOpen, setOpen }) => {
    
    return (
        <ReactModal
            title='Masukan Suhu Keluar'
            isOpen={isOpen}
            onRequestClose={() => setOpen(false)}
            className='modal_inputSuhu'
        >
            <InputSuhuForm setOpen={x => setOpen(x)} />   
        </ReactModal>
    )
}
export default SuhuKeluarModal