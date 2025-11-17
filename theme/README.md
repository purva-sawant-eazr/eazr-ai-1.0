# Theme System Documentation

This folder contains a centralized theme system for the Eazr Web application. Use these files to maintain consistent colors and styling across all components.

## Overview

The theme system provides two ways to use common colors and styles:

1. **TypeScript/JavaScript constants** - Import color values in your components
2. **Tailwind CSS classes** - Use predefined Tailwind classes with common colors

## File Structure

```
theme/
├── colors.ts          # Color constants and utility functions
├── classNames.ts      # Reusable Tailwind className patterns
├── index.ts           # Main export file
└── README.md          # This file
```

---

## Usage Guide

### 1. Using Color Constants

Import colors in your TypeScript/React files:

```tsx
import { colors, brand, text } from '@/theme';

// Use in inline styles or with style prop
const MyComponent = () => (
  <div style={{ backgroundColor: colors.brand.primary }}>
    <p style={{ color: colors.text.primary }}>Hello</p>
  </div>
);

// Use with Tailwind bracket notation
const MyComponent2 = () => (
  <div className={`bg-[${colors.brand.primary}]`}>
    Content
  </div>
);
```

### 2. Using Tailwind Classes

The most common colors are available as Tailwind classes in [globals.css](../app/globals.css):

```tsx
// Brand colors
<button className="bg-brand-primary text-white">Click me</button>
<div className="text-brand-secondary">Secondary text</div>
<div className="border-brand-primary">Bordered</div>

// Text colors
<p className="text-text-primary">Primary text</p>
<p className="text-text-secondary">Secondary text</p>
<p className="text-text-tertiary">Tertiary text</p>

// Status colors
<span className="text-status-error">Error message</span>
<span className="text-status-success">Success message</span>
```

### 3. Using Pre-defined className Patterns

Import and use pre-defined className patterns for common UI elements:

```tsx
import { buttonStyles, cardStyles, theme } from '@/theme';

// Button with consistent styling
<button className={buttonStyles.primary}>
  Click me
</button>

// Card with hover effect
<div className={cardStyles.feature}>
  Feature content
</div>

// Or use the theme object
<button className={theme.button.secondary}>
  Secondary button
</button>
```

### 4. Combining Classes

Use the `cn` utility function to combine multiple classes:

```tsx
import { cn, buttonStyles } from '@/theme';

<button className={cn(buttonStyles.primary, "mt-4", isActive && "opacity-50")}>
  Combined styles
</button>
```

---

## Available Colors

### Brand Colors

| Color | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Primary | `#028678` | `brand-primary` | Main CTAs, text, borders |
| Secondary | `#00A896` | `brand-secondary` | Gradients, accents, hover states |
| Dark | `#05665B` | `brand-dark` | Deep backgrounds, dark gradients |
| Light | `#F3F7F6` | `brand-light` | Light backgrounds |

**Usage Examples:**
```tsx
// TypeScript
import { brand } from '@/theme';
const color = brand.primary; // "#028678"

// Tailwind
className="bg-brand-primary text-white"
className="border-brand-secondary hover:border-brand-dark"
className="bg-gradient-to-r from-brand-primary to-brand-secondary"
```

### Text Colors

| Color | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Primary | `#0E121B` | `text-primary` | Main text color |
| Secondary | `#4B5563` | `text-secondary` | Subtitles, secondary copy |
| Tertiary | `#6B7280` | `text-tertiary` | Muted text, placeholders |
| Disabled | `#9CA3AF` | `text-disabled` | Disabled states |

**Usage Examples:**
```tsx
// TypeScript
import { text } from '@/theme';
const color = text.primary; // "#0E121B"

// Tailwind
className="text-text-primary font-bold"
className="text-text-secondary text-sm"
```

### Background Colors

| Color | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| White | `#FFFFFF` | `bg-white` | Pure white backgrounds |
| Light | `#F9FAFB` | `bg-light` | Light section backgrounds |
| Gray | `#E5E7EB` | `bg-gray` | Gray backgrounds |

### Border Colors

| Color | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Light | `#E5E7EB` | `border-light` | Light borders, dividers |
| Medium | `#D1D5DB` | `border-medium` | Medium borders |
| Dark | `#9CA3AF` | `border-dark` | Dark borders |

### Status Colors

| Color | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Error | `#FB3748` | `status-error` | Errors, alerts, delete |
| Success | `#009934` | `status-success` | Success states, positive metrics |
| Warning | `#F59E0B` | `status-warning` | Warning states |
| Info | `#3B82F6` | `status-info` | Information states |

---

## Pre-defined Styles

### Button Styles

```tsx
import { buttonStyles } from '@/theme';

buttonStyles.primary         // Primary gradient CTA button
buttonStyles.secondary       // Secondary outline button
buttonStyles.primarySmall    // Small primary button
buttonStyles.icon           // Icon button with hover effect
buttonStyles.danger         // Danger/Delete button
```

**Example:**
```tsx
<button className={buttonStyles.primary}>
  Get Started
</button>

<button className={buttonStyles.secondary}>
  Learn More
</button>
```

### Card Styles

```tsx
import { cardStyles } from '@/theme';

cardStyles.feature      // Feature card with border and hover effect
cardStyles.simple       // Simple white card with shadow
cardStyles.modal        // Modal/Panel card
cardStyles.section      // Large section card
cardStyles.interactive  // Interactive card with hover
```

**Example:**
```tsx
<div className={cardStyles.feature}>
  <h3>Feature Title</h3>
  <p>Feature description</p>
</div>
```

### Badge Styles

```tsx
import { badgeStyles } from '@/theme';

badgeStyles.primary    // Primary brand badge
badgeStyles.small      // Small badge
badgeStyles.success    // Success badge
badgeStyles.error      // Error badge
```

### Input Styles

```tsx
import { inputStyles } from '@/theme';

inputStyles.text       // Standard text input
inputStyles.textarea   // Textarea
inputStyles.error      // Input with error state
inputStyles.select     // Select dropdown
```

### Text Styles

```tsx
import { textStyles } from '@/theme';

textStyles.hero         // Hero heading (responsive)
textStyles.heading      // Section heading
textStyles.subheading   // Subheading
textStyles.body         // Body text
textStyles.small        // Small text
textStyles.gradient     // Brand gradient text
textStyles.link         // Link text with hover
```

**Example:**
```tsx
<h1 className={textStyles.hero}>
  Welcome to Eazr
</h1>

<p className={textStyles.body}>
  This is body text with consistent styling.
</p>
```

### Layout Styles

```tsx
import { layoutStyles } from '@/theme';

layoutStyles.container      // Container with max width
layoutStyles.containerWide  // Wide container
layoutStyles.flexCenter     // Flex center
layoutStyles.flexBetween    // Flex space-between
layoutStyles.grid2          // 2-column grid (responsive)
layoutStyles.grid3          // 3-column grid (responsive)
layoutStyles.grid4          // 4-column grid (responsive)
```

---

## Gradients

Import gradient utilities:

```tsx
import { gradients } from '@/theme';

// Use in inline styles
<div style={{ background: gradients.brandPrimary }}>
  Content
</div>

// Or use Tailwind classes
<div className="bg-gradient-to-r from-brand-primary to-brand-secondary">
  Content
</div>
```

Available gradients:
- `gradients.brandPrimary` - Horizontal brand gradient
- `gradients.brandDark` - Dark brand gradient (3 colors)
- `gradients.lightBackground` - Light background gradient
- `gradients.brandText` - Text gradient

---

## Utility Functions

### Color Utilities

```tsx
import { colorUtils } from '@/theme';

// Convert hex to rgba with opacity
const color = colorUtils.hexToRgba('#028678', 0.5); // "rgba(2, 134, 120, 0.5)"

// Get brand color with opacity
const brandColor = colorUtils.brandWithOpacity(0.1); // "rgba(2, 134, 120, 0.1)"
```

### Class Name Combiner

```tsx
import { cn } from '@/theme';

// Combine multiple classes, filtering out falsy values
const className = cn(
  "base-class",
  isActive && "active-class",
  isDanger && "text-status-error",
  undefined,
  null,
  false
);
// Result: "base-class active-class text-status-error"
```

---

## Migration Examples

### Before (Hardcoded Colors)

```tsx
// Old way - hardcoded colors
<button className="bg-[#028678] text-white px-8 py-4 rounded-xl hover:shadow-xl">
  Click me
</button>

<div className="text-[#4B5563] border-[#E5E7EB]">
  Content
</div>
```

### After (Using Theme)

```tsx
// New way - using theme
import { buttonStyles } from '@/theme';

<button className={buttonStyles.primary}>
  Click me
</button>

<div className="text-text-secondary border-border-light">
  Content
</div>
```

### Complex Example

**Before:**
```tsx
<div className="bg-white rounded-2xl p-8 border-2 border-[#E5E7EB] hover:border-[#028678]/30 transition-all duration-300 shadow-lg hover:shadow-2xl">
  <span className="inline-flex items-center gap-2 bg-[#028678]/10 rounded-full px-5 py-2.5 border border-[#028678]/20 text-[#028678] text-sm">
    Badge
  </span>
  <p className="text-[#4B5563]">Description text</p>
</div>
```

**After:**
```tsx
import { cardStyles, badgeStyles } from '@/theme';

<div className={cardStyles.feature}>
  <span className={badgeStyles.primary}>
    Badge
  </span>
  <p className="text-text-secondary">Description text</p>
</div>
```

---

## Best Practices

1. **Always use theme colors** instead of hardcoding hex values
2. **Use pre-defined styles** for common patterns (buttons, cards, etc.)
3. **Use Tailwind classes** when available (`bg-brand-primary` instead of `bg-[#028678]`)
4. **Import only what you need** for better tree-shaking
5. **Use the `cn` utility** when combining multiple class names with conditions
6. **Don't modify globals.css directly** - use the theme files instead

---

## Extending the Theme

### Adding New Colors

1. Add color to [colors.ts](./colors.ts):
```tsx
export const colors = {
  // ... existing colors
  accent: {
    pink: '#FF1493',
    purple: '#9B59B6',
  }
}
```

2. Add to [globals.css](../app/globals.css) @theme block:
```css
@theme {
  --color-accent-pink: #FF1493;
  --color-accent-purple: #9B59B6;
}
```

3. Use in components:
```tsx
import { colors } from '@/theme';
className="bg-accent-pink"
```

### Adding New Styles

Add to [classNames.ts](./classNames.ts):
```tsx
export const myCustomStyles = {
  special: 'bg-brand-primary text-white rounded-full p-8 shadow-2xl',
} as const;
```

---

## TypeScript Support

All theme exports are fully typed with TypeScript:

```tsx
import type { colors, buttonStyles } from '@/theme';

// Type-safe color usage
const primaryColor: string = colors.brand.primary;

// Type-safe style usage
const buttonClass: string = buttonStyles.primary;
```

---

## Questions or Issues?

If you encounter any issues or have questions about the theme system, please:

1. Check this README first
2. Review the example files in [colors.ts](./colors.ts) and [classNames.ts](./classNames.ts)
3. Look at the existing implementation in [globals.css](../app/globals.css)
4. Reach out to the development team

---

## Summary

This theme system provides:
- Consistent colors across the entire application
- Reusable component styles
- Type-safe color and style constants
- Easy-to-use Tailwind classes
- Utility functions for color manipulation
- Better maintainability and DRY principles

Start using it today to make your code cleaner and more maintainable!
