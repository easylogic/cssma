# Contributing to FigmaikR

Thank you for considering contributing to FigmaikR! We welcome contributions from the community and are grateful for your interest in improving our CSS-to-Figma conversion toolkit.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended package manager)
- Git
- Figma account (for plugin development)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/figmaikr.git
   cd figmaikr
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Build All Packages**
   ```bash
   pnpm run build
   ```

4. **Run Tests**
   ```bash
   pnpm test
   ```

## Project Structure

```
figmaikr/
├── packages/
│   └── cssma/              # Core conversion library
│       ├── src/
│       ├── tests/
│       └── README.md
├── apps/
│   └── cssma-plugin/       # Figma plugin
│       ├── src/
│       └── README.md
├── docs/                   # Documentation
│   ├── specs/             # Technical specifications
│   └── README.md
└── README.md              # Project overview
```

## Contributing Guidelines

### Types of Contributions

We welcome several types of contributions:

- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new functionality
- 📝 **Documentation** - Improve guides, examples, and specs
- 🔧 **Code Contributions** - Bug fixes, features, optimizations
- 🧪 **Testing** - Add or improve test coverage
- 🎨 **Design** - UI/UX improvements for the plugin

### Before You Start

1. **Check Existing Issues** - Search for similar issues or feature requests
2. **Create an Issue** - For significant changes, discuss your approach first
3. **Follow Conventions** - Review our coding standards and commit message format

### Coding Standards

#### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

#### Code Style
```typescript
// ✅ Good
interface NodeStyles {
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  fills?: Paint[];
  cornerRadius?: number;
}

function processCssStyles(classString: string): NodeStyles {
  // Implementation with clear logic flow
}

// ❌ Avoid
let x = parse(s);
```

#### Commit Messages
Follow conventional commit format:
```
feat(core): add support for backdrop-blur effects
fix(plugin): resolve issue with gradient parsing  
docs(specs): update layout specification examples
test(converter): add tests for color conversion
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### CSS/Tailwind Conversion Rules

When adding new CSS property support:

1. **Update Parser** (`packages/cssma/src/parser/`)
   - Add property recognition logic
   - Include arbitrary value support
   - Handle edge cases

2. **Update Converter** (`packages/cssma/src/converter/`)
   - Implement Figma style mapping
   - Consider constraints and limitations

3. **Update Reverse Converter** (`packages/cssma/src/apply/`)
   - Add Figma → CSS conversion
   - Maintain consistency with parser

4. **Add Tests** (`packages/cssma/tests/`)
   - Unit tests for all code paths
   - Integration tests for complex scenarios

5. **Update Documentation** (`docs/specs/`)
   - Add specification examples
   - Document any limitations

### Example: Adding New Feature

```typescript
// 1. Parser enhancement
export function parseCustomProperty(value: string): CustomStyle {
  // Implementation
}

// 2. Converter integration  
export function applyCustomProperty(styles: any, value: CustomStyle): void {
  // Figma application logic
}

// 3. Reverse conversion
export function extractCustomProperty(node: SceneNode): string {
  // CSS generation logic
}

// 4. Tests
describe('CustomProperty', () => {
  it('should parse custom values correctly', () => {
    // Test implementation
  });
});
```

## Pull Request Process

### 1. Preparation
- Ensure your fork is up to date
- Create a feature branch: `git checkout -b feature/your-feature-name`
- Make your changes with clear, logical commits

### 2. Before Submitting
- Run the full test suite: `pnpm test`
- Build all packages: `pnpm run build`
- Check for linting errors: `pnpm run lint`
- Update documentation if needed

### 3. Pull Request
- Use a clear, descriptive title
- Fill out the PR template completely
- Link any related issues
- Request review from maintainers

### 4. Review Process
- Address feedback promptly
- Keep discussions focused and constructive
- Be patient - reviews may take time

### PR Template
```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature  
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] All tests pass
- [ ] Added new tests
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Updated documentation
- [ ] No breaking changes (or clearly documented)
```

## Testing

### Running Tests
```bash
# All tests
pnpm test

# Specific package
pnpm test --filter cssma

# Watch mode
pnpm test --watch
```

### Writing Tests
- Use Jest for unit and integration tests
- Aim for high coverage on critical paths
- Test both positive and negative scenarios
- Mock external dependencies appropriately

```typescript
describe('CSS Parser', () => {
  it('should parse flexbox properties correctly', () => {
    const result = processCssStyles('flex-col items-center justify-between');
    expect(result.layoutMode).toBe('VERTICAL');
    expect(result.counterAxisAlignItems).toBe('CENTER');
    expect(result.primaryAxisAlignItems).toBe('SPACE_BETWEEN');
  });
});
```

## Documentation

### Types of Documentation

1. **API Documentation** - JSDoc comments in code
2. **Specifications** - Technical specs in `docs/specs/`
3. **Examples** - Real-world usage examples
4. **README Files** - Package-specific guides

### Documentation Standards
- Write in clear, concise English
- Include code examples for all APIs
- Keep examples up to date with code changes
- Use consistent formatting and terminology

## Community

### Getting Help
- **GitHub Discussions** - General questions and ideas
- **Issues** - Bug reports and feature requests
- **Discord** - Real-time community chat (if available)

### Recognition
Contributors who make significant contributions will be:
- Added to the Contributors section
- Recognized in release notes
- Invited to join the maintainer team (for ongoing contributors)

## Release Process

Releases are handled by maintainers:

1. Version bump following semantic versioning
2. Changelog generation
3. NPM package publication
4. GitHub release creation
5. Figma plugin update (if applicable)

## Questions?

Don't hesitate to ask questions! We're here to help:
- Create a discussion for general questions
- Join our community channels
- Reach out to maintainers directly

Thank you for contributing to FigmaikR! 🎉 