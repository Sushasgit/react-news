import React from 'react';
import styled from 'styled-components';

const GridItem = ({ children, width, view }) =>
    view === 'full' ? (
        <BaseGrid view={view} width={width}>
            {children}
        </BaseGrid>
    ) : (
        <ShortGrid>{children}</ShortGrid>
    );

const BaseGrid = styled.div`
    grid-column-end: span ${props => (props.view === 'full' ? props.width : 8)};
    display: flex;
    flex-direction: ${props => (props.view === 'full' ? 'column' : 'unset')};
    position: relative;

    @media (max-width: 900px) {
        grid-column-end: span 3;
    }

    @media (max-width: 720px) {
        margin-bottom: 1em;
    }
`;

const ShortGrid = styled.div`
    max-width: 600px;
    display flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px
    
    @media (max-width: 500px) {
       flex-direction: column;
       align-items: stretch;
    }
`;

export default GridItem;
