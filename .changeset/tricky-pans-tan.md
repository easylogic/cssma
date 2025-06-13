---
"cssma-react": patch
"cssma": patch
"cssma-plugin": patch
"figmai-landing": patch
---

Improve animation system API design and naming conventions

## 🚀 New Features
- Add `generatePrototypingInfo()` function for clean prototyping data extraction
- Add `FigmaConversionResult` interface for enhanced conversion results
- Update `useCssmaWithAnimations()` hook with improved prototyping support

## 🔧 API Improvements  
- Remove awkward `convertStylesToFigmaWithPrototyping()` function
- Provide cleaner separation between standard conversion and prototyping features
- Maintain full backward compatibility with existing `convertStylesToFigma()` API

## 📦 Updated Components
- **cssma**: Core API improvements and new prototyping utilities
- **cssma-react**: Enhanced animation hooks with better prototyping integration
- **cssma-plugin**: Compatible with new animation API
- **figmai-landing**: Updated showcase components with new API usage

## 💡 Usage Example
```typescript
// Clean, intuitive API design
const figmaProps = convertStylesToFigma(styles);
const prototyping = generatePrototypingInfo(styles);

// Enhanced React hook
const { prototyping } = useCssmaWithAnimations('transition-all hover:scale-105');
```

This update significantly improves developer experience with more intuitive naming conventions and better API organization.
