import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig, projects as projectsConfig } from '@config';
import sr from '@utils/sr';
import { useIsMobile, usePrefersReducedMotion } from '@hooks';
import { ImageComponent } from '../atoms/ImageO';
import { getImage } from 'gatsby-plugin-image';

function sortGatsbyObjsByProjectOrder(gatsbyObjs, projectDict) {
  const list = Object.keys(projectDict).reduce(
    (prev, curr) => [...prev, projectDict[curr].title],
    [],
  );
  return gatsbyObjs.sort((a, b) => {
    const aIndex = list.indexOf(a.node.frontmatter.title);
    const bIndex = list.indexOf(b.node.frontmatter.title);
    return aIndex - bIndex;
  });
}

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              link
              image {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                }
              }
            }
            html
          }
        }
      }
    }
  `);
  const isMobile = useIsMobile();
  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { title, viewArchive, subtitle, dictionary } = projectsConfig;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = isMobile ? 3 : 6;
  const projectsBase = data.projects.edges.filter(({ node }) => node);
  const projects = sortGatsbyObjsByProjectOrder(projectsBase, dictionary);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  return (
    <StyledProjectsSection id="projects">
      <h2 ref={revealTitle}>{title.text}</h2>
      <h3 style={{ textAlign: 'center' }} ref={revealTitle}>
        {subtitle.text}
      </h3>

      {!!viewArchive && (
        <Link className="inline-link archive-link" to="/archive" ref={revealArchiveLink}>
          {viewArchive.text}
        </Link>
      )}

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map((_, i) => <StyledProject key={i}></StyledProject>)}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => {
                const image = getImage(node.frontmatter.image);
                return (
                  <CSSTransition
                    key={i}
                    classNames="fadeup"
                    timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                    exit={false}>
                    <StyledProject
                      key={i}
                      ref={el => (revealProjects.current[i] = el)}
                      style={{
                        transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                      }}>
                      <div className="project-inner">
                        <a href={node.frontmatter.link} target={'_blank'} rel="noreferrer">
                          <ImageComponent key={i} alt={node.frontmatter.title} src={image} />
                        </a>
                      </div>
                    </StyledProject>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        )}
      </ul>

      {projects.length > GRID_LIMIT && (
        <button className="more-button" onClick={() => setShowMore(!showMore)}>
          Show {showMore ? 'Less' : 'More'}
        </button>
      )}
    </StyledProjectsSection>
  );
};
export default Projects;
