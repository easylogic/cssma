---
"cssma-react": patch
---

feat: Add object-based useCssmaMultiple hook for better developer experience

- Add TypeScript overloads to support both array and object inputs for `useCssmaMultiple`
- Implement object processing logic with proper key preservation and type inference
- Maintain full backward compatibility with existing array-based usage
- Improve developer experience with self-documenting style names and IDE autocomplete
- Add comprehensive documentation with object-based examples and best practices
- Update README.md with advanced usage patterns and migration guidance

**Breaking Changes:** None - fully backward compatible

**New Features:**
- Object-based `useCssmaMultiple` with named style groups
- Perfect TypeScript inference for object keys
- Enhanced IDE autocomplete and error checking
- Self-documenting code patterns

**Migration:**
```tsx
// Old (still works)
const [a, b, c] = useCssmaMultiple(['style1', 'style2', 'style3']);

// New (recommended)
const styles = useCssmaMultiple({
  container: 'style1',
  header: 'style2', 
  content: 'style3'
});
```
