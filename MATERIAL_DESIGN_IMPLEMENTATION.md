# Material Design 3 Implementation - Meeting Room Booking System

This document describes the Material Design 3 (Material You) implementation for the Meeting Room Booking System frontend.

## Overview

The frontend has been refactored to use Modern Material Design 3 with SaaS Web App style, inspired by:
- z.ai
- taiga.io
- linear.app
- Vercel Dashboard
- Google Material You

## Design System Implementation

### 1. Material Design 3 Tokens

**Location:** `app/globals.css`

Implemented comprehensive Material Design 3 color tokens including:

#### Color System
- **Primary Colors**: Primary, On Primary, Primary Container, On Primary Container
- **Secondary Colors**: Secondary, On Secondary, Secondary Container, On Secondary Container
- **Tertiary Colors**: Tertiary, On Tertiary, Tertiary Container, On Tertiary Container
- **Error Colors**: Error, On Error, Error Container, On Error Container
- **Surface Colors**: Background, On Background, Surface, On Surface, Surface Variant, Surface Container (Low, High, Highest)
- **Outline Colors**: Outline, Outline Variant
- **Inverse Colors**: Inverse Surface, Inverse On Surface, Inverse Primary

#### Elevation System
- 5 elevation levels (1-5) with proper shadow values
- Applied to cards, buttons, and interactive elements

#### Border Radius
- None: 0px
- Extra Small: 4px
- Small: 8px
- Medium: 12px
- Large: 16px
- Extra Large: 24px
- Full: 9999px

#### Typography Scale
- Display: Large (57px), Medium (45px), Small (36px)
- Headline: Large (32px), Medium (28px), Small (24px)
- Title: Large (22px), Medium (16px), Small (14px)
- Label: Large (14px), Medium (12px), Small (11px)
- Body: Large (16px), Medium (14px), Small (12px)

#### Motion System
- Duration: Short1 (50ms), Short2 (100ms), Medium1 (200ms), Medium2 (250ms), Long1 (300ms), Long2 (350ms), Extra Long1 (400ms), Extra Long2 (500ms)
- Easing: Linear, Standard, Emphasized, Emphasized Decelerate, Emphasized Accelerate, Legacy

#### State Layers
- Hover: 8% opacity
- Focus: 12% opacity
- Pressed: 12% opacity

### 2. Theme Support

**Location:** `app/globals.css`

- Light mode (default)
- Dark mode with adjusted color tokens
- Auto system theme detection (via `next-themes`)

### 3. Utility Classes

#### Glassmorphism
```css
.glass
```
Applies glass effect with blur and border.

#### Elevation
```css
.elevation-1 through .elevation-5
```
Applies Material Design elevation shadows.

#### State Layers
```css
.state-hover, .state-focus, .state-pressed
```
Applies state layer overlays for interactive elements.

#### Ripple Effect
```css
.ripple
```
Applies Material Design ripple animation on click.

## Material Components

### MCard
**Location:** `components/material/m-card.tsx`

Material Design card with variants:
- `elevated` (default): Card with elevation shadow
- `filled`: Filled background card
- `outlined`: Outlined card with border

**Props:**
- `variant`: 'elevated' | 'filled' | 'outlined'
- `elevation`: 1 | 2 | 3 | 4 | 5
- `hover`: Enable hover elevation effect

**Usage:**
```tsx
import { MCard, MCardHeader, MCardTitle, MCardContent } from '@/components/material/m-card'

<MCard variant="elevated" hover>
  <MCardHeader>
    <MCardTitle>Card Title</MCardTitle>
  </MCardHeader>
  <MCardContent>
    Card content here
  </MCardContent>
</MCard>
```

### MButton
**Location:** `components/material/m-button.tsx`

Material Design button with variants:
- `filled` (default): Filled primary button
- `filledTonal`: Filled tonal button
- `outlined`: Outlined button
- `text`: Text button
- `elevated`: Elevated button
- `tonal`: Tonal button

**Props:**
- `variant`: Button variant
- `size`: 'sm' | 'default' | 'lg' | 'icon'
- `loading`: Show loading spinner
- `ripple`: Enable ripple effect (default: true)

**Usage:**
```tsx
import { MButton } from '@/components/material/m-button'

<MButton variant="filled" loading={isLoading}>
  Submit
</MButton>

<MButton variant="outlined" size="sm">
  Cancel
</MButton>
```

### MBadge
**Location:** `components/material/m-badge.tsx`

Material Design badge with variants:
- `primary` (default): Primary color badge
- `secondary`: Secondary color badge
- `tertiary`: Tertiary color badge
- `success`: Success color badge
- `warning`: Warning color badge
- `error`: Error color badge
- `outline`: Outlined badge
- `surface`: Surface color badge

**Props:**
- `variant`: Badge variant
- `size`: 'sm' | 'default' | 'lg'
- `icon`: Optional icon
- `dot`: Show dot indicator

**Usage:**
```tsx
import { MBadge } from '@/components/material/m-badge'

<MBadge variant="primary" size="sm">
  New
</MBadge>

<MBadge variant="success" dot>
  Active
</MBadge>
```

### MTable
**Location:** `components/material/m-table.tsx`

Material Design data table with variants:
- `elevated` (default): Table with elevation
- `outlined`: Outlined table
- `plain`: Plain table without border

**Components:**
- `MTable`: Main table component
- `MTableHeader`: Table header with sticky support
- `MTableBody`: Table body
- `MTableFooter`: Table footer
- `MTableRow`: Table row with hover effect
- `MTableHead`: Table header cell
- `MTableCell`: Table data cell
- `MTableCaption`: Table caption

**Usage:**
```tsx
import { MTable, MTableHeader, MTableBody, MTableRow, MTableHead, MTableCell } from '@/components/material/m-table'

<MTable variant="elevated" stickyHeader>
  <MTableHeader>
    <MTableRow>
      <MTableHead>Name</MTableHead>
      <MTableHead>Status</MTableHead>
    </MTableRow>
  </MTableHeader>
  <MTableBody>
    <MTableRow>
      <MTableCell>Item 1</MTableCell>
      <MTableCell>Active</MTableCell>
    </MTableRow>
  </MTableBody>
</MTable>
```

### MModal
**Location:** `components/material/m-modal.tsx`

Material Design modal with smooth animations.

**Props:**
- `open`: Modal open state
- `onOpenChange`: Callback to change open state
- `title`: Modal title
- `description`: Modal description
- `showCloseButton`: Show close button (default: true)

**Usage:**
```tsx
import { MModal, MModalFooter } from '@/components/material/m-modal'

<MModal open={isOpen} onOpenChange={setIsOpen} title="Confirm Action">
  <p>Are you sure you want to proceed?</p>
  <MModalFooter>
    <MButton variant="text" onClick={() => setIsOpen(false)}>
      Cancel
    </MButton>
    <MButton variant="filled" onClick={handleConfirm}>
      Confirm
    </MButton>
  </MModalFooter>
</MModal>
```

### MBottomSheet
**Location:** `components/material/m-bottom-sheet.tsx`

Material Design bottom sheet for mobile with slide-up animation.

**Props:**
- `open`: Bottom sheet open state
- `onOpenChange`: Callback to change open state
- `title`: Bottom sheet title
- `description`: Bottom sheet description
- `showCloseButton`: Show close button (default: true)

**Usage:**
```tsx
import { MBottomSheet, MBottomSheetFooter } from '@/components/material/m-bottom-sheet'

<MBottomSheet open={isOpen} onOpenChange={setIsOpen} title="Details">
  <p>Bottom sheet content here</p>
  <MBottomSheetFooter>
    <MButton variant="outlined" onClick={() => setIsOpen(false)}>
      Close
    </MButton>
  </MBottomSheetFooter>
</MBottomSheet>
```

### MStepper
**Location:** `components/material/m-stepper.tsx`

Material Design stepper with horizontal/vertical orientation.

**Props:**
- `steps`: Array of step objects
- `currentStep`: Current active step index
- `onStepClick`: Callback when step is clicked
- `orientation`: 'horizontal' | 'vertical'
- `size`: 'sm' | 'md' | 'lg'

**Usage:**
```tsx
import { MStepper, MStepContent, type Step } from '@/components/material/m-stepper'

const steps: Step[] = [
  { id: '1', label: 'Step 1', description: 'First step' },
  { id: '2', label: 'Step 2', description: 'Second step' },
  { id: '3', label: 'Step 3', description: 'Third step' },
]

<MStepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep}>
  <MStepContent step={0} currentStep={currentStep}>
    Step 1 content
  </MStepContent>
  <MStepContent step={1} currentStep={currentStep}>
    Step 2 content
  </MStepContent>
  <MStepContent step={2} currentStep={currentStep}>
    Step 3 content
  </MStepContent>
</MStepper>
```

## Animation Components

**Location:** `components/material/page-transition.tsx`

### PageTransition
Smooth page transition animation.

```tsx
import { PageTransition } from '@/components/material/page-transition'

<PageTransition>
  <YourPageContent />
</PageTransition>
```

### ListEnterAnimation
Staggered list enter animation.

```tsx
import { ListEnterAnimation, ListItem } from '@/components/material/page-transition'

<ListEnterAnimation staggerDelay={0.05}>
  {items.map((item, index) => (
    <ListItem key={item.id} index={index}>
      {item.content}
    </ListItem>
  ))}
</ListEnterAnimation>
```

### FadeIn
Fade in animation with direction support.

```tsx
import { FadeIn } from '@/components/material/page-transition'

<FadeIn direction="up" delay={0.2}>
  Content here
</FadeIn>
```

### ScaleIn
Scale in animation.

```tsx
import { ScaleIn } from '@/components/material/page-transition'

<ScaleIn delay={0.1}>
  Content here
</ScaleIn>
```

### SlideIn
Slide in animation with direction support.

```tsx
import { SlideIn } from '@/components/material/page-transition'

<SlideIn direction="left" delay={0.1}>
  Content here
</SlideIn>
```

## App Shell Layout

**Location:** `components/layout/app-shell.tsx`

Modern app shell with:
- **Desktop**: Floating sidebar with glassmorphism header
- **Mobile**: Bottom navigation bar + swipe drawer menu
- **Responsive**: Adaptive layout based on screen size

**Features:**
- Glassmorphism header with backdrop blur
- Floating sidebar with elevation
- Mobile bottom navigation
- User menu with dropdown
- Notification badge
- Theme toggle
- Smooth animations

**Usage:**
```tsx
import { AppShell } from '@/components/layout/app-shell'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
]

<AppShell
  navigation={navigation}
  userName={user?.name}
  userEmail={user?.email}
  userRole={user?.role}
  onLogout={logout}
>
  {children}
</AppShell>
```

## Refactored Pages

### Dashboard
**Location:** `app/dashboard/page.tsx`

Refactored with:
- Material Design cards with elevation
- Summary cards with hover effects
- Framer Motion animations
- Material badges for status
- Responsive grid layout

### Bookings List
**Location:** `app/dashboard/bookings/page.tsx`

Refactored with:
- Material Design table with sticky header
- Row hover effects
- Material buttons and badges
- Page transition animation
- Responsive filters

### Layouts
**Locations:** `app/dashboard/layout.tsx`, `app/admin/layout.tsx`

Updated to use AppShell component with Material Design navigation.

## Accessibility Features

### Implemented
- Focus ring styles (`*:focus-visible`)
- Skip link for keyboard navigation
- ARIA labels on interactive elements
- Reduced motion support (`@media (prefers-reduced-motion: reduce)`)
- Proper color contrast ratios (via Material Design tokens)
- Keyboard navigation support

### WCAG AA Compliance
- Color contrast ratios meet WCAG AA standards
- Focus indicators are clearly visible
- Interactive elements have proper labels
- Screen reader friendly structure

## Responsive Strategy

### Mobile-First Design
- Mobile bottom navigation for easy thumb access
- Swipe drawer menu for navigation
- Touch-friendly spacing (minimum 44px touch targets)
- Adaptive layout based on screen size

### Breakpoints
- Mobile: < 640px (sm)
- Tablet: 640px - 1024px (md, lg)
- Desktop: > 1024px (xl)

## Performance Optimizations

### Implemented
- CSS transitions for hardware acceleration
- Framer Motion for smooth animations
- Lazy loading support (via Next/Image)
- Component memoization (React.memo)
- Optimized re-renders

## Color Palette Reference

### Light Mode
- Primary: #329950 (Green)
- Secondary: #2B9A8B (Teal)
- Tertiary: #8B5CF6 (Purple)
- Error: #F44336 (Red)
- Background: #FFFFFF
- Surface: #FFFFFF

### Dark Mode
- Primary: #4DE0A6 (Light Green)
- Secondary: #4DD0C9 (Light Teal)
- Tertiary: #D0BCFF (Light Purple)
- Error: #F2B8B5 (Light Red)
- Background: #141414
- Surface: #1A1A1A

## Future Enhancements

### Recommended
1. **Booking Detail UI**: Add stepper and timeline for approval flow
2. **Forms**: Implement Material input style with floating labels
3. **Charts**: Add Material Design charts for analytics
4. **Skeleton Loading**: Implement shimmer effect for loading states
5. **Image Gallery**: Add hero cover room photo with slider
6. **Toast Notifications**: Material Design toast/snackbar
7. **Dialogs**: Material Design confirmation dialogs
8. **Chips**: Material Design filter chips
9. **Tabs**: Material Design tabs with underline indicator
10. **Progress Indicators**: Linear and circular progress

## Component Usage Examples

### Complete Dashboard Example
```tsx
'use client'

import { MCard, MCardHeader, MCardTitle, MCardContent } from '@/components/material/m-card'
import { MButton } from '@/components/material/m-button'
import { MBadge } from '@/components/material/m-badge'
import { PageTransition } from '@/components/material/page-transition'

export default function Dashboard() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-display-small font-semibold">
          Dashboard
        </h1>
        
        <div className="grid gap-4 md:grid-cols-3">
          <MCard variant="elevated" hover>
            <MCardHeader>
              <MCardTitle>Total Bookings</MCardTitle>
            </MCardHeader>
            <MCardContent>
              <div className="text-display-small font-semibold">
                42
              </div>
            </MCardContent>
          </MCard>
          
          <MCard variant="elevated" hover>
            <MCardHeader>
              <MCardTitle>Pending</MCardTitle>
            </MCardHeader>
            <MCardContent>
              <MBadge variant="warning" size="lg">
                5
              </MBadge>
            </MCardContent>
          </MCard>
        </div>
      </div>
    </PageTransition>
  )
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

### Required
- `framer-motion`: ^12.29.2
- `lucide-react`: ^0.563.0
- `next-themes`: ^0.4.6
- `tailwindcss`: ^4
- `@radix-ui/*`: Various UI primitives

### UI Components
- `@/components/material/*`: Custom Material Design components
- `@/components/ui/*`: Shadcn UI base components
- `@/components/layout/*`: Layout components

## Testing

### Manual Testing Checklist
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly
- [ ] Auto theme switching works
- [ ] Mobile bottom navigation works
- [ ] Desktop sidebar works
- [ ] Touch interactions work
- [ ] Keyboard navigation works
- [ ] Screen reader announces content
- [ ] Animations are smooth
- [ ] Reduced motion is respected

## Conclusion

The Material Design 3 implementation provides a modern, accessible, and consistent design system for the Meeting Room Booking System. The component library is extensible and can be easily customized for future features.

For questions or issues, refer to the component files in `components/material/` and the design tokens in `app/globals.css`.
