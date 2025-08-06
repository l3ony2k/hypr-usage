# CSS Theme System

This dashboard uses CSS custom properties (variables) for easy theming and maintenance.

## File Structure

- `onedark-theme.css` - Main OneDark theme (default)
- `light-theme.css` - Example light theme variant
- `README.md` - This documentation

## CSS Variables

### Color Variables

#### Background Colors
- `--bg-primary` - Main page background
- `--bg-secondary` - Cards and sections background  
- `--bg-tertiary` - Hover states background

#### Border Colors
- `--border-primary` - Main borders
- `--border-secondary` - Hover state borders

#### Text Colors
- `--text-primary` - Main text color
- `--text-secondary` - Muted/secondary text
- `--text-tertiary` - High contrast text

#### Accent Colors
- `--color-red` - Error states, headers
- `--color-green` - Success states, credits
- `--color-blue` - Primary buttons, links
- `--color-yellow` - Warnings, highlights
- `--color-purple` - Special elements
- `--color-cyan` - Info elements

#### Usage Type Colors
- `--usage-prompt` - Prompt usage color
- `--usage-completion` - Completion usage color
- `--usage-audio` - Audio usage color
- `--usage-images` - Images usage color
- `--usage-video` - Video usage color
- `--usage-embeddings` - Embeddings usage color
- `--usage-total` - Total usage color

### Typography Variables
- `--font-family` - Main font stack
- `--font-size-small` through `--font-size-xlarge` - Font sizes

### Spacing Variables
- `--spacing-xs` through `--spacing-xl` - Consistent spacing values

### Layout Variables
- `--border-width` - Standard border width
- `--transition-speed` - Animation timing

## Creating New Themes

To create a new theme:

1. Copy `onedark-theme.css` to `new-theme.css`
2. Modify only the `:root` variables section
3. Update the HTML to link to your new theme file

Example:
```css
:root {
    --bg-primary: #your-color;
    --color-blue: #your-accent;
    /* ... other variables */
}
```

## Switching Themes

In `templates/index.html`, change the CSS link:

```html
<!-- OneDark Theme (default) -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/onedark-theme.css') }}">

<!-- Light Theme -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/light-theme.css') }}">
```

## Benefits

- **Easy maintenance** - Change colors in one place
- **Consistent design** - Variables ensure consistency
- **Theme switching** - Easy to create variants
- **Future-proof** - Easy to update or rebrand
- **Developer friendly** - Clear variable names