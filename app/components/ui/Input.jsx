import React from 'react';
import styled from 'styled-components';

const Input = ({ title, handleChange }) => (
    <InputField onChange={e => handleChange(e)} value={title} type="text" />
);

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 0 2px 2px 0;
    font-size: 16px;
    border-right: 0;
    flex: 1;
    line-height: 1.15;
    border: 1px solid rgba(147, 128, 108, 0.25);
`;

export default Input;
