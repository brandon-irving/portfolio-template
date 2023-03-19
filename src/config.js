const hero = require('./buildConfig/sections/hero');
const about = require('./buildConfig/sections/about');
const jobs = require('./buildConfig/sections/jobs');
const featured = require('./buildConfig/sections/featured');
const projects = require('./buildConfig/sections/projects');

const email = require('./buildConfig/core/email');
const socialMedia = require('./buildConfig/core/socialMedia');
const navLinks = require('./buildConfig/core/navLinks');

const CONTENT_LOAD_DELAY = 50; // in ms

module.exports = {
  email,
  socialMedia,
  navLinks,
  hero,
  about,
  jobs,
  featured,
  projects,
  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = CONTENT_LOAD_DELAY, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
