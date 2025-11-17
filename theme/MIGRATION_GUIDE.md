# Theme Migration Guide

This guide shows you how to replace hardcoded hex colors with the new global theme classes.

## Quick Reference - Color Replacements

Use this table to find and replace colors across your project:

### Brand Colors
| Old (Hex) | New (Tailwind Class) | Usage |
|-----------|---------------------|--------|
| `#028678` | `brand-primary` | Text, backgrounds, borders, fills |
| `#00A896` | `brand-secondary` | Secondary brand color |
| `#05665B` | `brand-dark` | Dark brand color |
| `#F3F7F6` | `brand-light` | Light brand background |

### Text Colors
| Old (Hex) | New (Tailwind Class) | Usage |
|-----------|---------------------|--------|
| `#0E121B` | `text-primary` | Primary text |
| `#4B5563` | `text-secondary` | Secondary text |
| `#6B7280` | `text-tertiary` | Tertiary/muted text |
| `#9CA3AF` | `text-disabled` | Disabled text |

### Background Colors
| Old (Hex) | New (Tailwind Class) | Usage |
|-----------|---------------------|--------|
| `#FFFFFF` | `bg-white` | White backgrounds |
| `#F9FAFB` | `bg-light` | Light backgrounds |
| `#E5E7EB` | `bg-gray` | Gray backgrounds |

### Border Colors
| Old (Hex) | New (Tailwind Class) | Usage |
|-----------|---------------------|--------|
| `#E5E7EB` | `border-light` | Light borders |
| `#D1D5DB` | `border-medium` | Medium borders |
| `#9CA3AF` | `border-dark` | Dark borders |

### Status Colors
| Old (Hex) | New (Tailwind Class) | Usage |
|-----------|---------------------|--------|
| `#FB3748` | `status-error` | Error states |
| `#E93544` | `status-error` | Alternative error |
| `#009934` | `status-success` | Success states |
| `#F59E0B` | `status-warning` | Warning states |
| `#3B82F6` | `status-info` | Info states |

## Common Replacement Patterns

### Pattern 1: Background Colors
```tsx
// Before
className="bg-[#028678]"
className="bg-[#00A896]/10"
className="bg-[#F9FAFB]"

// After
className="bg-brand-primary"
className="bg-brand-secondary/10"
className="bg-bg-light"
```

### Pattern 2: Text Colors
```tsx
// Before
className="text-[#028678]"
className="text-[#4B5563]"
className="text-[#0E121B]"

// After
className="text-brand-primary"
className="text-text-secondary"
className="text-text-primary"
```

### Pattern 3: Border Colors
```tsx
// Before
className="border-[#E5E7EB]"
className="border-[#028678]"
className="hover:border-[#00A896]"

// After
className="border-border-light"
className="border-brand-primary"
className="hover:border-brand-secondary"
```

### Pattern 4: Fill Colors (for SVG/Icons)
```tsx
// Before
className="fill-[#028678]"
className="fill-[#6B7280]"

// After
className="fill-brand-primary"
className="fill-text-tertiary"
```

### Pattern 5: Gradients
```tsx
// Before
className="bg-gradient-to-r from-[#028678] to-[#00A896]"
className="from-[#F9FAFB] via-white to-[#F3F7F6]"

// After
className="bg-gradient-to-r from-brand-primary to-brand-secondary"
className="from-bg-light via-white to-brand-light"
```

### Pattern 6: Hover States
```tsx
// Before
className="hover:bg-[#028678] hover:text-white"
className="hover:border-[#00A896]"

// After
className="hover:bg-brand-primary hover:text-white"
className="hover:border-brand-secondary"
```

## Find & Replace Commands

You can use these commands to bulk replace colors in your project:

### For VS Code:
1. Open Find & Replace (Ctrl/Cmd + Shift + F)
2. Enable regex mode
3. Use these patterns:

```
Find: #028678
Replace: brand-primary

Find: #00A896
Replace: brand-secondary

Find: #0E121B
Replace: text-primary

Find: #4B5563
Replace: text-secondary

Find: #6B7280
Replace: text-tertiary

Find: #E5E7EB
Replace: border-light

Find: #F9FAFB
Replace: bg-light

Find: #FB3748
Replace: status-error
```

**Important:** When replacing, you need to replace the ENTIRE className attribute appropriately:
- `text-[#028678]` → `text-brand-primary`
- `bg-[#028678]` → `bg-brand-primary`
- `border-[#028678]` → `border-brand-primary`
- `fill-[#028678]` → `fill-brand-primary`

## Files Already Migrated

✅ [components/Sidebar/index.tsx](../components/Sidebar/index.tsx) - Updated New Chat button colors
✅ [components/Navbar/index.tsx](../components/Navbar/index.tsx) - Fully migrated
✅ [app/globals.css](../app/globals.css) - Theme variables added

## Files Still Needing Migration

The following files contain hardcoded colors:

- [ ] components/Footer/index.tsx
- [ ] components/Header/index.tsx
- [ ] components/Searchbox/index.tsx
- [ ] components/Question/index.tsx
- [ ] components/QuestionForm/index.tsx
- [ ] components/PolicyDetails/index.tsx
- [ ] components/PolicyOptions/index.tsx
- [ ] components/Contact/ContactForm.tsx
- [ ] components/Answer/index.tsx
- [ ] components/Career/JobsSection.tsx
- [ ] components/PdfViewer/index.tsx
- [ ] components/PanelMessage/index.tsx
- [ ] app/profile/page.tsx
- [ ] templates/WriteCopyPage/index.tsx
- [ ] And many more...

## Step-by-Step Migration Process

### For Each Component:

1. **Open the file**
2. **Find hardcoded colors** - Look for patterns like `[#028678]`, `[#00A896]`, etc.
3. **Replace based on context:**
   - If it's for text: use `text-*`
   - If it's for background: use `bg-*`
   - If it's for border: use `border-*`
   - If it's for fill (SVG): use `fill-*`
4. **Test the component** - Ensure no visual changes
5. **Commit the changes**

### Example Migration:

**Before:**
```tsx
<button className="bg-[#028678] text-white border-[#E5E7EB] hover:bg-[#00A896]">
  Click me
</button>
```

**After:**
```tsx
<button className="bg-brand-primary text-white border-border-light hover:bg-brand-secondary">
  Click me
</button>
```

## Automated Migration Script

You can create a Node.js script to automate this:

```javascript
// migrate-colors.js
const fs = require('fs');
const path = require('path');

const replacements = [
  // Brand colors
  { pattern: /text-\[#028678\]/g, replacement: 'text-brand-primary' },
  { pattern: /bg-\[#028678\]/g, replacement: 'bg-brand-primary' },
  { pattern: /border-\[#028678\]/g, replacement: 'border-brand-primary' },
  { pattern: /fill-\[#028678\]/g, replacement: 'fill-brand-primary' },

  { pattern: /text-\[#00A896\]/g, replacement: 'text-brand-secondary' },
  { pattern: /bg-\[#00A896\]/g, replacement: 'bg-brand-secondary' },
  { pattern: /border-\[#00A896\]/g, replacement: 'border-brand-secondary' },

  // Text colors
  { pattern: /text-\[#0E121B\]/g, replacement: 'text-text-primary' },
  { pattern: /text-\[#4B5563\]/g, replacement: 'text-text-secondary' },
  { pattern: /text-\[#6B7280\]/g, replacement: 'text-text-tertiary' },

  // Borders
  { pattern: /border-\[#E5E7EB\]/g, replacement: 'border-border-light' },

  // Backgrounds
  { pattern: /bg-\[#F9FAFB\]/g, replacement: 'bg-bg-light' },

  // Gradients
  { pattern: /from-\[#028678\]/g, replacement: 'from-brand-primary' },
  { pattern: /to-\[#028678\]/g, replacement: 'to-brand-primary' },
  { pattern: /via-\[#028678\]/g, replacement: 'via-brand-primary' },

  { pattern: /from-\[#00A896\]/g, replacement: 'from-brand-secondary' },
  { pattern: /to-\[#00A896\]/g, replacement: 'to-brand-secondary' },
  { pattern: /via-\[#00A896\]/g, replacement: 'via-brand-secondary' },

  { pattern: /from-\[#F9FAFB\]/g, replacement: 'from-bg-light' },
  { pattern: /to-\[#F9FAFB\]/g, replacement: 'to-bg-light' },
];

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  replacements.forEach(({ pattern, replacement }) => {
    if (pattern.test(content)) {
      content = content.replace(pattern, replacement);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Migrated: ${filePath}`);
  }
}

// Run on all component files
// Add your file paths here or use a glob pattern
```

## Testing After Migration

1. **Visual Regression Testing**
   - Take screenshots before migration
   - Compare with screenshots after migration
   - Ensure no visual differences

2. **Component Testing**
   - Check all interactive states (hover, active, focus)
   - Verify dark mode still works
   - Test responsive breakpoints

3. **Browser Testing**
   - Test in Chrome, Firefox, Safari
   - Test mobile devices
   - Verify Tailwind classes are applied correctly

## Troubleshooting

### Issue: Colors not showing
**Solution:** Ensure Tailwind is processing the new CSS variables in globals.css

### Issue: Build errors
**Solution:** Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

### Issue: Some colors look different
**Solution:** Double-check that you're using the correct context (text-, bg-, border-, fill-)

## Benefits of Migration

✅ **Centralized color management** - Change brand colors in one place
✅ **Type-safe** - Autocomplete for color classes
✅ **Smaller bundle** - Tailwind purges unused classes
✅ **Consistent** - All components use the same color palette
✅ **Maintainable** - Easy to update colors across the entire app
✅ **Dark mode ready** - Theme system already supports it

## Next Steps

1. Complete migration of remaining files
2. Remove hardcoded hex values from codebase
3. Use pre-defined styles from [theme/classNames.ts](./classNames.ts) where applicable
4. Update documentation with examples
5. Train team on using the new theme system

---

Need help? Check [README.md](./README.md) for full documentation or [EXAMPLES.md](./EXAMPLES.md) for practical examples!
