const fs = require('fs');
const { jobGenerator } = require('./jobGenerator');
const { featuredGenerator } = require('./featuredGenerator');
const { projectsGenerator } = require('./projectsGenerator');
fs.rmSync('content', { recursive: true, force: true });

projectsGenerator();
featuredGenerator();
jobGenerator();
