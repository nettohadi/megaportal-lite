import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const BoxCircleStyled = styled(Box)`
    position: absolute;
    left: 3%;
    top: 30%;
    background: #000;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #fff;
    line-height: 37px;
    font-weight: 500;
    ::before {
        content: '';
        border: 1px solid black;
        /* height: 100px; */
        position: absolute;
        top: -87%;
        height: 87%;
        left: 47%;
    }
    ::after {
        content: '';
        border: 1px solid black;
        /* height: 100px; */
        position: absolute;
        bottom: -85%;
        height: 85%;
        left: 47%;
    }
`;
