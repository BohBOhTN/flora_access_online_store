# Flora Access Shop - Logo Visibility Fixes

## GitHub Issue

### Title
Fix logo not displaying on production - Navbar and Footer components

### Description

**Problem:**
The Flora Access Shop logo was not visible on the production environment, appearing as a blank space in both the Navbar and Footer components.

**Root Causes:**
1. **Incorrect asset path**: Logo image source was hardcoded as `/assets/FloraLogo.png`, which doesn't resolve correctly in production builds. The logo file is located in `src/assets/FloraLogo.png`.
2. **CSS filter issue**: The Footer component had a CSS filter (`filter: brightness(0) invert(1)`) applied to the logo image that was rendering it invisible.
3. **Asset organization**: The logo file was in the wrong directory (`/assets` instead of `src/assets`), preventing proper module bundling.

**Impact:**
- Logo missing from Navbar (minor visual impact - navbar still functional)
- Logo missing from Footer (blank white space)
- Degraded brand visibility on production

**Solution Implemented:**
- Converted hardcoded paths to ES6 imports in both Navbar and Footer components
- Removed problematic CSS filter from Footer logo styling
- Reorganized assets to proper `src/assets` directory for correct bundling

---

## Commit Message

```
fix: Fix logo visibility in Navbar and Footer components

- Import FloraLogo directly from src/assets instead of using hardcoded paths
- Update Navbar.jsx to use imported logo variable
- Update Footer.jsx to use imported logo variable
- Remove brightness/invert filter from Footer logo CSS that was causing invisibility
- Move FloraLogo.png to src/assets for proper module bundling

This fixes the production issue where logos were not displaying in the
Navbar and Footer components. The hardcoded path '/assets/FloraLogo.png'
does not resolve in production builds, and the CSS filter was rendering
the logo invisible.

Fixes: Logo not appearing on production
```

---

## Pull Request Description

### Overview
This PR resolves the logo visibility issue affecting the Navbar and Footer components in production. The logos are now properly imported and rendered without CSS filters that were hiding them.

### Changes Made

#### 1. **Navbar Component** (`src/components/Navbar/Navbar.jsx`)
- Added direct import of FloraLogo from `src/assets/FloraLogo.png`
- Changed `src="/assets/FloraLogo.png"` to `src={FloraLogo}` in the img tag
- Ensures logo loads correctly through the module bundler

#### 2. **Footer Component** (`src/components/Footer/Footer.jsx`)
- Added direct import of FloraLogo from `src/assets/FloraLogo.png`
- Changed `src="/assets/FloraLogo.png"` to `src={FloraLogo}` in the img tag
- Consistent with Navbar implementation

#### 3. **Footer Styling** (`src/components/Footer/Footer.module.css`)
- Removed `filter: brightness(0) invert(1);` from `.footerLogoImage` class
- This filter was rendering the logo completely invisible
- Logo now displays with natural colors

#### 4. **Asset Organization**
- Moved `FloraLogo.png` from root `/assets` to `src/assets`
- Ensures proper module bundling and path resolution in production

### Testing
- ✅ Logo displays correctly in Navbar on desktop and mobile
- ✅ Logo displays correctly in Footer on all screen sizes
- ✅ No console errors related to missing assets
- ✅ Logo imports work correctly in production build

### Additional Changes
- **Constants** (`src/constants/index.js`): Updated store maps geolocation data

### Files Modified
```
src/components/Navbar/Navbar.jsx
src/components/Footer/Footer.jsx
src/components/Footer/Footer.module.css
src/constants/index.js
src/assets/FloraLogo.png (moved from /assets)
```

### Type of Change
- [x] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)

### Related Issues
- Fixes production logo visibility issue on Navbar and Footer

---

## Summary of All Fixes

| Component | Issue | Fix |
|-----------|-------|-----|
| Navbar Logo | Hardcoded path not resolving in production | Import logo from `src/assets` and use as variable |
| Footer Logo | Hardcoded path not resolving in production | Import logo from `src/assets` and use as variable |
| Footer Logo CSS | CSS filter making logo invisible | Removed `filter: brightness(0) invert(1)` |
| Asset Organization | Logo in wrong directory structure | Moved `FloraLogo.png` to `src/assets/` |
| Constants | Store geolocation data | Updated maps geolocation data |

---

## Verification Checklist

- [x] Logo visible in Navbar production build
- [x] Logo visible in Footer production build
- [x] No broken import paths
- [x] No CSS styling issues
- [x] Assets properly bundled
- [x] No console errors
- [x] Mobile responsive working
