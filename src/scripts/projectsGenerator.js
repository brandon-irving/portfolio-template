const { createFile } = require('./helpers').modules;
const { projects } = require('../config');

// CONFIG
const projectsConfigToMdString = ({
  date,
  title,
  github,
  external,
  tech,
  description,
  ios,
  android,
  company,
}) => `---
date: '${date}'
title: '${title}'
github: '${github}'
external: '${external}'
ios: ${ios ? `'${ios}'` : '\'\''}
android: ${android ? `'${android}'` : '\'\''}
company: '${company}'
showInProjects: true
tech: \n${tech.map(t => `- ${t}`).join('\n')}
---

${description}
`;

const PROJECTS = projects.dictionary;
exports.projectsGenerator = () =>
  Object.keys(PROJECTS).forEach(fileName => {
    const project = PROJECTS[fileName];
    const root = `content/projects`;
    const filePath = `${root}/${fileName}.md`;
    createFile(filePath, projectsConfigToMdString(project));
  });
