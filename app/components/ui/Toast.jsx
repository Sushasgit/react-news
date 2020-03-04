import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const Toast = ({ undoChanges }) => (
    <ToastWrap>
        <Button
            view="confirm"
            type="button"
            label="Undo delete"
            onClick={e => undoChanges(e)}
        />
    </ToastWrap>
);

const ToastWrap = styled.div`
    position: fixed;
    z-index: 1000;
    right: 20px;
    top: 20px;
    background: #fff;
    padding: 10px 40px;
    border: none;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

    &:before {
        content: '';
        border-right: 6px solid #000;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }
`;

export default Toast;
