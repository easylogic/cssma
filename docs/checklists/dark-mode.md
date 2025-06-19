# Dark Mode Implementation Checklist

## Overview
This checklist covers the complete implementation of Dark Mode features in Tailwind CSS v4.1, based on the official documentation from https://tailwindcss.com/docs/dark-mode.

## 📋 Implementation Progress: 0/65 items

---

## 1. Core Dark Mode Concepts
**Priority: High | Items: 8/8**

### 1.1 Basic Dark Variant Understanding
- [ ] **Dark Variant Syntax** - `dark:` prefix for dark mode styles
  ```html
  <div class="bg-white dark:bg-gray-800">Content</div>
  ```
  - **Test**: Apply `bg-white dark:bg-black` to element
  - **Success**: Element has white background in light mode, black in dark mode

- [ ] **Default Behavior** - Uses `prefers-color-scheme` media query by default
  ```css
  @media (prefers-color-scheme: dark) {
    .dark\:bg-gray-800 { background-color: rgb(31 41 55); }
  }
  ```
  - **Test**: Toggle system dark mode preference
  - **Success**: Styles change based on OS preference

- [ ] **Color Variations** - Dark variants for all color utilities
  ```html
  <div class="text-gray-900 dark:text-white">Text</div>
  <div class="bg-blue-500 dark:bg-blue-600">Background</div>
  ```
  - **Test**: Apply various color combinations with dark variants
  - **Success**: All color utilities work with dark: prefix

- [ ] **Background Colors** - Dark mode background variations
  ```html
  <div class="bg-white dark:bg-gray-900">
  <div class="bg-gray-100 dark:bg-gray-800">
  <div class="bg-blue-50 dark:bg-blue-900/20">
  ```
  - **Test**: Create cards with light/dark background pairs
  - **Success**: Appropriate contrast maintained in both modes

- [ ] **Text Colors** - Dark mode text color variations
  ```html
  <h1 class="text-gray-900 dark:text-white">Heading</h1>
  <p class="text-gray-600 dark:text-gray-300">Body text</p>
  <span class="text-gray-500 dark:text-gray-400">Muted text</span>
  ```
  - **Test**: Create typography hierarchy with dark variants
  - **Success**: Text remains readable in both modes

- [ ] **Border Colors** - Dark mode border variations
  ```html
  <div class="border-gray-200 dark:border-gray-700">
  <div class="ring-gray-900/5 dark:ring-white/10">
  ```
  - **Test**: Apply borders with dark variants
  - **Success**: Borders visible and appropriate in both modes

- [ ] **Shadow Variations** - Dark mode shadow adaptations
  ```html
  <div class="shadow-lg dark:shadow-xl dark:shadow-gray-900/50">
  ```
  - **Test**: Apply shadows with dark mode adaptations
  - **Success**: Shadows enhance design in both modes

- [ ] **State Combinations** - Dark mode with hover/focus states
  ```html
  <button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
  ```
  - **Test**: Combine dark: with other state variants
  - **Success**: Interactive states work correctly in dark mode

---

## 2. Manual Dark Mode Toggle (Class-based)
**Priority: High | Items: 12/12**

### 2.1 Custom Variant Configuration
- [ ] **Custom Dark Variant Setup** - Override default media query behavior
  ```css
  @import "tailwindcss";
  @custom-variant dark (&:where(.dark, .dark *));
  ```
  - **Test**: Add custom variant to CSS configuration
  - **Success**: Dark mode controlled by class instead of media query

- [ ] **HTML Class Implementation** - Add dark class to control theme
  ```html
  <html class="dark">
    <body>
      <div class="bg-white dark:bg-black">Content</div>
    </body>
  </html>
  ```
  - **Test**: Toggle `dark` class on html element
  - **Success**: Theme changes based on class presence

- [ ] **CSS Selector Verification** - Ensure proper selector targeting
  ```css
  /* Generated CSS should target .dark ancestor */
  .dark .dark\:bg-black { background-color: #000; }
  ```
  - **Test**: Inspect generated CSS selectors
  - **Success**: Selectors target .dark class correctly

- [ ] **Nested Element Support** - Dark mode works on nested elements
  ```html
  <div class="dark">
    <div class="bg-white dark:bg-gray-800">
      <p class="text-black dark:text-white">Nested content</p>
    </div>
  </div>
  ```
  - **Test**: Apply dark class to container with nested styled elements
  - **Success**: All nested elements respond to dark mode

### 2.2 Data Attribute Alternative
- [ ] **Data Attribute Configuration** - Use data-theme instead of class
  ```css
  @import "tailwindcss";
  @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
  ```
  - **Test**: Configure dark variant with data attribute selector
  - **Success**: Dark mode controlled by data-theme attribute

- [ ] **Data Attribute Implementation** - HTML with data-theme
  ```html
  <html data-theme="dark">
    <body>
      <div class="bg-white dark:bg-black">Content</div>
    </body>
  </html>
  ```
  - **Test**: Toggle data-theme="dark" attribute
  - **Success**: Theme changes based on data attribute

- [ ] **Multi-value Data Themes** - Support multiple theme values
  ```html
  <html data-theme="light">   <!-- Light theme -->
  <html data-theme="dark">    <!-- Dark theme -->
  <html data-theme="auto">    <!-- System theme -->
  ```
  - **Test**: Test different data-theme values
  - **Success**: Only 'dark' value activates dark mode

### 2.3 JavaScript Integration
- [ ] **Basic Toggle Function** - Simple dark mode toggle
  ```javascript
  function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
  ```
  - **Test**: Create toggle button with function
  - **Success**: Button toggles between light and dark modes

- [ ] **State Persistence** - Save theme preference
  ```javascript
  // Save preference
  localStorage.theme = 'dark';
  // Load preference
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
  ```
  - **Test**: Refresh page after setting preference
  - **Success**: Theme preference persists across sessions

- [ ] **System Theme Detection** - Detect OS preference
  ```javascript
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  ```
  - **Test**: Check system preference detection
  - **Success**: Correctly detects OS dark mode setting

- [ ] **Media Query Listener** - Listen for system theme changes
  ```javascript
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  ```
  - **Test**: Change system theme while page is open
  - **Success**: Page responds to system theme changes

- [ ] **FOUC Prevention** - Avoid flash of unstyled content
  ```javascript
  // Inline in <head> to avoid FOUC
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  ```
  - **Test**: Reload page with dark theme preference
  - **Success**: No flash of light theme before dark theme loads

---

## 3. Three-way Theme System
**Priority: Medium | Items: 15/15**

### 3.1 Theme States Management
- [ ] **Light Theme State** - Explicit light theme selection
  ```javascript
  localStorage.theme = 'light';
  document.documentElement.classList.remove('dark');
  ```
  - **Test**: Set light theme explicitly
  - **Success**: Light theme applied regardless of system preference

- [ ] **Dark Theme State** - Explicit dark theme selection
  ```javascript
  localStorage.theme = 'dark';
  document.documentElement.classList.add('dark');
  ```
  - **Test**: Set dark theme explicitly
  - **Success**: Dark theme applied regardless of system preference

- [ ] **System Theme State** - Follow OS preference
  ```javascript
  localStorage.removeItem('theme');
  document.documentElement.classList.toggle(
    'dark',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  ```
  - **Test**: Remove theme preference to follow system
  - **Success**: Theme follows OS setting

- [ ] **Theme State Indicator** - Visual indication of current theme
  ```html
  <div class="theme-indicator">
    <button data-theme="light" class="active">Light</button>
    <button data-theme="dark">Dark</button>
    <button data-theme="system">System</button>
  </div>
  ```
  - **Test**: Create theme selector with active state
  - **Success**: Current theme visually indicated

### 3.2 Complete Theme Toggle Implementation
- [ ] **Comprehensive Theme Script** - Full implementation from docs
  ```javascript
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  // Whenever the user explicitly chooses light mode
  localStorage.theme = "light";

  // Whenever the user explicitly chooses dark mode
  localStorage.theme = "dark";

  // Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem("theme");
  ```
  - **Test**: Use exact implementation from documentation
  - **Success**: All theme states work as documented

- [ ] **Theme Initialization** - Proper theme setup on page load
  ```javascript
  function initTheme() {
    const theme = localStorage.theme || 'system';
    setTheme(theme);
  }
  
  // Call on page load
  initTheme();
  ```
  - **Test**: Reload page multiple times with different themes
  - **Success**: Theme properly initialized on every load

- [ ] **System Theme Listener Integration** - Handle system changes
  ```javascript
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (localStorage.theme === 'system' || !localStorage.theme) {
        setTheme('system');
      }
    });
  ```
  - **Test**: Change OS theme with system preference selected
  - **Success**: Page follows OS changes only when system theme active

### 3.3 Advanced Theme Features
- [ ] **Theme Transition Animations** - Smooth theme transitions
  ```css
  html {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  * {
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  ```
  - **Test**: Toggle between themes with transitions
  - **Success**: Smooth animation between light and dark themes

- [ ] **Per-component Theme Override** - Component-specific themes
  ```html
  <div class="light">
    <div class="bg-white dark:bg-gray-800">Always follows light theme</div>
  </div>
  ```
  - **Test**: Create components that override global theme
  - **Success**: Components can maintain independent themes

- [ ] **Theme-aware Images** - Different images for themes
  ```html
  <img src="logo-light.svg" class="dark:hidden" alt="Logo">
  <img src="logo-dark.svg" class="hidden dark:block" alt="Logo">
  ```
  - **Test**: Toggle theme with theme-specific images
  - **Success**: Appropriate image shown for each theme

- [ ] **CSS Custom Properties Integration** - Theme-aware CSS variables
  ```css
  :root {
    --primary-color: #3b82f6;
    --background: #ffffff;
  }
  
  .dark {
    --primary-color: #60a5fa;
    --background: #1f2937;
  }
  ```
  - **Test**: Use CSS variables that change with theme
  - **Success**: CSS variables update correctly with theme

- [ ] **Theme Persistence Validation** - Ensure proper storage
  ```javascript
  function validateThemeStorage() {
    const validThemes = ['light', 'dark', 'system'];
    const stored = localStorage.theme;
    
    if (stored && !validThemes.includes(stored)) {
      localStorage.removeItem('theme');
      return 'system';
    }
    
    return stored || 'system';
  }
  ```
  - **Test**: Set invalid theme value and reload
  - **Success**: Invalid values cleared, defaults to system

- [ ] **Theme Change Events** - Custom events for theme changes
  ```javascript
  function dispatchThemeChange(theme) {
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }
  
  window.addEventListener('themechange', (e) => {
    console.log('Theme changed to:', e.detail.theme);
  });
  ```
  - **Test**: Listen for theme change events
  - **Success**: Events fired correctly on theme changes

- [ ] **Server-side Theme Support** - SSR-compatible theme handling
  ```javascript
  // Server-side theme detection
  function getInitialTheme(request) {
    const cookieTheme = request.cookies.theme;
    const headerTheme = request.headers['sec-ch-prefers-color-scheme'];
    
    return cookieTheme || (headerTheme === 'dark' ? 'dark' : 'light');
  }
  ```
  - **Test**: Test theme with server-side rendering
  - **Success**: No FOUC, theme applied on server

- [ ] **Accessibility Considerations** - Respect user preferences
  ```javascript
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-duration', '0s');
  }
  ```
  - **Test**: Test with reduced motion OS setting
  - **Success**: Theme changes respect accessibility preferences

---

## 4. Advanced Dark Mode Features
**Priority: Medium | Items: 20/20**

### 4.1 Complex Color Combinations
- [ ] **Gradient Dark Variants** - Dark mode gradient support
  ```html
  <div class="bg-gradient-to-r from-blue-500 to-purple-600 
              dark:from-blue-600 dark:to-purple-700">
  ```
  - **Test**: Apply gradients with dark variants
  - **Success**: Gradients properly adjusted for dark mode

- [ ] **Ring Colors Dark Mode** - Focus rings in dark mode
  ```html
  <input class="ring-blue-500 dark:ring-blue-400 
               focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
  ```
  - **Test**: Focus input with dark mode ring colors
  - **Success**: Ring colors appropriate for both themes

- [ ] **Divide Colors Dark Mode** - Divider colors in dark mode
  ```html
  <div class="divide-y divide-gray-200 dark:divide-gray-700">
    <div>Item 1</div>
    <div>Item 2</div>
  </div>
  ```
  - **Test**: Create divided content with dark variants
  - **Success**: Dividers visible in both modes

### 4.2 Component-Specific Dark Mode
- [ ] **Form Elements Dark Mode** - Dark mode for inputs
  ```html
  <input class="bg-white dark:bg-gray-700 
               text-gray-900 dark:text-white
               border-gray-300 dark:border-gray-600
               placeholder-gray-500 dark:placeholder-gray-400">
  ```
  - **Test**: Create forms with comprehensive dark mode styling
  - **Success**: Forms usable and attractive in both modes

- [ ] **Navigation Dark Mode** - Dark mode navigation
  ```html
  <nav class="bg-white dark:bg-gray-900 
             border-gray-200 dark:border-gray-700">
    <a class="text-gray-900 dark:text-white 
             hover:text-blue-600 dark:hover:text-blue-400">Link</a>
  </nav>
  ```
  - **Test**: Create navigation with dark mode support
  - **Success**: Navigation clear and functional in both modes

- [ ] **Card Components Dark Mode** - Dark mode cards
  ```html
  <div class="bg-white dark:bg-gray-800 
             shadow-lg dark:shadow-xl dark:shadow-gray-900/50
             border border-gray-200 dark:border-gray-700">
  ```
  - **Test**: Create card layouts with dark mode
  - **Success**: Cards maintain depth and contrast in both modes

- [ ] **Modal/Dialog Dark Mode** - Dark mode overlays
  ```html
  <div class="fixed inset-0 bg-black/50 dark:bg-black/70">
    <div class="bg-white dark:bg-gray-800 
               text-gray-900 dark:text-white">
      Modal content
    </div>
  </div>
  ```
  - **Test**: Create modals with dark mode support
  - **Success**: Modals properly contrast with backdrop in both modes

### 4.3 Performance and Optimization
- [ ] **CSS Bundle Size** - Verify dark mode doesn't bloat CSS
  - **Test**: Compare CSS size with and without dark mode utilities
  - **Success**: Reasonable increase in CSS size (expected ~2x for used classes)

- [ ] **Runtime Performance** - Theme switching performance
  ```javascript
  function benchmarkThemeSwitch() {
    const start = performance.now();
    document.documentElement.classList.toggle('dark');
    const end = performance.now();
    console.log('Theme switch took:', end - start, 'ms');
  }
  ```
  - **Test**: Measure theme switching performance
  - **Success**: Theme switches in under 16ms for smooth UX

- [ ] **Memory Usage** - Check for memory leaks
  ```javascript
  // Monitor event listeners
  function checkEventListeners() {
    console.log('Media query listeners:', 
      window.matchMedia('(prefers-color-scheme: dark)').listeners?.length || 0);
  }
  ```
  - **Test**: Check for event listener accumulation
  - **Success**: No memory leaks from theme system

### 4.4 Browser Compatibility
- [ ] **CSS Custom Properties Support** - Fallbacks for older browsers
  ```css
  .dark-mode-fallback {
    background-color: #1f2937; /* Fallback */
    background-color: var(--gray-800, #1f2937);
  }
  ```
  - **Test**: Test in browsers without CSS custom property support
  - **Success**: Graceful degradation in older browsers

- [ ] **Media Query Support** - prefers-color-scheme support check
  ```javascript
  const supportsColorScheme = window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all';
  ```
  - **Test**: Check feature detection works correctly
  - **Success**: Proper fallback when media queries not supported

### 4.5 Testing and Quality Assurance
- [ ] **Automated Testing** - Test theme switching
  ```javascript
  // Example test
  function testThemeSwitching() {
    const element = document.querySelector('.theme-test');
    
    // Test light theme
    document.documentElement.classList.remove('dark');
    const lightBg = getComputedStyle(element).backgroundColor;
    
    // Test dark theme
    document.documentElement.classList.add('dark');
    const darkBg = getComputedStyle(element).backgroundColor;
    
    return lightBg !== darkBg;
  }
  ```
  - **Test**: Run automated theme tests
  - **Success**: All theme combinations produce expected results

- [ ] **Visual Regression Testing** - Screenshot comparison
  - **Test**: Compare screenshots of components in light vs dark mode
  - **Success**: All components maintain visual quality in both modes

- [ ] **Accessibility Testing** - Color contrast validation
  ```javascript
  function checkContrast(foreground, background) {
    // WCAG contrast ratio calculation
    const ratio = calculateContrastRatio(foreground, background);
    return ratio >= 4.5; // AA standard
  }
  ```
  - **Test**: Validate contrast ratios for all color combinations
  - **Success**: All text meets WCAG AA contrast requirements

- [ ] **Cross-browser Testing** - Theme consistency
  - **Test**: Test dark mode in Chrome, Firefox, Safari, Edge
  - **Success**: Consistent appearance across all browsers

- [ ] **Mobile Testing** - Touch device theme switching
  - **Test**: Test theme switching on mobile devices
  - **Success**: Theme switching works properly on touch devices

- [ ] **Print Styles** - Dark mode print behavior
  ```css
  @media print {
    .dark .print-light {
      color: black !important;
      background: white !important;
    }
  }
  ```
  - **Test**: Print page with dark mode active
  - **Success**: Print version uses appropriate colors

---

## 5. Integration and Best Practices
**Priority: Low | Items: 10/10**

### 5.1 Framework Integration
- [ ] **React Integration** - Theme provider pattern
  ```jsx
  const ThemeContext = createContext();
  
  function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('system');
    
    useEffect(() => {
      // Theme logic here
    }, [theme]);
    
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
  ```
  - **Test**: Create React app with theme context
  - **Success**: Theme state managed properly in React

- [ ] **Vue Integration** - Composable theme management
  ```javascript
  function useTheme() {
    const theme = ref('system');
    
    const setTheme = (newTheme) => {
      theme.value = newTheme;
      // Theme logic here
    };
    
    return { theme, setTheme };
  }
  ```
  - **Test**: Create Vue app with theme composable
  - **Success**: Theme state managed properly in Vue

- [ ] **Next.js Integration** - SSR-compatible theme
  ```javascript
  // pages/_document.js
  function setInitialTheme() {
    // Server-safe theme detection
  }
  
  class MyDocument extends Document {
    render() {
      return (
        <Html>
          <Head>
            <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }
  ```
  - **Test**: Test Next.js SSR with theme system
  - **Success**: No FOUC, proper SSR theme handling

### 5.2 Documentation and Maintenance
- [ ] **Theme Documentation** - Document theme system
  ```markdown
  ## Theme System
  
  ### Available Themes
  - `light`: Force light theme
  - `dark`: Force dark theme  
  - `system`: Follow OS preference
  
  ### Usage
  ```
  - **Test**: Create comprehensive theme documentation
  - **Success**: Documentation covers all theme features

- [ ] **Migration Guide** - Guide for adding dark mode
  ```markdown
  ## Adding Dark Mode to Existing Project
  
  1. Add dark variants to existing utilities
  2. Configure custom dark variant if needed
  3. Add theme switching JavaScript
  4. Test all components in both modes
  ```
  - **Test**: Follow migration guide on existing project
  - **Success**: Successful dark mode implementation

- [ ] **Style Guide** - Dark mode design guidelines
  ```markdown
  ## Dark Mode Design Guidelines
  
  ### Color Principles
  - Use darker backgrounds with lighter text
  - Maintain sufficient contrast ratios
  - Avoid pure black backgrounds
  
  ### Component Guidelines
  - Cards: Use gray-800 instead of white
  - Text: Use white/gray-100 for headings
  - Borders: Use gray-700 for subtle borders
  ```
  - **Test**: Apply style guide to new components
  - **Success**: Consistent dark mode implementation

- [ ] **Performance Guidelines** - Best practices for dark mode
  ```markdown
  ## Performance Best Practices
  
  1. Use CSS-only solutions when possible
  2. Minimize JavaScript for theme switching
  3. Leverage CSS custom properties
  4. Avoid unnecessary re-renders
  ```
  - **Test**: Audit existing implementation against guidelines
  - **Success**: Performance meets recommended standards

- [ ] **Accessibility Guidelines** - Dark mode accessibility
  ```markdown
  ## Accessibility Considerations
  
  1. Respect prefers-color-scheme
  2. Maintain contrast ratios
  3. Provide manual override option
  4. Test with screen readers
  ```
  - **Test**: Audit accessibility compliance
  - **Success**: Dark mode meets accessibility standards

- [ ] **Browser Support Matrix** - Document compatibility
  ```markdown
  ## Browser Support
  
  | Feature | Chrome | Firefox | Safari | Edge |
  |---------|--------|---------|--------|------|
  | prefers-color-scheme | 76+ | 67+ | 12.1+ | 79+ |
  | CSS custom properties | 49+ | 31+ | 9.1+ | 16+ |
  ```
  - **Test**: Verify support matrix accuracy
  - **Success**: Support matrix matches actual browser capabilities

---

## Summary Statistics
- **Total Items**: 65
- **High Priority**: 20 items (Core concepts + Manual toggle)
- **Medium Priority**: 35 items (Three-way system + Advanced features)
- **Low Priority**: 10 items (Integration + Best practices)

## Success Criteria
- [ ] All dark mode utilities work with `dark:` prefix
- [ ] Manual theme toggle works correctly
- [ ] Three-way theme system (light/dark/system) implemented
- [ ] No FOUC (Flash of Unstyled Content)
- [ ] Performance impact minimal (<16ms theme switches)
- [ ] Accessibility compliance (WCAG AA contrast ratios)
- [ ] Cross-browser compatibility verified
- [ ] Documentation and migration guides complete

## Dependencies
- Tailwind CSS v4.1 with custom variant support
- JavaScript for manual theme switching
- CSS custom properties support for advanced features
- Local storage for theme persistence

## References
- [Tailwind CSS Dark Mode Documentation](https://tailwindcss.com/docs/dark-mode)
- [prefers-color-scheme MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) 