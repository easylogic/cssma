import { figmaToStyle, processStyles, createNodeForData, applyStyles } from '@easylogic/cssma';

// RGB 색상을 16진수 문자열로 변환하는 함수
function colorToHex(color: { r: number, g: number, b: number }): string {
  // RGB 값을 0-255 범위로 변환하고 반올림
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);

  // 16진수로 변환하고 2자리로 패딩 (padStart 대신 직접 구현)
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// 플러그인 UI 표시
figma.showUI(__html__, {
    width: 480,
  height: 700,
});

// 메뉴 커맨드 핸들러
figma.on("run", (event) => {
  if (event.command === "convert-css") {
    figma.ui.postMessage({ type: "show-converter" });
  } else if (event.command === "create-component") {
    figma.ui.postMessage({ type: "show-component-creator" });
  }
});

// 선택 변경 이벤트 처리
figma.on('selectionchange', () => {
  updateSelectionInfo();
});

// 현재 선택 정보 UI로 전송
function updateSelectionInfo() {
  try {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 1) {
      const node = selection[0];
      
      figma.ui.postMessage({
        type: 'selection-change',
        message: {
          id: node.id,
          name: node.name,
          type: node.type,
          styles: figmaToStyle(node)
        }
      });
    } else if (selection.length > 1) {
      // 여러 항목이 선택된 경우
      figma.ui.postMessage({
        type: 'selection-change',
        message: {
          id: 'multiple',
          name: `${selection.length}개 항목 선택됨`,
          type: 'MULTIPLE',
          count: selection.length
        }
      });
    } else {
      figma.ui.postMessage({
        type: 'selection-change',
        message: null
      });
    }
  } catch (error) {
    console.error('선택 정보 업데이트 중 오류:', error);
  }
}

// 메시지 핸들러
figma.ui.onmessage = async (msg) => {
  try {
  switch (msg.type) {
      case 'init':
        // 초기 선택 정보 전송
        updateSelectionInfo();
        break;
        
      case 'apply-styles':
        await applyStylesToSelection(msg.cssInput);
        break;
        
      case 'create-component':
        await createComponentFromSpec(msg.componentSpec);
        break;
        
      case 'analyze-selection':
        analyzeSelection();
        break;

    case 'create-design-system':
        createDesignSystem();
      break;

      default:
        console.log('알 수 없는 메시지 타입:', msg.type);
        break;
    }
  } catch (error) {
    console.error('메시지 처리 중 오류:', error);
    figma.notify('작업 처리 중 오류가 발생했습니다: ' + (error as Error).message, { error: true });
  }
};

// 선택된 요소에 스타일 적용
async function applyStylesToSelection(cssInput: string) {
  // cssInput이 null이거나 undefined이거나 빈 문자열인 경우 처리
  if (!cssInput || cssInput.trim() === '') {
    figma.notify('CSS 또는 Tailwind 코드를 입력해주세요');
    return;
  }

  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('요소를 선택해주세요');
    return;
  }
  
  // 로딩 표시
  figma.notify('스타일 적용 중...', { timeout: 500 });
  
  try {
    // 필요한 글꼴 로드 (한 번만 로드)
    await Promise.all([
      figma.loadFontAsync({ family: "Inter", style: "Regular" }),
      figma.loadFontAsync({ family: "Inter", style: "Medium" }),
      figma.loadFontAsync({ family: "Inter", style: "Bold" })
    ]);
    
    // 스타일 처리 (한 번만 처리)
    const styles = processStyles(cssInput);
    
    // 모든 선택 노드에 스타일 적용
    for (const node of selection) {
      // 스타일 적용 전에 작업 기록 시작
      figma.skipInvisibleInstanceChildren = true;
      
      // applyStyles 함수 사용
      await applyStyles(node, cssInput);
    }
    
    figma.notify('스타일이 적용되었습니다');
  } catch (error) {
    console.error('스타일 적용 중 오류:', error);
    figma.notify('스타일 적용 중 오류가 발생했습니다: ' + (error as Error).message, { error: true });
  }
}

// 스펙에서 컴포넌트 생성
async function createComponentFromSpec(componentSpec: any) {
  if (!componentSpec) {
    figma.notify('유효한 컴포넌트 스펙을 입력해주세요');
    return;
  }
  
  // 로딩 표시
  figma.notify('컴포넌트 생성 중...', { timeout: 500 });
  
  try {
    // 글꼴 로드
    await Promise.all([
      figma.loadFontAsync({ family: "Inter", style: "Regular" }),
      figma.loadFontAsync({ family: "Inter", style: "Medium" })
    ]);
    
    // 노드 생성
    const node = await createNodeForData(componentSpec);
    
    // 컴포넌트 위치 설정
    node.x = figma.viewport.center.x - node.width / 2;
    node.y = figma.viewport.center.y - node.height / 2;
    
    // 현재 페이지에 추가
    figma.currentPage.appendChild(node);
    
    // 뷰포트 초점 맞추기
    figma.viewport.scrollAndZoomIntoView([node]);
    
    // 선택 상태로 설정
    figma.currentPage.selection = [node];
    
    figma.notify('컴포넌트가 생성되었습니다');
  } catch (error) {
    console.error('컴포넌트 생성 중 오류:', error);
    figma.notify('컴포넌트 생성 중 오류가 발생했습니다: ' + (error as Error).message, { error: true });
  }
}

// 노드 및 그 자식들을 재귀적으로 분석하는 함수
function analyzeNodeTree(node: SceneNode, depth: number = 0): any {
  // 기본 노드 정보 추출
  const nodeInfo: any = {
    id: node.id,
    name: node.name,
    type: node.type,
    styles: figmaToStyle(node),
    children: []
  };

  // 자식 노드가 있는 경우 재귀적으로 분석
  if ('children' in node && node.children.length > 0) {
    // @ts-ignore
    nodeInfo.children = node.children.map(child => analyzeNodeTree(child, depth + 1));
  }

  // TEXT 노드인 경우 텍스트 내용 및 리치 텍스트 스타일링 정보 추출
  if (node.type === 'TEXT') {
    const textNode = node as TextNode;
    
    // 기본 텍스트 내용
    nodeInfo.text = textNode.characters;
    
    try {
      // 기본 스타일 정보 수집
      const defaultStyles: any = {};
      
      if (textNode.fontSize) defaultStyles.fontSize = textNode.fontSize;
      if (textNode.fontName) defaultStyles.fontName = textNode.fontName;
      if (textNode.fontWeight) defaultStyles.fontWeight = textNode.fontWeight;
      if (textNode.textDecoration) defaultStyles.textDecoration = textNode.textDecoration;
      if (textNode.textCase) defaultStyles.textCase = textNode.textCase;
      if (textNode.lineHeight) defaultStyles.lineHeight = textNode.lineHeight;
      if (textNode.letterSpacing) defaultStyles.letterSpacing = textNode.letterSpacing;
      if (textNode.textAlignHorizontal) defaultStyles.textAlignHorizontal = textNode.textAlignHorizontal;
      if (textNode.textAlignVertical) defaultStyles.textAlignVertical = textNode.textAlignVertical;
      if (textNode.paragraphIndent) defaultStyles.paragraphIndent = textNode.paragraphIndent;
      if (textNode.paragraphSpacing) defaultStyles.paragraphSpacing = textNode.paragraphSpacing;
      
      try {
        // getStyledTextSegments 메서드가 있는 경우 스타일이 다른 텍스트 세그먼트 추출
        const fontStyles = textNode.getStyledTextSegments([
          'fontSize', 
          'fontName', 
          'fontWeight', 
          'textDecoration',
          'textDecorationColor',
          'textDecorationOffset',
          'textDecorationSkipInk',
          'textDecorationStyle',
          'textDecorationThickness',
          'textCase',
          'lineHeight',
          'letterSpacing',
          'paragraphIndent',
          'paragraphSpacing',
          'fills'
        ]);
        
        // 여러 스타일 세그먼트가 있을 때만 richText 배열 생성
        if (fontStyles.length > 1) {
          nodeInfo.richText = fontStyles.map(segment => {
            const styles: any = {};
            
            // 스타일 속성 추출
            if (segment.fontSize) styles.fontSize = segment.fontSize;
            if (segment.fontName) styles.fontName = segment.fontName;
            if (segment.fontWeight) styles.fontWeight = segment.fontWeight;
            if (segment.textDecoration) styles.textDecoration = segment.textDecoration;
            if (segment.textDecorationColor) styles.textDecorationColor = segment.textDecorationColor;
            if (segment.textDecorationOffset) styles.textDecorationOffset = segment.textDecorationOffset;
            if (segment.textDecorationSkipInk) styles.textDecorationSkipInk = segment.textDecorationSkipInk;
            if (segment.textDecorationStyle) styles.textDecorationStyle = segment.textDecorationStyle;
            if (segment.textDecorationThickness) styles.textDecorationThickness = segment.textDecorationThickness;
            if (segment.textCase) styles.textCase = segment.textCase;
            if (segment.lineHeight) styles.lineHeight = segment.lineHeight;
            if (segment.letterSpacing) styles.letterSpacing = segment.letterSpacing;
            if (segment.paragraphIndent) styles.paragraphIndent = segment.paragraphIndent;
            if (segment.paragraphSpacing) styles.paragraphSpacing = segment.paragraphSpacing;
            
            // 색상 정보 추가
            if (segment.fills && segment.fills.length > 0) {
              const fill = segment.fills[0];
              if (fill.type === 'SOLID') {
                styles.color = colorToHex(fill.color);
                if (fill.opacity !== undefined && fill.opacity !== 1) {
                  styles.opacity = fill.opacity;
                }
              }
            }
            
            return {
              type: 'TEXT',
              text: segment.characters,
              start: segment.start,
              end: segment.end,
              styles
            };
          });
        }
        
      } catch (error) {
        // getStyledTextSegments 메서드가 없는 경우 fallback
        console.warn('getStyledTextSegments 메서드 사용 실패, fallback 사용:', error);
        
        // 전체 텍스트를 하나의 세그먼트로 처리
        const styles = { ...defaultStyles };
        
        // 색상 정보 추가
        if (textNode.fills && Array.isArray(textNode.fills) && textNode.fills.length > 0) {
          const fill = textNode.fills[0];
          if (fill.type === 'SOLID') {
            styles.color = colorToHex(fill.color);
            if (fill.opacity !== undefined && fill.opacity !== 1) {
              styles.opacity = fill.opacity;
            }
          }
        }
        
        nodeInfo.richText = [{
          text: textNode.characters,
          start: 0,
          end: textNode.characters.length,
          styles
        }];
      }
    } catch (error) {
      console.warn('리치 텍스트 분석 중 오류:', error);
    }
  }

  return nodeInfo;
}

// 선택 분석
function analyzeSelection() {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.notify('요소를 선택해주세요');
    return;
  }
  
  // 로딩 표시
  figma.notify('선택 항목 분석 중...', { timeout: 500 });
  
  try {
    // 분석 모드 결정 (단일 노드 vs 트리 구조)
    const isTreeMode = selection.length === 1; // 하나만 선택한 경우 트리 모드로 분석
    
    let result;
    if (isTreeMode) {
      // 단일 선택 시 해당 노드의 전체 트리 분석
      result = analyzeNodeTree(selection[0]);
    } else {
      // 다중 선택 시 각 노드만 분석 (이전 방식 유지)
      result = selection.map(node => {
        return analyzeNodeTree(node);
      });
    }
    
    figma.ui.postMessage({
      type: 'analysis-result',
      message: result,
      isTreeMode: isTreeMode
    });
    
    figma.notify(`분석 완료: ${isTreeMode ? '트리 구조' : `${selection.length}개 항목`} 분석됨`);
  } catch (error) {
    console.error('분석 중 오류:', error);
    figma.notify('요소 분석 중 오류가 발생했습니다: ' + (error as Error).message, { error: true });
  }
}

// 디자인 시스템 생성
function createDesignSystem() {
  try {
    // 현재 선택된 요소 확인
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.notify('디자인 시스템에 포함할 요소를 선택해주세요');
      return;
    }
    
    // 로딩 표시
    figma.notify('디자인 시스템 생성 중...', { timeout: 1000 });
    
    // 색상 추출
    const colors = extractColorsFromSelection(selection);
    
    // 디자인 시스템용 페이지 생성
    const dsPage = figma.createPage();
    dsPage.name = 'Design System';
    
    // 컬러 팔레트 섹션 생성
    createColorPalette(dsPage, colors);
    
    // 타이포그래피 섹션 생성
    createTypographySection(dsPage);
    
    // 컴포넌트 섹션 생성
    createComponentSection(dsPage, selection);
    
    // 페이지로 이동
    figma.currentPage = dsPage;
    
    figma.notify('디자인 시스템이 생성되었습니다');
  } catch (error) {
    console.error('디자인 시스템 생성 중 오류:', error);
    figma.notify('디자인 시스템 생성 중 오류가 발생했습니다: ' + (error as Error).message, { error: true });
  }
}

// 선택 항목에서 색상 추출
function extractColorsFromSelection(selection: readonly SceneNode[]): Array<{name: string, color: RGB}> {
  const colorMap = new Map<string, RGB>();
  
  // 모든 노드를 재귀적으로 방문하여 색상 추출
  function visitNode(node: SceneNode) {
    // 채우기(Fill) 검사
    if ('fills' in node && node.fills && Array.isArray(node.fills)) {
      for (const fill of node.fills) {
        if (fill.type === 'SOLID' && fill.color) {
          const colorKey = `${Math.round(fill.color.r * 255)}_${Math.round(fill.color.g * 255)}_${Math.round(fill.color.b * 255)}`;
          colorMap.set(colorKey, fill.color);
        }
      }
    }
    
    // 테두리(Stroke) 검사
    if ('strokes' in node && node.strokes && Array.isArray(node.strokes)) {
      for (const stroke of node.strokes) {
        if (stroke.type === 'SOLID' && stroke.color) {
          const colorKey = `${Math.round(stroke.color.r * 255)}_${Math.round(stroke.color.g * 255)}_${Math.round(stroke.color.b * 255)}`;
          colorMap.set(colorKey, stroke.color);
        }
      }
    }
    
    // 자식 노드 방문
    if ('children' in node && node.children) {
      for (const child of node.children) {
        visitNode(child);
      }
    }
  }
  
  // 모든 선택 항목에 대해 색상 추출
  for (const node of selection) {
    visitNode(node);
  }
  
  // 결과 변환
  return Array.from(colorMap.entries()).map(([key, color], index) => {
    return {
      name: `Color ${index + 1}`,
      color
    };
  });
}

// 컬러 팔레트 섹션 생성
function createColorPalette(page: PageNode, colors: Array<{name: string, color: RGB}>) {
  const colorSection = figma.createFrame();
  colorSection.name = 'Colors';
  colorSection.layoutMode = 'HORIZONTAL';
  colorSection.itemSpacing = 16;
  colorSection.paddingLeft = 24;
  colorSection.paddingRight = 24;
  colorSection.paddingTop = 24;
  colorSection.paddingBottom = 24;
  colorSection.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  colorSection.resize(800, 200);
  page.appendChild(colorSection);
  
  // 색상이 없으면 기본 색상 추가
  if (colors.length === 0) {
    colors = [
      { name: 'Primary', color: {r: 0.07, g: 0.47, b: 0.95} },
      { name: 'Secondary', color: {r: 0.56, g: 0.35, b: 0.97} },
      { name: 'Success', color: {r: 0.12, g: 0.73, b: 0.29} },
      { name: 'Warning', color: {r: 1, g: 0.8, b: 0} },
      { name: 'Error', color: {r: 0.93, g: 0.26, b: 0.26} },
      { name: 'Gray', color: {r: 0.5, g: 0.5, b: 0.5} }
    ];
  }
  
  // 색상 스와치 생성
  for (const [index, color] of colors.entries()) {
    // 색상 스타일 생성
    const styleId = figma.createPaintStyle();
    styleId.name = color.name;
    styleId.paints = [{type: 'SOLID', color: color.color}];
    
    // 색상 스와치 생성
    const colorSwatch = figma.createFrame();
    colorSwatch.name = color.name;
    colorSwatch.layoutMode = 'VERTICAL';
    colorSwatch.resize(80, 120);
    colorSwatch.x = index * 100;
    
    // 색상 박스
    const colorBox = figma.createRectangle();
    colorBox.name = 'Color';
    colorBox.resize(80, 80);
    colorBox.fills = [{type: 'SOLID', color: color.color}];
    colorSwatch.appendChild(colorBox);
    
    // 색상 이름 텍스트
    const nameText = figma.createText();
    nameText.name = 'Name';
    nameText.characters = color.name;
    nameText.fontSize = 12;
    nameText.y = 88;
    nameText.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    colorSwatch.appendChild(nameText);
    
    // 색상 값 텍스트
    const valueText = figma.createText();
    valueText.name = 'Value';
    valueText.characters = `RGB(${Math.round(color.color.r * 255)}, ${Math.round(color.color.g * 255)}, ${Math.round(color.color.b * 255)})`;
    valueText.fontSize = 10;
    valueText.y = 104;
    valueText.fills = [{type: 'SOLID', color: {r: 0.5, g: 0.5, b: 0.5}}];
    colorSwatch.appendChild(valueText);
    
    colorSection.appendChild(colorSwatch);
  }
}

// 타이포그래피 섹션 생성
function createTypographySection(page: PageNode) {
  const textSection = figma.createFrame();
  textSection.name = 'Typography';
  textSection.layoutMode = 'VERTICAL';
  textSection.itemSpacing = 24;
  textSection.paddingLeft = 24;
  textSection.paddingRight = 24;
  textSection.paddingTop = 24;
  textSection.paddingBottom = 24;
  textSection.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  textSection.resize(800, 400);
  textSection.y = 240;
  page.appendChild(textSection);
  
  // 텍스트 스타일 정의
  const textStyles = [
    { name: 'Heading 1', size: 32, weight: 'Bold' },
    { name: 'Heading 2', size: 24, weight: 'Bold' },
    { name: 'Heading 3', size: 20, weight: 'Medium' },
    { name: 'Body', size: 16, weight: 'Regular' },
    { name: 'Caption', size: 12, weight: 'Regular' }
  ];
  
  // 텍스트 스타일 생성
  for (const [index, style] of textStyles.entries()) {
    // 텍스트 스타일 생성
    const textStyleId = figma.createTextStyle();
    textStyleId.name = style.name;
    textStyleId.fontSize = style.size;
    textStyleId.fontName = { family: 'Inter', style: style.weight };
    
    // 텍스트 샘플 생성
    const textSample = figma.createText();
    textSample.name = style.name;
    textSample.characters = style.name;
    textSample.fontSize = style.size;
    textSample.fontName = { family: 'Inter', style: style.weight };
    textSample.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];
    textSample.y = index * (style.size + 16);
    
    textSection.appendChild(textSample);
  }
}

// 컴포넌트 섹션 생성
function createComponentSection(page: PageNode, selection: readonly SceneNode[]) {
  const componentSection = figma.createFrame();
  componentSection.name = 'Components';
  componentSection.layoutMode = 'VERTICAL';
  componentSection.itemSpacing = 40;
  componentSection.paddingLeft = 24;
  componentSection.paddingRight = 24;
  componentSection.paddingTop = 24;
  componentSection.paddingBottom = 24;
  componentSection.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
  componentSection.resize(800, 600);
  componentSection.y = 680;
  page.appendChild(componentSection);
  
  // 선택한 항목들을 컴포넌트로 변환하여 디자인 시스템에 추가
  selection.forEach((node, index) => {
    if (node.type !== 'INSTANCE') {
      try {
        const component = figma.createComponent();
        component.resize(node.width, node.height);
        
        // 노드 복제 및 컴포넌트에 추가
        const clone = node.clone();
        component.appendChild(clone);
        
        // 클론 위치 조정 (컴포넌트 내부에서 0,0 위치로)
        clone.x = 0;
        clone.y = 0;
        
        // 컴포넌트 위치 조정
        component.x = 0;
        component.y = index * (node.height + 24);
        
        // 스타일 및 이름 설정
        component.name = node.name + ' Component';
        
        // 컴포넌트 섹션에 추가
        componentSection.appendChild(component);
      } catch (err) {
        console.error('컴포넌트 생성 중 오류:', err);
      }
    }
  });
}