This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Typography System

Eazr AI uses a standardized typography system based on industry best practices for consistent, accessible, and maintainable design.

### Design System Classes

All typography classes are defined in `app/globals.css` and follow semantic naming conventions.

#### Headings

Use for page titles, section headers, and content hierarchy:

| Class | Size | Weight | Use Case | Example |
|-------|------|--------|----------|---------|
| `text-h1` | 64px | 700 | Main page titles | Landing page hero |
| `text-h3` | 40px | 500 | Section headers | Feature sections |
| `text-h4` | 36px | 500 | Component titles | Card headers |
| `text-h5` | 28px | 700 | Subsection headers | Modal titles |
| `text-h6` | 20px | 500 | Small headers | Widget titles |

```tsx
<h1 className="text-h1">Welcome to Eazr AI</h1>
<h3 className="text-h3">Features</h3>
<h5 className="text-h5">Getting Started</h5>
```

#### Labels (UI Elements)

Use for buttons, form labels, navigation links, and interactive elements:

| Class | Size | Weight | Use Case | Example |
|-------|------|--------|----------|---------|
| `text-label-xl` | 24px | 500 | Prominent UI text | Modal headers |
| `text-label-lg` | 18px | 500 | Secondary headers | Panel titles |
| `text-label-md` | 16px | 500 | Form labels | Input labels |
| `text-label-sm` | 14px | 500 | **Primary UI text** | Buttons, nav links |
| `text-label-xs` | 12px | 500 | Metadata, captions | Timestamps, tags |

```tsx
<button className="text-label-sm">Sign In</button>
<label className="text-label-md">Email Address</label>
<span className="text-label-xs">2 min ago</span>
```

#### Paragraphs (Body Text)

Use for content, descriptions, and reading text:

| Class | Size | Weight | Use Case | Example |
|-------|------|--------|----------|---------|
| `text-p-xl` | 20px | 400 | Large body text | Hero descriptions |
| `text-p-lg` | 18px | 400 | Prominent content | Feature descriptions |
| `text-p-md` | 16px | 300 | Standard body | Article content |
| `text-p-sm` | 14px | 400 | Small body | Helper text |
| `text-p-xs` | 12px | 400 | Fine print | Legal text |

```tsx
<p className="text-p-md">This is the main content paragraph.</p>
<p className="text-p-sm">Additional helper information.</p>
```

#### Subtitles

Use for supplementary text and metadata:

| Class | Size | Weight | Use Case |
|-------|------|--------|----------|
| `text-sub-md` | 16px | 700 | Bold subtitles |
| `text-sub-sm` | 14px | 500 | Small subtitles |
| `text-sub-xs` | 12px | 500 | Tiny subtitles |
| `text-sub-2xs` | 11px | 500 | Micro text |

### Responsive Typography

Use responsive variants for mobile-friendly designs:

```tsx
{/* Desktop: h3 (40px), Mobile: h4 (36px) */}
<h2 className="text-h3 max-md:text-h4">
  Responsive Header
</h2>

{/* Desktop: label-xl (24px), Mobile: label-md (16px) */}
<div className="text-label-xl max-md:text-label-md">
  Responsive UI Text
</div>
```

### Best Practices

#### ✅ Do

- **Always use design system classes** for consistent typography
- **Use semantic class names** that describe purpose (label-sm for UI, p-md for body)
- **Combine with Tailwind utilities** for colors and other properties
- **Follow responsive patterns** using max-md/max-lg breakpoints

```tsx
// ✅ Good - Using design system
<button className="text-label-sm text-white bg-primary">
  Click Me
</button>

// ✅ Good - Responsive design
<h1 className="text-h1 max-md:text-h3">
  Hero Title
</h1>
```

#### ❌ Don't

- **Never use arbitrary font sizes** like `text-[15px]` or `text-[1.2rem]`
- **Avoid inline styles** for font sizing
- **Don't mix systems** - stick to the design system

```tsx
// ❌ Bad - Arbitrary size
<div className="text-[15px]">Text</div>

// ❌ Bad - Inline style
<p style={{ fontSize: '14px' }}>Text</p>

// ❌ Bad - Default Tailwind without design system
<span className="text-sm">Text</span>
```

### Quick Reference

**Most commonly used classes:**

- `text-label-sm` - Primary UI text (buttons, links, form fields)
- `text-label-md` - Form labels, secondary text
- `text-h3` - Section headers
- `text-h5` - Component titles
- `text-p-md` - Body content
- `text-label-xs` - Metadata, timestamps

### Accessibility

Our typography system follows WCAG 2.1 guidelines:

- ✅ Minimum 14px for UI elements
- ✅ Minimum 16px for body text
- ✅ Proper line-height for readability (1.4-1.6)
- ✅ Sufficient letter-spacing for clarity
- ✅ Clear visual hierarchy

### Need Help?

If you're unsure which class to use:

1. **UI elements** (buttons, nav, forms) → `text-label-*`
2. **Reading content** (paragraphs, descriptions) → `text-p-*`
3. **Headings** (titles, headers) → `text-h*`
4. **Metadata** (timestamps, captions) → `text-label-xs` or `text-sub-*`

For questions or suggestions about the typography system, please contact the design team.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
