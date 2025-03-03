// Add this function before findVariableByName
export async function findVariableByName(name: string): Promise<Variable | null> {
    try {
      const variableCollections = await figma.variables.getLocalVariableCollectionsAsync();
      for await (const collection of variableCollections) {
        for await (const variableId of collection.variableIds) {
          const variable = await figma.variables.getVariableByIdAsync(variableId);
          if (variable?.name === name) {
            return variable;
          }
        }
      }
      return null;
    } catch (error) {
      console.warn(`Failed to find variable: ${error}`);
      return null;
    }
}