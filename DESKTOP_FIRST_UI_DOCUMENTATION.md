# Desktop-First UI Documentation

## Overview

This document describes the Desktop-First Responsive Design implementation for the Meeting Room Booking System, featuring a modern SaaS UI style inspired by z.ai, taiga.io, linear.app, and Vercel dashboard.

## Design Philosophy

### Desktop-First Approach
- **Primary Target**: Desktop screens (1366px+)
- **Secondary Targets**: Full HD (1920px) and Ultrawide monitors
- **Fallback Strategy**: Progressive degradation for tablet and mobile

### Visual Style
- **Clean & Professional**: Minimal visual noise, focused on content
- **Premium Feel**: Subtle shadows, smooth animations, refined typography
- **Information-Dense**: Optimized for desktop productivity while maintaining readability

---

## Design System

### 1. Thin Border System

#### Border Widths
```css
--border-thin: 0.5px;
--border-hairline: 0.5px;
--border-light: 1px;
```

#### Border Colors (Light Mode)
```css
--border-subtle: rgba(0, 0, 0, 0.06);
--border-soft: rgba(0, 0, 0, 0.08);
--border-medium: rgba(0, 0, 0, 0.12);
--border-strong: rgba(0, 0, 0, 0.16);
```

#### Border Colors (Dark Mode)
```css
--border-subtle: rgba(255, 255, 255, 0.06);
--border-soft: rgba(255, 255, 255, 0.08);
--border-medium: rgba(255, 255, 255, 0.12);
--border-strong: rgba(255, 255, 255, 0.16);
```

#### Usage Guidelines
- **Avoid**: Thick borders (2px+)
- **Prefer**: 0.5px - 1px borders
- **Alternative**: Use shadows for separation instead of borders

### 2. Shadow Elevation System

#### Card Shadows
```css
--shadow-card-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-card-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-card-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
```

#### Sidebar Shadows
```css
--shadow-sidebar: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 12px 0 rgba(0, 0, 0, 0.08);
--shadow-sidebar-hover: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 8px 20px 0 rgba(0, 0, 0, 0.12);
```

#### Panel Shadows
```css
--shadow-panel: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 16px 0 rgba(0, 0, 0, 0.08);
--shadow-panel-hover: 0 0 0 1px rgba(0, 0, 0, 0.08), 0 12px 24px 0 rgba(0, 0, 0, 0.12);
```

#### Usage Guidelines
- **Cards**: Use `shadow-card` for base, `shadow-card-md` for hover
- **Sidebar**: Use `shadow-sidebar` with `hover:shadow-sidebar-hover`
- **Panels**: Use `shadow-panel` with `hover:shadow-panel-hover`
- **Headers**: Use `shadow-header` for sticky headers

### 3. Typography Scale (Desktop-First)

#### Headings
```css
--heading-xs: 1.125rem;   /* 18px */
--heading-sm: 1.25rem;    /* 20px */
--heading-md: 1.5rem;     /* 24px */
--heading-lg: 1.875rem;   /* 30px */
--heading-xl: 2.25rem;    /* 36px */
--heading-2xl: 2.625rem;  /* 42px */
--heading-3xl: 3rem;      /* 48px */
```

#### Body Text
```css
--body-xs: 0.75rem;  /* 12px - Dense for tables */
--body-sm: 0.875rem; /* 14px */
--body-md: 1rem;     /* 16px - Medium body for readability */
--body-lg: 1.125rem; /* 18px */
--body-xl: 1.25rem;  /* 20px */
```

#### Labels
```css
--label-xs: 0.6875rem; /* 11px */
--label-sm: 0.75rem;    /* 12px */
--label-md: 0.875rem;   /* 14px */
--label-lg: 1rem;       /* 16px */
```

#### Usage Guidelines
- **Dashboard Titles**: `heading-xl` (36px)
- **Card Titles**: `heading-lg` (30px)
- **Section Headers**: `heading-md` (24px)
- **Body Text**: `body-md` (16px) for optimal readability
- **Table Text**: `body-sm` (14px) for dense information
- **Labels**: `label-md` (14px) for form fields

### 4. Spacing System (Desktop)

#### Card Padding
```css
--spacing-card-padding-desktop: 1.5rem; /* 24px */
--spacing-card-padding-compact: 1.25rem; /* 20px */
```

#### Container Widths
```css
--container-content: 1440px;
--container-content-xl: 1600px;
--container-content-2xl: 1920px;
```

#### Usage Guidelines
- **Standard Cards**: `p-6` (24px)
- **Compact Cards**: `p-5` (20px)
- **Container**: `max-w-[1440px]` for optimal desktop width

---

## Layout System

### 12-Column Grid System

#### Desktop Layout
```tsx
<div className="grid grid-cols-12 gap-6">
  {/* 4 columns */}
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    {/* Content */}
  </div>
  
  {/* 8 columns */}
  <div className="col-span-12 lg:col-span-8">
    {/* Content */}
  </div>
</div>
```

#### Column Spans
| Span | Desktop | Tablet | Mobile |
|------|----------|---------|---------|
| 1 | col-span-1 | col-span-2 | col-span-4 |
| 2 | col-span-2 | col-span-4 | col-span-6 |
| 3 | col-span-3 | col-span-6 | col-span-12 |
| 4 | col-span-4 | col-span-6 | col-span-12 |
| 6 | col-span-6 | col-span-12 | col-span-12 |
| 8 | col-span-8 | col-span-12 | col-span-12 |
| 12 | col-span-12 | col-span-12 | col-span-12 |

---

## Components

### 1. CollapsibleSidebar

**Location**: `components/desktop/collapsible-sidebar.tsx`

**Features**:
- Fixed left sidebar (desktop)
- Collapsible width (expanded: 280px, compact: 72px)
- Icon + label navigation
- Shadow separation (no hard borders)
- Smooth collapse animation

**Props**:
```tsx
interface CollapsibleSidebarProps {
  navigation: NavItem[]
  userName?: string
  userEmail?: string
  userRole?: string
  onLogout: () => void
  logo?: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}
```

**Usage**:
```tsx
<CollapsibleSidebar
  navigation={navigation}
  userName="John Doe"
  userEmail="john@example.com"
  userRole="Admin"
  onLogout={handleLogout}
  defaultExpanded={true}
/>
```

### 2. DesktopTable

**Location**: `components/desktop/desktop-table.tsx`

**Features**:
- Thin row dividers (0.5px)
- Sticky header
- No horizontal overflow
- Row hover effect
- Alternating background rows
- Compact density mode

**Props**:
```tsx
interface DesktopTableProps {
  stickyHeader?: boolean
  compact?: boolean
  hoverable?: boolean
  striped?: boolean
}
```

**Usage**:
```tsx
<DesktopTable stickyHeader compact={false} hoverable={true} striped={true}>
  <DesktopTableHeader>
    <DesktopTableRow>
      <DesktopTableHead>Column 1</DesktopTableHead>
      <DesktopTableHead>Column 2</DesktopTableHead>
    </DesktopTableRow>
  </DesktopTableHeader>
  <DesktopTableBody>
    <DesktopTableRow index={0}>
      <DesktopTableCell>Data 1</DesktopTableCell>
      <DesktopTableCell>Data 2</DesktopTableCell>
    </DesktopTableRow>
  </DesktopTableBody>
</DesktopTable>
```

### 3. SidePanel

**Location**: `components/desktop/side-panel.tsx`

**Features**:
- Slide animation (right/left)
- Overlay with backdrop blur
- Collapsible sections
- Sticky positioning
- Multiple width options

**Props**:
```tsx
interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  actions?: React.ReactNode
  width?: 'sm' | 'md' | 'lg' | 'xl'
  position?: 'right' | 'left'
  overlay?: boolean
  showCloseButton?: boolean
}
```

**Usage**:
```tsx
<SidePanel
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Details"
  width="md"
  position="right"
>
  <SidePanelSection title="Section 1">
    <SidePanelItem label="Label" value="Value" />
  </SidePanelSection>
</SidePanel>
```

### 4. WideCard

**Location**: `components/desktop/wide-card.tsx`

**Features**:
- Shadow elevation system
- Hover lift effects
- Multiple variants (elevated, flat, outlined)
- Flexible padding options
- Grid layout support

**Props**:
```tsx
interface WideCardProps {
  variant?: 'elevated' | 'flat' | 'outlined'
  hover?: boolean
  hoverLift?: 'none' | 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}
```

**Usage**:
```tsx
<WideCard variant="elevated" hoverLift="sm" padding="md">
  <WideCardHeader title="Card Title" />
  <WideCardContent>
    {/* Content */}
  </WideCardContent>
  <WideCardFooter align="right">
    {/* Actions */}
  </WideCardFooter>
</WideCard>
```

### 5. StickyHeader

**Location**: `components/desktop/sticky-header.tsx`

**Features**:
- Sticky positioning
- Backdrop blur
- Breadcrumbs support
- Search integration
- Action buttons

**Props**:
```tsx
interface StickyHeaderProps {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  sticky?: boolean
  blur?: boolean
}
```

**Usage**:
```tsx
<StickyHeader
  title="Page Title"
  subtitle="Page description"
  actions={<Button>Action</Button>}
  sticky={true}
  blur={true}
>
  {/* Additional content */}
</StickyHeader>
```

### 6. MaterialInput

**Location**: `components/desktop/material-input.tsx`

**Features**:
- Material bottom border style
- Floating label animation
- Focus ring (ring-1 ring-primary/30)
- Error state
- Helper text support

**Props**:
```tsx
interface MaterialInputProps {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}
```

**Usage**:
```tsx
<MaterialInput
  label="Email"
  type="email"
  error={errors.email}
  helperText="Enter your email address"
  leftIcon={<Mail className="h-4 w-4" />}
/>
```

---

## Responsive Strategy

### Desktop (1366px+)
- Full 12-column grid
- Fixed sidebar (expanded/compact)
- Desktop table with sticky header
- Wide card layout
- Split view panels

### Tablet (768px - 1365px)
- Sidebar auto-collapses to compact
- Reduce grid columns (6-column max)
- Table maintains desktop style
- Cards maintain desktop padding

### Mobile (< 768px)
- Sidebar → Drawer (off-canvas)
- Table → Card list
- Single column layout
- Bottom action bar
- Compact spacing

---

## Dark Mode

### Border Handling
- **Low opacity borders**: `rgba(255, 255, 255, 0.06)`
- **Shadow adjustment**: Increased opacity for dark backgrounds
- **Focus ring**: `ring-white/10`

### Shadow Adjustment
```css
.dark {
  --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-panel: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 8px 16px 0 rgba(0, 0, 0, 0.4);
}
```

---

## Performance Optimization

### Desktop Optimizations
- **Virtualized table rows**: For large datasets
- **Lazy load gallery**: For image-heavy components
- **Dynamic imports**: For heavy components
- **CSS animations**: Over JavaScript animations

### Animation Guidelines
- **Duration**: 150ms - 300ms
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-saas)
- **Transform**: Use `transform` over `top/left`

---

## Interaction Design

### Hover Feedback
- **Cards**: Subtle lift (translateY -2px)
- **Buttons**: Background color shift
- **Table rows**: Background color change
- **Sidebar items**: Background highlight

### Focus States
- **Ring**: `ring-1 ring-primary/30`
- **Outline**: Remove default, use ring
- **Offset**: `ring-offset-0` for thin borders

### Keyboard Shortcuts
- **Ctrl+K**: Command palette (optional)
- **Esc**: Close panels/modals
- **Tab**: Logical focus order

---

## File Structure

```
components/
├── desktop/
│   ├── collapsible-sidebar.tsx
│   ├── desktop-table.tsx
│   ├── side-panel.tsx
│   ├── wide-card.tsx
│   ├── sticky-header.tsx
│   ├── material-input.tsx
│   └── index.ts
├── material/
│   ├── m-card.tsx (Updated with shadow system)
│   ├── m-button.tsx
│   ├── m-badge.tsx
│   └── ...
└── layout/
    └── app-shell.tsx (Updated with CollapsibleSidebar)
```

---

## Migration Guide

### Updating Existing Components

1. **Replace Borders with Shadows**:
   ```tsx
   // Before
   <div className="border-2 border-gray-300">
   
   // After
   <div className="shadow-card">
   ```

2. **Use 12-Column Grid**:
   ```tsx
   // Before
   <div className="grid grid-cols-3 gap-4">
   
   // After
   <div className="grid grid-cols-12 gap-6">
     <div className="col-span-12 lg:col-span-4">
   ```

3. **Apply Thin Borders**:
   ```tsx
   // Before
   <div className="border">
   
   // After
   <div className="border border-subtle-thin">
   ```

4. **Use Desktop Components**:
   ```tsx
   // Before
   import { Card } from '@/components/ui/card'
   
   // After
   import { WideCard } from '@/components/desktop'
   ```

---

## Best Practices

### DO
- ✅ Use shadows for separation
- ✅ Keep borders thin (0.5px - 1px)
- ✅ Optimize for desktop first
- ✅ Use 12-column grid
- ✅ Implement hover feedback
- ✅ Use focus rings
- ✅ Keep spacing consistent

### DON'T
- ❌ Use thick borders (2px+)
- ❌ Hard borders on sidebar
- ❌ Mobile-first thinking
- ❌ Ignore dark mode
- ❌ Skip hover states
- ❌ Use default outlines
- ❌ Inconsistent spacing

---

## References

- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `app/globals.css`
- **Desktop Components**: `components/desktop/`

---

## Version

- **Created**: 2026-02-01
- **Version**: 1.0.0
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
