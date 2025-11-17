#!/usr/bin/env node

/**
 * Simple Color Migration Script
 * Replaces hardcoded hex colors with theme classes
 */

const fs = require('fs');
const path = require('path');

// Color replacement mappings
const replacements = [
  // Brand Primary
  { from: 'text-[#028678]', to: 'text-brand-primary' },
  { from: 'bg-[#028678]', to: 'bg-brand-primary' },
  { from: 'border-[#028678]', to: 'border-brand-primary' },
  { from: 'fill-[#028678]', to: 'fill-brand-primary' },
  { from: 'from-[#028678]', to: 'from-brand-primary' },
  { from: 'to-[#028678]', to: 'to-brand-primary' },
  { from: 'via-[#028678]', to: 'via-brand-primary' },

  // Brand Secondary
  { from: 'text-[#00A896]', to: 'text-brand-secondary' },
  { from: 'bg-[#00A896]', to: 'bg-brand-secondary' },
  { from: 'border-[#00A896]', to: 'border-brand-secondary' },
  { from: 'fill-[#00A896]', to: 'fill-brand-secondary' },
  { from: 'from-[#00A896]', to: 'from-brand-secondary' },
  { from: 'to-[#00A896]', to: 'to-brand-secondary' },
  { from: 'via-[#00A896]', to: 'via-brand-secondary' },

  // Brand Dark
  { from: 'text-[#05665B]', to: 'text-brand-dark' },
  { from: 'bg-[#05665B]', to: 'bg-brand-dark' },
  { from: 'border-[#05665B]', to: 'border-brand-dark' },
  { from: 'from-[#05665B]', to: 'from-brand-dark' },
  { from: 'to-[#05665B]', to: 'to-brand-dark' },
  { from: 'via-[#05665B]', to: 'via-brand-dark' },
  { from: 'hover:bg-[#02695D]', to: 'hover:bg-brand-dark' },

  // Brand Light
  { from: 'bg-[#F3F7F6]', to: 'bg-brand-light' },
  { from: 'from-[#F3F7F6]', to: 'from-brand-light' },
  { from: 'to-[#F3F7F6]', to: 'to-brand-light' },
  { from: 'via-[#F3F7F6]', to: 'via-brand-light' },

  // Text Colors
  { from: 'text-[#0E121B]', to: 'text-text-primary' },
  { from: 'fill-[#0E121B]', to: 'fill-text-primary' },
  { from: 'text-[#4B5563]', to: 'text-text-secondary' },
  { from: 'fill-[#4B5563]', to: 'fill-text-secondary' },
  { from: 'text-[#6B7280]', to: 'text-text-tertiary' },
  { from: 'fill-[#6B7280]', to: 'fill-text-tertiary' },
  { from: 'text-[#9CA3AF]', to: 'text-text-disabled' },

  // Backgrounds
  { from: 'bg-[#F9FAFB]', to: 'bg-bg-light' },
  { from: 'from-[#F9FAFB]', to: 'from-bg-light' },
  { from: 'to-[#F9FAFB]', to: 'to-bg-light' },
  { from: 'via-[#F9FAFB]', to: 'via-bg-light' },
  { from: 'bg-[#E5E7EB]', to: 'bg-bg-gray' },

  // Borders
  { from: 'border-[#E5E7EB]', to: 'border-border-light' },
  { from: 'border-[#D1D5DB]', to: 'border-border-medium' },
  { from: 'border-[#9CA3AF]', to: 'border-border-dark' },

  // Status
  { from: 'text-[#FB3748]', to: 'text-status-error' },
  { from: 'bg-[#FB3748]', to: 'bg-status-error' },
  { from: 'border-[#FB3748]', to: 'border-status-error' },
  { from: 'text-[#E93544]', to: 'text-status-error' },
  { from: 'bg-[#E93544]', to: 'bg-status-error' },
  { from: 'text-[#009934]', to: 'text-status-success' },
  { from: 'bg-[#009934]', to: 'bg-status-success' },
];

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules, .next, theme folders
      if (!['node_modules', '.next', 'theme', '.git'].includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function migrateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    let changeCount = 0;

    replacements.forEach(({ from, to }) => {
      if (content.includes(from)) {
        const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = content.match(regex);
        if (matches) {
          content = content.replace(regex, to);
          changeCount += matches.length;
          changed = true;
        }
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${path.relative(process.cwd(), filePath)} (${changeCount} replacements)`);
      return 1;
    }
    return 0;
  } catch (error) {
    console.error(`❌ Error: ${filePath} - ${error.message}`);
    return 0;
  }
}

// Main execution
console.log('🚀 Starting color migration...\n');

const componentsDir = path.join(process.cwd(), 'components');
const templatesDir = path.join(process.cwd(), 'templates');
const appDir = path.join(process.cwd(), 'app');

let allFiles = [];

if (fs.existsSync(componentsDir)) allFiles = allFiles.concat(getAllFiles(componentsDir));
if (fs.existsSync(templatesDir)) allFiles = allFiles.concat(getAllFiles(templatesDir));
if (fs.existsSync(appDir)) allFiles = allFiles.concat(getAllFiles(appDir));

console.log(`Found ${allFiles.length} files to process\n`);

let migratedCount = 0;
allFiles.forEach(file => {
  migratedCount += migrateFile(file);
});

console.log('\n' + '='.repeat(60));
console.log(`\n✨ Migration complete!`);
console.log(`   Files scanned: ${allFiles.length}`);
console.log(`   Files updated: ${migratedCount}`);
console.log(`   Files unchanged: ${allFiles.length - migratedCount}\n`);
