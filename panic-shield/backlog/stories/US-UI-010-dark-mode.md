# User Story: Dark Mode Implementation

## Story
As a user who prefers dark interfaces or uses the app at night, I want a dark mode option so that I can use the app comfortably in low-light conditions without eye strain.

## Current State
- Only light mode available
- Bright colors (especially panic page purple)
- No theme switching capability
- No system preference detection

## Acceptance Criteria
- [ ] Dark mode toggle in settings
- [ ] Respect system dark mode preference
- [ ] All colors adapted for dark mode
- [ ] Proper contrast ratios maintained
- [ ] Smooth theme transition
- [ ] Theme preference persisted

## Technical Requirements
```css
/* Dark Mode Variables */
:root[data-theme="dark"] {
  /* Background Colors */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --bg-tertiary: #3a3a3a;

  /* Text Colors */
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --text-muted: #808080;

  /* Card Backgrounds */
  --card-bg: #2a2a2a;
  --card-border: #3a3a3a;

  /* Shadows (lighter for dark mode) */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);

  /* Panic Mode (adjusted for dark) */
  --panic-gradient: linear-gradient(135deg, #4a5ba8 0%, #5a3b72 100%);
}

/* Theme Toggle Component */
const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
};
```

## Implementation Tasks
- [ ] Create dark mode color palette
- [ ] Implement theme toggle component
- [ ] Add theme context provider
- [ ] Update all color variables
- [ ] Adjust shadows for dark mode
- [ ] Test all screens in dark mode
- [ ] Add smooth theme transitions
- [ ] Persist theme preference

## Color Adjustments
- Panic page purple → Darker, less saturated
- Success green → Adjusted for dark background
- Error red → Less bright for dark mode
- Chart colors → Higher contrast versions
- Shadows → Darker and more subtle

## Testing
- Color contrast verification (WCAG AA)
- Theme persistence testing
- System preference detection
- Transition smoothness
- Cross-browser compatibility
- Component visual testing in both modes

## Effort Estimate
**Size**: Large (3-4 days)