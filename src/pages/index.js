import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Components from '@components';
import { order } from '../buildConfig/core/layout';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = ({ location }) => (
  <Components.Layout location={location}>
    <StyledMainContainer className="fillHeight">
      {order.map(key => {
        const Component = Components[key];
        return <Component key={key} />;
      })}
    </StyledMainContainer>
  </Components.Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
