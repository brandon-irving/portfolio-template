const { jobGenerator } = require('./jobGenerator');
const { featuredGenerator } = require('./featuredGenerator');
const { projectsGenerator } = require('./projectsGenerator');
projectsGenerator();
featuredGenerator();
jobGenerator();
