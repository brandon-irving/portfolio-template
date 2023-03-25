import React from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  width: 1000px;
`;

const GridItem = styled.div`
  background-color: #eee;
  border-radius: 8px;
  padding: 16px;
`;

export const GridContainer = ({ children }) => (
  <GridWrapper>
    {React.Children.map(children, child => (
      <GridItem>{child}</GridItem>
    ))}
  </GridWrapper>
);
