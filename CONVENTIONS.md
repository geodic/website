# Tailwind Class Ordering Conventions

This document describes the granular ordering for Tailwind utility classes. Apply this sequence to all `class="…"` lists in Svelte, JS/TS, and Markdown files.

1. **Layout**

   - `container`, `box-border` / `box-content`

2. **Display**

   - `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`, `inline-grid`, `table`, `contents`, `hidden`

3. **Positioning & Stacking**

   - **Position**: `static`, `relative`, `absolute`, `fixed`, `sticky`
   - **Overflow**: `overflow-auto`, `overflow-hidden`, `overflow-x-*`, `overflow-y-*`, `overscroll-*`
   - **Z-Index**: `z-0`, `z-10`, …
   - **Inset Shorthand**: `inset`, `inset-x`, `inset-y`
   - **Top / Right / Bottom / Left**

4. **Flex & Grid**

   - **Flex Direction**: `flex-row`, `flex-col`
   - **Flex Wrap**: `flex-nowrap`, `flex-wrap`, `flex-wrap-reverse`
   - **Flex Grow / Shrink**: `flex-1`, `flex-auto`, `flex-initial`
   - **Justify Content**: `justify-start`, `justify-center`, `justify-end`, `justify-between`, `justify-around`, `justify-evenly`
   - **Align Items**: `items-start`, `items-center`, `items-end`, `items-baseline`, `items-stretch`
   - **Align Content / Self**: `content-start`, `content-center`, `self-start`, etc.
   - **Gap**: `gap`, `gap-x`, `gap-y`
   - **Grid Template**: `grid-cols-*`, `grid-rows-*`
   - **Place**: `place-items-*`, `place-content-*`, `place-self-*`

5. **Sizing**

   - **Width**: `w-*`, `min-w-*`, `max-w-*`
   - **Height**: `h-*`, `min-h-*`, `max-h-*`

6. **Spacing (Box Model)**

   - **Margin**: `m-*`, `mx-*`, `my-*`, `mt-*`, `mr-*`, `mb-*`, `ml-*`
   - **Padding**: `p-*`, `px-*`, `py-*`, `pt-*`, `pr-*`, `pb-*`, `pl-*`

7. **Typography**

   - **Font Family**: `font-sans`, `font-serif`, `font-mono`, `font-heading`, `font-info`, etc.
   - **Font Style / Weight**: `italic`, `not-italic`, `font-thin`, `font-bold`, …
   - **Font Size**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, …
   - **Line Height**: `leading-none`, `leading-tight`, `leading-snug`, `leading-normal`, `leading-relaxed`, `leading-loose`
   - **Letter Spacing**: `tracking-tighter`, `tracking-tight`, `tracking-normal`, `tracking-wide`, `tracking-wider`, `tracking-widest`
   - **Text Align**: `text-left`, `text-center`, `text-right`, `text-justify`
   - **Text Color / Opacity**: `text-*`, `text-opacity-*`

8. **Background**

   - **Background Color**: `bg-*`
   - **Position / Size / Repeat / Attachment / Origin**: `bg-center`, `bg-cover`, `bg-no-repeat`, `bg-fixed`, …

9. **Borders & Rings**

   - **Border Width**: `border`, `border-2`, …
   - **Border Style**: `border-solid`, `border-dashed`, `border-dotted`, `border-double`, …
   - **Border Color**: `border-*`
   - **Border Radius**: `rounded`, `rounded-sm`, `rounded-full`, …
   - **Divide Utilities**: `divide-x`, `divide-y`, `divide-color`, …
   - **Ring Utilities**: `ring`, `ring-offset`, `ring-color`, `ring-offset-color`

10. **Effects**

    - **Box Shadow**: `shadow`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, …
    - **Opacity**: `opacity-*`
    - **Mix Blend**: `mix-blend-*`
    - **Filter / Backdrop-Filter**: `filter`, `backdrop-filter`, `blur-*`, `brightness-*`, …

11. **Interactivity**

    - **Cursor**: `cursor-pointer`, `cursor-default`, `cursor-not-allowed`, …
    - **Pointer Events**: `pointer-events-none`, `pointer-events-auto`
    - **User Select**: `select-none`, `select-text`, …

12. **Transitions & Animation**

    - **Transition Property**: `transition`, `transition-colors`, `transition-opacity`, …
    - **Duration**: `duration-75`, `duration-150`, `duration-300`, …
    - **Timing Function**: `ease-linear`, `ease-in`, `ease-out`, `ease-in-out`, …
    - **Delay**: `delay-75`, `delay-150`, …
    - **Animate**: `animate-spin`, `animate-ping`, `animate-pulse`, …

13. **Accessibility**

    - **Screen Reader**: `sr-only`, `not-sr-only`
    - **ARIA Attributes**: `aria-*` (when inlined)

14. **Variants (apply last, in this order)**
    - **Responsive**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
    - **Dark Mode**: `dark:`
    - **State**: `hover:`, `focus:`, `active:`, `visited:`, `disabled:`, …

> **Tip:** Always group related utilities and follow: base → responsive → state → dark.
