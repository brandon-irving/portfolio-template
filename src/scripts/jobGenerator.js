const { createFolderAndFile } = require('./helpers').modules;
const { jobs } = require('../config');

// CONFIG: JOBS
const jobConfigToMdString = ({
  date,
  title,
  company,
  location,
  range,
  url,
  responsibilities,
}) => `---
date: '${date}'
title: '${title}'
company: '${company}'
location: '${location}'
range: '${range}'
url: '${url}'
---

${responsibilities.map(responsibility => `- ${responsibility}`).join('\n')}
`;
const JOBS = jobs.dictionary;
exports.jobGenerator = () =>
  Object.keys(JOBS).forEach(folderName => {
    const job = JOBS[folderName];
    const root = `content/jobs`;
    const directory = `${root}/${folderName}`;
    const filePath = `${root}/${folderName}/index.md`;
    createFolderAndFile(directory, filePath, jobConfigToMdString(job));
  });
