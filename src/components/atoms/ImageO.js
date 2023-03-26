import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 300px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const ImageComponent = ({ src, alt, text }) => (
  <ImageWrapper>
    <GatsbyImage image={src} alt={alt} />
    <Overlay>
      <Text>{text}</Text>
    </Overlay>
  </ImageWrapper>
);
