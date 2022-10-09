import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-Color: #fff;
`;

export const LegendArea = styled.View `
    flex-direction: row;
    padding-left: 10px;
`;
export const LegendSubArea = styled.View `
    flex: 1;
    flex-direction: row;
`;

export const FloatLegend = styled.View `    
    position: absolute;
    width:100%;
    bottom:0px;
    background: rgba(255, 255, 255, 0.8);
`;

// Color boxes

export const LegendBoxColor01 = styled.View `
    height: 15px;
    width: 15px;
    background: gold;
    border-radius: 10px;
    margin: 5px;
`;

export const LegendBoxColor02 = styled.View `
    height: 15px;
    width: 15px;
    background: deepskyblue;
    border-radius: 10px;
    margin: 5px;
`;

export const LegendBoxColor03 = styled.View `
    height: 15px;
    width: 15px;
    background: mediumseagreen;
    border-radius: 10px;
    margin: 5px;
`;

export const LegendBoxColor04 = styled.View `
    height: 15px;
    width: 15px;
    background: red;
    border-radius: 10px;
    margin: 5px;
`;

export const LegendBoxColor05 = styled.View `
    height: 15px;
    width: 15px;
    background: indigo;
    border-radius: 10px;
    margin: 5px;
`;

export const LegendBoxColor06 = styled.View `
    height: 15px;
    width: 15px;
    background: orange;
    border-radius: 10px;
    margin: 5px;
    margin-bottom: 20px;
`;

export const LegendBoxColor07 = styled.View `
    height: 15px;
    width: 15px;
    background: hotpink;
    radius: 10px;
    margin: 5px;
`;