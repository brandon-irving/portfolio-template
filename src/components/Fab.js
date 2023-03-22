import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import UpArrow from './icons/upArrow';
import { navigate } from 'gatsby';

function useScrollDetector() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId;

    function handleScroll() {
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return isScrolling;
}

const StyledHeader = styled.div`
  position: fixed;
  bottom: 5%;
  right: 7%;

  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${props =>
    props.isShow &&
    css`
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    `}
  &:hover {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green);
      width: 62px;
      height: 62px;

      &:hover,
      &:focus {
        svg {
          fill: var(--green-tint);
        }
      }

      svg {
        fill: none;
        transition: var(--transition);
        user-select: none;
      }
    }
  }
`;
const Fab = () => {
  const isShow = useScrollDetector();
  const goToTop = () => {
    navigate('/#');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <StyledHeader isShow={isShow}>
      <div role="link" onClick={goToTop} onKeyDown={goToTop} className="logo" tabIndex="-1">
        <a href="/#" aria-label="home">
          <UpArrow />
        </a>
      </div>
    </StyledHeader>
  );
};

export default Fab;
