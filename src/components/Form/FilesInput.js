import React from 'react';
import styled from 'styled-components';
import color from '../../css/colors.scss';

const FilesInput = ({
    name,
    onChange,
    label,
    accept
}) => {
    
    const handleChange = e => {
        onChange && onChange(name, e.target.files[0]);
    };

    return (
        <Div>
            <label> {label || ""} </label>
            <input 
                type="file" 
                accept={accept || 'audio/*,video/*,image/*'}
                name={name}
                onChange={handleChange}
            />
        </Div>
    )
}
export default FilesInput;

const Div = styled.div`
    position: relative;

    &::after {
        content: "";
        pointer-events: none;
        position: absolute;
        top: 30%;
        left: 0;
        width: 40px;
        right: 0;
        height: 46px;
        background-image: url(https://image.flaticon.com/icons/png/128/109/109612.png);
        display: block;
        margin: 0 auto;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    input {
        width: 100% !important;
        outline: 2px dashed ${color.neutral};
        padding: 90px 0px 50px 40%;
        text-align: center !important;
        margin: 0;
    }
`