import React from 'react';
import Modal from 'react-modal';
import Icon, {icon_times} from '../Icon';
import color from '../../assets/colors.scss';
import './modal.scss'

const ReactModal = ({
    title,
    style,
    isOpen,
    onRequestClose,
    className,
    overlayClassname,
    children
}) => {
    
    return (
        <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            contentLabel={title}
            className={className || "modal_custom_default"}
            overlayClassName={overlayClassname || "modal_overlay"}
            style={{content : style}}
            onRequestClose={() => onRequestClose()}
        >

            <div className='modal_container'>
                <div className='modal_header'>
                    <div className='title'>
                        <h4>
                            {title || 'Masukan Judul Modal'}
                        </h4>
                    </div>

                    <div className='action'>
                        <Icon 
                            icon={icon_times} 
                            size='18px' 
                            hoverColor={color.neutral} 
                            onClick={() => onRequestClose()}
                        />
                    </div>
                </div>
                
                <div className='modal_body'>
                    {children}
                </div>
            </div>

        </Modal>
    )
}
export default ReactModal