import React from 'react';
import styled from 'styled-components';

const Title = ({ view, title, column }) =>
    view === 'full' ? (
        <Container view={view}>
            <BaseTitle>{column.title}</BaseTitle>
        </Container>
    ) : (
        <Container>
            <LinkTitle href={column.url} target="blank">
                {column.title}
            </LinkTitle>
        </Container>
    );

const BaseTitle = styled.h2`
    color: #fff;
    margin: 0;
    font-size: 22px;
`;

const LinkTitle = styled.a`
    color: #000;
    text-decoration: none;
    margin: 0;
    font-size: 22px;

    &:hover {
        text-decoration: underline;
    }
`;

const Container = styled.div`
    background-color: ${props => (props.view === 'full' ? '#000' : '#e6e6e6')};
    box-shadow: ${props =>
        props.view === 'full' ? '0px 3px 15px rgba(0, 0, 0, 0.2)' : 'none'};
    padding: 15px;
    font-size: 25px;
    flex: 1;
`;

export default Title;
