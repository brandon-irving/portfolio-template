const { createFolderAndFile } = require('./helpers').modules;
const { featured } = require('../config');

// CONFIG: FEATURED
const featureConfigToMdString = ({
  date,
  title,
  cover,
  github,
  external,
  tech,
  description,
  miniTitle,
  cta,
}) => `---
date: '${date}'
title: '${title}'
miniTitle: '${miniTitle}'
cover: '../../../src/images/${cover}'
github: '${github}'
external: '${external}'
cta: '${cta ? `${cta}` : ''}'
tech: \n${tech.map(t => `- ${t}`).join('\n')}
---

${description}
`;

const FEATURED = featured.dictionary;
exports.featuredGenerator = () =>
  Object.keys(FEATURED).forEach(folderName => {
    const job = FEATURED[folderName];
    const root = `content/featured`;
    const directory = `${root}/${folderName}`;
    const filePath = `${root}/${folderName}/index.md`;
    createFolderAndFile(directory, filePath, featureConfigToMdString(job));
  });
