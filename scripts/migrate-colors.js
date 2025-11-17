#!/usr/bin/env node

/**
 * Color Migration Script
 * Automatically replaces hardcoded hex colors with theme classes
 *
 * Usage: node scripts/migrate-colors.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color replacement mappings
const replacements = [
  // Brand Primary (#028678)
  { pattern: /text-\[#028678\]/g, replacement: 'text-brand-primary', description: 'Text brand primary' },
  { pattern: /bg-\[#028678\]/g, replacement: 'bg-brand-primary', description: 'Background brand primary' },
  { pattern: /border-\[#028678\]/g, replacement: 'border-brand-primary', description: 'Border brand primary' },
  { pattern: /fill-\[#028678\]/g, replacement: 'fill-brand-primary', description: 'Fill brand primary' },
  { pattern: /from-\[#028678\]/g, replacement: 'from-brand-primary', description: 'Gradient from brand primary' },
  { pattern: /to-\[#028678\]/g, replacement: 'to-brand-primary', description: 'Gradient to brand primary' },
  { pattern: /via-\[#028678\]/g, replacement: 'via-brand-primary', description: 'Gradient via brand primary' },

  // Brand Secondary (#00A896)
  { pattern: /text-\[#00A896\]/g, replacement: 'text-brand-secondary', description: 'Text brand secondary' },
  { pattern: /bg-\[#00A896\]/g, replacement: 'bg-brand-secondary', description: 'Background brand secondary' },
  { pattern: /border-\[#00A896\]/g, replacement: 'border-brand-secondary', description: 'Border brand secondary' },
  { pattern: /fill-\[#00A896\]/g, replacement: 'fill-brand-secondary', description: 'Fill brand secondary' },
  { pattern: /from-\[#00A896\]/g, replacement: 'from-brand-secondary', description: 'Gradient from brand secondary' },
  { pattern: /to-\[#00A896\]/g, replacement: 'to-brand-secondary', description: 'Gradient to brand secondary' },
  { pattern: /via-\[#00A896\]/g, replacement: 'via-brand-secondary', description: 'Gradient via brand secondary' },

  // Brand Dark (#05665B)
  { pattern: /text-\[#05665B\]/g, replacement: 'text-brand-dark', description: 'Text brand dark' },
  { pattern: /bg-\[#05665B\]/g, replacement: 'bg-brand-dark', description: 'Background brand dark' },
  { pattern: /border-\[#05665B\]/g, replacement: 'border-brand-dark', description: 'Border brand dark' },
  { pattern: /fill-\[#05665B\]/g, replacement: 'fill-brand-dark', description: 'Fill brand dark' },
  { pattern: /from-\[#05665B\]/g, replacement: 'from-brand-dark', description: 'Gradient from brand dark' },
  { pattern: /to-\[#05665B\]/g, replacement: 'to-brand-dark', description: 'Gradient to brand dark' },
  { pattern: /via-\[#05665B\]/g, replacement: 'via-brand-dark', description: 'Gradient via brand dark' },

  // Brand Light (#F3F7F6)
  { pattern: /bg-\[#F3F7F6\]/g, replacement: 'bg-brand-light', description: 'Background brand light' },
  { pattern: /from-\[#F3F7F6\]/g, replacement: 'from-brand-light', description: 'Gradient from brand light' },
  { pattern: /to-\[#F3F7F6\]/g, replacement: 'to-brand-light', description: 'Gradient to brand light' },
  { pattern: /via-\[#F3F7F6\]/g, replacement: 'via-brand-light', description: 'Gradient via brand light' },

  // Text Primary (#0E121B)
  { pattern: /text-\[#0E121B\]/g, replacement: 'text-text-primary', description: 'Text primary' },
  { pattern: /fill-\[#0E121B\]/g, replacement: 'fill-text-primary', description: 'Fill text primary' },

  // Text Secondary (#4B5563)
  { pattern: /text-\[#4B5563\]/g, replacement: 'text-text-secondary', description: 'Text secondary' },
  { pattern: /fill-\[#4B5563\]/g, replacement: 'fill-text-secondary', description: 'Fill text secondary' },

  // Text Tertiary (#6B7280)
  { pattern: /text-\[#6B7280\]/g, replacement: 'text-text-tertiary', description: 'Text tertiary' },
  { pattern: /fill-\[#6B7280\]/g, replacement: 'fill-text-tertiary', description: 'Fill text tertiary' },

  // Text Disabled (#9CA3AF)
  { pattern: /text-\[#9CA3AF\]/g, replacement: 'text-text-disabled', description: 'Text disabled' },
  { pattern: /fill-\[#9CA3AF\]/g, replacement: 'fill-text-disabled', description: 'Fill text disabled' },

  // Background Light (#F9FAFB)
  { pattern: /bg-\[#F9FAFB\]/g, replacement: 'bg-bg-light', description: 'Background light' },
  { pattern: /from-\[#F9FAFB\]/g, replacement: 'from-bg-light', description: 'Gradient from light' },
  { pattern: /to-\[#F9FAFB\]/g, replacement: 'to-bg-light', description: 'Gradient to light' },
  { pattern: /via-\[#F9FAFB\]/g, replacement: 'via-bg-light', description: 'Gradient via light' },

  // Background Gray (#E5E7EB)
  { pattern: /bg-\[#E5E7EB\]/g, replacement: 'bg-bg-gray', description: 'Background gray' },

  // Border Light (#E5E7EB)
  { pattern: /border-\[#E5E7EB\]/g, replacement: 'border-border-light', description: 'Border light' },

  // Border Medium (#D1D5DB)
  { pattern: /border-\[#D1D5DB\]/g, replacement: 'border-border-medium', description: 'Border medium' },

  // Border Dark (#9CA3AF)
  { pattern: /border-\[#9CA3AF\]/g, replacement: 'border-border-dark', description: 'Border dark' },

  // Status Error (#FB3748, #E93544)
  { pattern: /text-\[#FB3748\]/g, replacement: 'text-status-error', description: 'Text error' },
  { pattern: /bg-\[#FB3748\]/g, replacement: 'bg-status-error', description: 'Background error' },
  { pattern: /border-\[#FB3748\]/g, replacement: 'border-status-error', description: 'Border error' },
  { pattern: /text-\[#E93544\]/g, replacement: 'text-status-error', description: 'Text error alt' },
  { pattern: /bg-\[#E93544\]/g, replacement: 'bg-status-error', description: 'Background error alt' },

  // Status Success (#009934)
  { pattern: /text-\[#009934\]/g, replacement: 'text-status-success', description: 'Text success' },
  { pattern: /bg-\[#009934\]/g, replacement: 'bg-status-success', description: 'Background success' },
  { pattern: /border-\[#009934\]/g, replacement: 'border-status-success', description: 'Border success' },

  // Common hover state for brand dark (#02695D is close to #05665B)
  { pattern: /hover:bg-\[#02695D\]/g, replacement: 'hover:bg-brand-dark', description: 'Hover background brand dark' },
];

function migrateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    const changes = [];

    replacements.forEach(({ pattern, replacement, description }) => {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        content = content.replace(pattern, replacement);
        changes.push(`  - ${description}: ${matches.length} occurrence(s)`);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`\n✅ Migrated: ${filePath}`);
      changes.forEach(change => console.log(change));
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🚀 Starting color migration...\n');

  // Find all TypeScript and TypeScript React files
  const patterns = [
    'components/**/*.{ts,tsx}',
    'templates/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!node_modules/**',
    '!.next/**',
    '!theme/**', // Exclude theme folder
  ];

  let totalFiles = 0;
  let migratedFiles = 0;

  patterns.forEach(pattern => {
    const files = glob.sync(pattern, { cwd: process.cwd() });

    files.forEach(file => {
      totalFiles++;
      const fullPath = path.join(process.cwd(), file);
      if (migrateFile(fullPath)) {
        migratedFiles++;
      }
    });
  });

  console.log('\n' + '='.repeat(50));
  console.log(`\n✨ Migration complete!`);
  console.log(`   Total files scanned: ${totalFiles}`);
  console.log(`   Files migrated: ${migratedFiles}`);
  console.log(`   Files unchanged: ${totalFiles - migratedFiles}\n`);

  if (migratedFiles > 0) {
    console.log('⚠️  Please review the changes and test your application.');
    console.log('💡 Run your dev server and check for any visual differences.\n');
  }
}

// Run the migration
main();
