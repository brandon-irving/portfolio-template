const { createFile } = require('./helpers').modules;

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

const projectsConfigToMdString = ({
  date,
  title,
  github,
  external,
  tech,
  description,
  company,
}) => `---
date: '${date}'
title: '${title}'
github: '${github}'
external: '${external}'
company: '${company}'
showInProjects: true
tech: \n${tech.map(t => `- ${t}`).join('\n')}
---

${description}
`;
// `---
// date: '2020-09-15'
// title: 'Michelle Wu for Boston Grassroots Toolkit'
// github: ''
// external: 'https://toolkit.michelleforboston.com/'
// tech:
//   - Gatsby
//   - Styled Components
// company: 'Upstatement'
// showInProjects: false
// ---`

const projects = {
  MegaCoders,
};

// const PROJECTS = projects.dictionary;
exports.projectsGenerator = () =>
  Object.keys(projects).forEach(fileName => {
    const project = projects[fileName];
    const root = `content/projects`;
    const filePath = `${root}/${fileName}.md`;
    createFile(filePath, projectsConfigToMdString(project));
  });
