import { ParsedStyle } from '../types';

/**
 * Validates a Figma variable path.
 * @param variablePath The variable path string to validate
 * @returns true if the path is valid, false otherwise
 */
export function isValidFigmaVariablePath(variablePath: string): boolean {
  if (!variablePath) return false;
  if (variablePath.startsWith('/')) return false;
  if (variablePath.endsWith('/')) return false;
  if (variablePath.includes('//')) return false;
  return true;
}

/**
 * Extracts a variable ID from a Figma variable string.
 * @param value The Figma variable string (e.g., '$[colors/primary]')
 * @returns The variable ID if valid, null otherwise
 */
export function extractFigmaVariableId(value: string): string | null {
  if (!value.startsWith('$[') || !value.endsWith(']')) {
    return null;
  }
  
  const variableId = value.slice(2, -1);
  return isValidFigmaVariablePath(variableId) ? variableId : null;
}

/**
 * Creates a Figma variable style object.
 * @param property The style property name
 * @param variableId The Figma variable ID
 * @param options Additional options (e.g., opacity)
 * @returns A ParsedStyle object
 */
export function createFigmaVariableStyle(
  property: string,
  variableId: string,
  options: { opacity?: number } = {}
): ParsedStyle {
  return {
    property,
    value: variableId,
    variant: 'figma-variable',
    variableId,
    ...(options.opacity !== undefined && { opacity: options.opacity })
  };
} 