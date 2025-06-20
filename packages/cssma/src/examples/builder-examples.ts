import { 
  FRAME, TEXT, RECT, ELLIPSE, COMPONENT, VECTOR, POLYGON, STAR, LINE, INSTANCE, COMPONENT_SET, GROUP, BOOLEAN_OPERATION, SECTION
} from '../builders/nodeBuilders';

// =============================================================================
// Basic Element Examples
// =============================================================================

// Simple Card using basic elements
export const simpleCard = FRAME("Card", "flex-col bg-white rounded-lg p-[16] gap-[12] border border-[#E5E7EB]", [
  TEXT("Title", "text-lg font-semibold text-[#111827]", "Welcome Card"),
  TEXT("Description", "text-base text-[#4B5563]", "This is a sample card component created with functional builders")
]);

// Button using basic elements
export const primaryButton = FRAME("Button", "flex-row justify-center items-center px-[16] py-[8] rounded-md bg-[#3B82F6]", [
  TEXT("Label", "text-sm font-medium text-white", "Primary Button")
]);

// Form using basic elements
export const loginForm = FRAME("Login Form", "flex-col w-[320] p-[24] bg-white rounded-lg shadow-lg gap-[16]", [
  TEXT("Form Title", "text-2xl font-bold text-center", "Welcome Back"),
  
  // Email Field
  FRAME("Email Field", "flex-col gap-[8]", [
    TEXT("Email Label", "text-sm font-medium text-[#374151]", "Email"),
    FRAME("Email Input", "w-full h-[40] bg-white border border-[#D1D5DB] rounded-md px-[12] py-[8]", [
      TEXT("Email Placeholder", "text-base text-[#9CA3AF]", "Enter your email")
    ])
  ]),
  
  // Password Field
  FRAME("Password Field", "flex-col gap-[8]", [
    TEXT("Password Label", "text-sm font-medium text-[#374151]", "Password"),
    FRAME("Password Input", "w-full h-[40] bg-white border border-[#D1D5DB] rounded-md px-[12] py-[8]", [
      TEXT("Password Placeholder", "text-base text-[#9CA3AF]", "Enter your password")
    ])
  ]),
  
  // Submit Button
  FRAME("Submit Button", "w-full flex-row justify-center items-center px-[16] py-[8] rounded-md bg-[#3B82F6]", [
    TEXT("Submit Label", "text-sm font-medium text-white", "Sign In")
  ])
]);

// =============================================================================
// Shape Examples
// =============================================================================

// Basic shapes
export const shapes = FRAME("Shapes", "flex-row gap-[16] p-[16]", [
  RECT("Rectangle", "w-[64] h-[64] bg-blue-500 rounded-lg"),
  ELLIPSE("Circle", "w-[64] h-[64] bg-green-500"),
  POLYGON("Triangle", "w-[64] h-[64] bg-red-500"),
  STAR("Star", "w-[64] h-[64] bg-yellow-500"),
  LINE("Line", "w-[64] h-[2] bg-gray-500")
]);

// =============================================================================
// Vector Icon Examples  
// =============================================================================

export const arrowIcon = VECTOR("Arrow", "w-[24] h-[24] stroke-current stroke-2 fill-none", [
  "M5 12h14",
  "M12 5l7 7-7 7"
]);

export const heartIcon = VECTOR("Heart", "w-[24] h-[24] stroke-red-500 fill-red-500", [
  "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
]);

export const settingsIcon = VECTOR("Settings", "w-[24] h-[24] stroke-gray-600", [
  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
]);

// =============================================================================
// Component Example
// =============================================================================

export const buttonComponent = COMPONENT("Button Component", "", [
  FRAME("Button", "flex-row justify-center items-center px-[16] py-[8] rounded-md bg-[#3B82F6]", [
    TEXT("Label", "text-sm font-medium text-white", "{{text}}")
  ])
]);

// =============================================================================
// Component Set Examples
// =============================================================================

// Simple toggle component set (ON/OFF states)
export const toggleComponentSet = COMPONENT_SET(
  "Toggle",
  [
    {
      variantProperties: { state: "off" },
      styles: "w-[44] h-[24] bg-gray-300 rounded-full p-[2]",
      children: [
        ELLIPSE("Knob", "w-[20] h-[20] bg-white shadow-sm")
      ]
    },
    {
      variantProperties: { state: "on" },
      styles: "w-[44] h-[24] bg-blue-500 rounded-full p-[2] justify-end",
      children: [
        ELLIPSE("Knob", "w-[20] h-[20] bg-white shadow-sm")
      ]
    }
  ]
);

// Button Component Set with size and variant variations
export const buttonComponentSet = COMPONENT_SET(
  "Button Component Set",
  [
    // Primary variants
    {
      variantProperties: { variant: "primary", size: "small" },
      styles: "flex-row justify-center items-center px-[12] py-[6] rounded-md bg-[#3B82F6]",
      children: [
        TEXT("Label", "text-xs font-medium text-white", "{{text}}")
      ]
    },
    {
      variantProperties: { variant: "primary", size: "medium" },
      styles: "flex-row justify-center items-center px-[16] py-[8] rounded-md bg-[#3B82F6]",
      children: [
        TEXT("Label", "text-sm font-medium text-white", "{{text}}")
      ]
    },
    {
      variantProperties: { variant: "primary", size: "large" },
      styles: "flex-row justify-center items-center px-[20] py-[10] rounded-md bg-[#3B82F6]",
      children: [
        TEXT("Label", "text-base font-medium text-white", "{{text}}")
      ]
    },
    // Secondary variants
    {
      variantProperties: { variant: "secondary", size: "small" },
      styles: "flex-row justify-center items-center px-[12] py-[6] rounded-md bg-[#6B7280]",
      children: [
        TEXT("Label", "text-xs font-medium text-white", "{{text}}")
      ]
    },
    {
      variantProperties: { variant: "secondary", size: "medium" },
      styles: "flex-row justify-center items-center px-[16] py-[8] rounded-md bg-[#6B7280]",
      children: [
        TEXT("Label", "text-sm font-medium text-white", "{{text}}")
      ]
    },
    {
      variantProperties: { variant: "secondary", size: "large" },
      styles: "flex-row justify-center items-center px-[20] py-[10] rounded-md bg-[#6B7280]",
      children: [
        TEXT("Label", "text-base font-medium text-white", "{{text}}")
      ]
    },
    // Outline variants
    {
      variantProperties: { variant: "outline", size: "small" },
      styles: "flex-row justify-center items-center px-[12] py-[6] rounded-md bg-transparent border border-[#3B82F6]",
      children: [
        TEXT("Label", "text-xs font-medium text-[#3B82F6]", "{{text}}")
      ]
    },
    {
      variantProperties: { variant: "outline", size: "medium" },
      styles: "flex-row justify-center items-center px-[16] py-[8] rounded-md bg-transparent border border-[#3B82F6]",
      children: [
        TEXT("Label", "text-sm font-medium text-[#3B82F6]", "{{text}}")
      ]
    },
    {
      variantProperties: { variant: "outline", size: "large" },
      styles: "flex-row justify-center items-center px-[20] py-[10] rounded-md bg-transparent border border-[#3B82F6]",
      children: [
        TEXT("Label", "text-base font-medium text-[#3B82F6]", "{{text}}")
      ]
    }
  ],
  {
    text: {
      type: 'TEXT',
      defaultValue: 'Button',
      preferredValues: ['Button', 'Submit', 'Cancel', 'Save']
    }
  }
);

// Card Component Set with different states
export const cardComponentSet = COMPONENT_SET(
  "Card Component Set",
  [
    {
      variantProperties: { state: "default" },
      styles: "flex-col bg-white rounded-lg p-[16] gap-[12] border border-[#E5E7EB]",
      children: [
        TEXT("Title", "text-lg font-semibold text-[#111827]", "{{title}}"),
        TEXT("Description", "text-base text-[#4B5563]", "{{description}}")
      ]
    },
    {
      variantProperties: { state: "hover" },
      styles: "flex-col bg-white rounded-lg p-[16] gap-[12] border border-[#3B82F6] shadow-md",
      children: [
        TEXT("Title", "text-lg font-semibold text-[#111827]", "{{title}}"),
        TEXT("Description", "text-base text-[#4B5563]", "{{description}}")
      ]
    },
    {
      variantProperties: { state: "selected" },
      styles: "flex-col bg-[#EFF6FF] rounded-lg p-[16] gap-[12] border-2 border-[#3B82F6]",
      children: [
        TEXT("Title", "text-lg font-semibold text-[#1E40AF]", "{{title}}"),
        TEXT("Description", "text-base text-[#3730A3]", "{{description}}")
      ]
    }
  ],
  {
    title: {
      type: 'TEXT',
      defaultValue: 'Card Title'
    },
    description: {
      type: 'TEXT',
      defaultValue: 'Card description text'
    }
  }
);

// =============================================================================
// Instance Examples
// =============================================================================

// Instances of the button component set with specific variants
export const primaryButtonInstance = INSTANCE(
  "Primary Button", 
  "Button Component Set", 
  "",
  { variant: "primary", size: "medium" }
);

export const outlineButtonInstance = INSTANCE(
  "Outline Button", 
  "Button Component Set", 
  "",
  { variant: "outline", size: "large" }
);

// Instance of card component set
export const selectedCardInstance = INSTANCE(
  "Selected Card", 
  "Card Component Set", 
  "",
  { state: "selected" }
);

// =============================================================================
// Complex Layout Example
// =============================================================================

export const dashboardHeader = FRAME("Dashboard Header", "flex-row w-full h-[64] px-[24] py-[12] bg-white border-b border-gray-200 items-center justify-between", [
  // Logo Section
  FRAME("Logo Section", "flex-row items-center gap-[12]", [
    RECT("Logo", "w-[32] h-[32] bg-blue-500 rounded"),
    TEXT("Brand", "text-xl font-bold", "Dashboard")
  ]),
  
  // User Section
  FRAME("User Section", "flex-row items-center gap-[8]", [
    FRAME("Avatar", "w-[32] h-[32] rounded-full bg-[#E5E7EB] justify-center items-center", [
      TEXT("Initials", "text-[13] font-medium text-[#374151]", "JD")
    ]),
    TEXT("Username", "text-sm font-medium", "John Doe")
  ])
]);

// =============================================================================
// New Node Type Examples
// =============================================================================

// GROUP example - Grouping related elements
export const iconGroup = GROUP("Icon Group", "w-[100] h-[100]", [
  ELLIPSE("Background Circle", "w-[100] h-[100] bg-blue-100"),
  VECTOR("Icon", "w-[48] h-[48] stroke-blue-600 stroke-2 fill-none absolute top-[26] left-[26]", [
    "M12 2L12 22M2 12L22 12"
  ])
]);

// COMPONENT example - Reusable button component
export const buttonComponentExample = COMPONENT("Button", "flex-row justify-center items-center px-[16] py-[8] rounded-md bg-[#3B82F6]", [
  TEXT("Label", "text-sm font-medium text-white", "Button Text")
]);

// BOOLEAN_OPERATION examples
export const unionOperation = BOOLEAN_OPERATION("Union Shape", "UNION", "fill-blue-500", [
  ELLIPSE("Circle 1", "w-[60] h-[60] absolute top-0 left-0"),
  ELLIPSE("Circle 2", "w-[60] h-[60] absolute top-[20] left-[20]")
]);

export const subtractOperation = BOOLEAN_OPERATION("Subtract Shape", "SUBTRACT", "fill-red-500", [
  RECT("Base Rectangle", "w-[80] h-[80]"),
  ELLIPSE("Hole", "w-[40] h-[40] absolute top-[20] left-[20]")
]);

export const intersectOperation = BOOLEAN_OPERATION("Intersect Shape", "INTERSECT", "fill-green-500", [
  ELLIPSE("Circle", "w-[60] h-[60]"),
  RECT("Rectangle", "w-[60] h-[60] absolute top-[15] left-[15]")
]);

export const excludeOperation = BOOLEAN_OPERATION("Exclude Shape", "EXCLUDE", "fill-purple-500", [
  ELLIPSE("Circle 1", "w-[60] h-[60]"),
  ELLIPSE("Circle 2", "w-[60] h-[60] absolute top-[20] left-[20]")
]);

// SECTION example - Organizing design elements
export const designSection = SECTION("Design System Section", "w-full h-auto p-[24] bg-gray-50", [
  TEXT("Section Title", "text-2xl font-bold mb-[16]", "Color Palette"),
  FRAME("Color Grid", "grid grid-cols-4 gap-[16] w-full", [
    RECT("Primary", "w-[80] h-[80] bg-blue-500 rounded-lg"),
    RECT("Secondary", "w-[80] h-[80] bg-gray-500 rounded-lg"),
    RECT("Success", "w-[80] h-[80] bg-green-500 rounded-lg"),
    RECT("Warning", "w-[80] h-[80] bg-yellow-500 rounded-lg"),
    RECT("Error", "w-[80] h-[80] bg-red-500 rounded-lg"),
    RECT("Info", "w-[80] h-[80] bg-indigo-500 rounded-lg"),
    RECT("Light", "w-[80] h-[80] bg-gray-100 rounded-lg border border-gray-300"),
    RECT("Dark", "w-[80] h-[80] bg-gray-900 rounded-lg")
  ])
]);

// Complex example combining multiple new node types
export const complexDesignSystem = SECTION("Complete Design System", "w-full h-auto p-[32]", [
  TEXT("Design System", "text-3xl font-bold mb-[24]", "UI Component Library"),
  
  // Component showcase
  FRAME("Component Showcase", "flex-col gap-[32] w-full", [
    // Buttons section
    GROUP("Button Variants", "flex-row gap-[16] items-center", [
      buttonComponentExample,
      INSTANCE("Secondary Button", "Button", "bg-gray-600"),
      INSTANCE("Outline Button", "Button", "bg-transparent border border-blue-600 text-blue-600")
    ]),
    
    // Boolean operation showcase  
    FRAME("Shape Operations", "flex-row gap-[24] items-center", [
      unionOperation,
      subtractOperation,
      intersectOperation,
      excludeOperation
    ]),
    
    // Icon group showcase
    FRAME("Icon Examples", "flex-row gap-[16] items-center", [
      iconGroup,
      GROUP("Settings Icon", "w-[100] h-[100]", [
        ELLIPSE("Background", "w-[100] h-[100] bg-gray-100"),
        VECTOR("Gear", "w-[60] h-[60] stroke-gray-600 stroke-2 fill-none absolute top-[20] left-[20]", [
          "M12 2L12 6M12 18L12 22M6 12L2 12M22 12L18 12",
          "M8 8L4.93 4.93M19.07 4.93L16 8M4.93 19.07L8 16M16 16L19.07 19.07"
        ])
      ])
    ])
  ])
]); 