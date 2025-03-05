### Typography Properties

#### Text Auto Resize
```typescript
// Text Auto Resize Behavior
text-fixed     → textAutoResize: "NONE"
text-auto      → textAutoResize: "WIDTH_AND_HEIGHT"
text-auto-h    → textAutoResize: "HEIGHT"
text-truncate  → textAutoResize: "TRUNCATE"
```

#### Text Case
```typescript
// Text Transform
text-uppercase      → textCase: "UPPER"
text-lowercase      → textCase: "LOWER"
text-capitalize     → textCase: "TITLE"
text-normal-case    → textCase: "ORIGINAL"

// With Figma Variables
text-case-$[typography/case/default] → textCase: "typography/case/default"
```

#### Text Truncation
```typescript
// Text Truncation
text-truncate-none  → textTruncation: "DISABLED"
text-truncate      → textTruncation: "ENDING"
``` 