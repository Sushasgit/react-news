import React from 'react';
import styled from 'styled-components';

const GridContainer = ({ children, view }) =>
    view === 'full' ? (
        <FullLayout>{children}</FullLayout>
    ) : (
        <ShortLayoout>{children}</ShortLayoout>
    );

const FullLayout = styled.section`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: 1fr;
    grid-auto-flow: dense;
    grid-gap: 1em;
    max-width: 1600px;
    margin: 0 auto;
    padding: 1em;

    @media (max-width: 900px) {
        grid-template-columns: repeat(6, 1fr);
    }

    @media (max-width: 720px) {
        display: block;
        padding: 0;
    }
`;

const ShortLayoout = styled.div`
    max-width: 600px;
    padding: 0 16px;
`;

export default GridContainer;
