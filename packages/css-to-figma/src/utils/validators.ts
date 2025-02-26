import type { BaseNode, SceneNode } from '@figma/plugin-typings';

/**
 * 레이아웃 스타일의 유효성을 검사하고 필요한 경우 수정합니다.
 * 특히 w-full, h-full과 같은 스타일이 부모 노드의 레이아웃 모드와 호환되는지 확인합니다.
 */
export function validateLayoutStyles(parent: BaseNode | null, child: SceneNode, styles: string[]): string[] {
  // 부모가 없거나 레이아웃 모드가 없는 경우
  if (!parent || !('layoutMode' in parent)) {
    return styles.map(style => {
      // w-full, h-full을 w-auto, h-auto로 변환
      if (style === 'w-full' || style === 'h-full') {
        return style.replace('full', 'auto');
      }
      return style;
    });
  }

  // 부모에 레이아웃 모드가 있는 경우 스타일을 그대로 유지
  return styles;
}
