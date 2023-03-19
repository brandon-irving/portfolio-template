const { createFolderAndFile } = require('./helpers').modules;

// CONFIG: JOBS
const MegaCoders = {
  date: '2017-12-21',
  title: 'Mega Coders Stuff!',
  cover: 'halcyon.png',
  github: 'https://github.com/bchiang7/halcyon-site',
  external: 'https://halcyon-theme.netlify.com/',
  tech: ['VS Code', 'Sublime Text', 'Atom', 'iTerm2', 'Hyper'],
  description: `A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=brittanychiang.halcyon-vscode), [Package Control](https://packagecontrol.io/packages/Halcyon%20Theme), [Atom Package Manager](https://atom.io/themes/halcyon-syntax), and [npm](https://www.npmjs.com/package/hyper-halcyon-theme).`,
};

const projectsConfigToMdString = ({ date, title, github, external, tech, description }) => `---
date: '${date}'
title: '${title}'
github: '${github}'
external: '${external}'
tech: \n${tech.map(t => `- ${t}`).join('\n')}
---

${description}
`;

const projects = {
  MegaCoders,
};

// const PROJECTS = projects.dictionary;
exports.projectsGenerator = () =>
  Object.keys(projects).forEach(folderName => {
    const job = projects[folderName];
    const root = `content/projects`;
    const directory = `${root}/${folderName}`;
    const filePath = `${root}/${folderName}/index.md`;
    createFolderAndFile(directory, filePath, projectsConfigToMdString(job));
  });
