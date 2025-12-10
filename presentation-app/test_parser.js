import fs from 'fs';
import path from 'path';

const flowchartsMd = fs.readFileSync('./src/data/TOOLS_FLOWCHARTS.md', 'utf-8');

const lines = flowchartsMd.split('\n');
const parsedSections = [];
let currentSection = null;
let captureMermaid = false;
let mermaidContent = '';

lines.forEach((line) => {
  if (line.startsWith('## ')) {
    if (currentSection) {
      parsedSections.push(currentSection);
    }
    currentSection = {
      title: line.replace('## ', '').trim(),
      content: [],
      mermaid: null,
    };
  } else if (line.startsWith('```mermaid')) {
    captureMermaid = true;
    mermaidContent = '';
  } else if (line.startsWith('```') && captureMermaid) {
    captureMermaid = false;
    if (currentSection) {
      currentSection.mermaid = mermaidContent.trim();
    }
  } else if (captureMermaid) {
    mermaidContent += line + '\n';
  } else if (currentSection && line.trim() !== '' && !line.startsWith('---')) {
    currentSection.content.push(line);
  }
});

if (currentSection) {
  parsedSections.push(currentSection);
}

const sections = parsedSections.filter(s => s.title !== 'Summary');

console.log(`Found ${sections.length} sections.`);
if (sections.length > 0) {
    console.log('First section title:', sections[0].title);
    console.log('First section mermaid length:', sections[0].mermaid ? sections[0].mermaid.length : 0);
    console.log('First section mermaid content:\n', sections[0].mermaid);
}
