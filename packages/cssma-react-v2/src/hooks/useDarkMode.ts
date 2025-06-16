import { useCallback, useEffect, useState } from 'react';

// TODO: cssma-v2가 설치되면 아래 주석을 해제하고 직접 import 사용
// import { isDarkMode, toggleDarkMode } from 'cssma-v2';

// 임시로 다크모드 함수 직접 구현
const isDarkMode = (): boolean => {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
};

const toggleDarkMode = (
  mode: 'light' | 'dark' | 'system' | 'toggle' = 'toggle',
  options: { className?: string; storageKey?: string } = {}
): boolean => {
  if (typeof document === 'undefined') return false;
  
  const className = options.className || 'dark';
  const storageKey = options.storageKey || 'cssma-theme';
  const html = document.documentElement;
  
  // 현재 상태 확인
  const isDark = html.classList.contains(className);
  
  // 모드에 따라 처리
  let newIsDark = isDark;
  
  switch (mode) {
    case 'toggle':
      newIsDark = !isDark;
      break;
    case 'dark':
      newIsDark = true;
      break;
    case 'light':
      newIsDark = false;
      break;
    case 'system':
      if (typeof window !== 'undefined' && window.matchMedia) {
        newIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        localStorage.removeItem(storageKey); // 시스템 설정 사용 시 저장소에서 제거
      }
      break;
  }
  
  // DOM 및 localStorage 업데이트
  if (newIsDark) {
    html.classList.add(className);
    if (mode !== 'system') localStorage.setItem(storageKey, 'dark');
  } else {
    html.classList.remove(className);
    if (mode !== 'system') localStorage.setItem(storageKey, 'light');
  }
  
  return newIsDark;
};

/**
 * 다크모드를 관리하는 React Hook
 * 
 * @param options 다크모드 옵션
 * @returns [isDarkMode, setDarkMode, toggleDarkMode] - 다크모드 상태, 설정 함수, 토글 함수
 * 
 * @example
 * ```tsx
 * import { useDarkMode } from 'cssma-react-v2';
 * 
 * function App() {
 *   const [isDark, setDarkMode, toggleDarkMode] = useDarkMode();
 *   
 *   return (
 *     <div>
 *       <p>현재 모드: {isDark ? '다크' : '라이트'}</p>
 *       <button onClick={() => setDarkMode('light')}>라이트 모드</button>
 *       <button onClick={() => setDarkMode('dark')}>다크 모드</button>
 *       <button onClick={() => setDarkMode('system')}>시스템 모드</button>
 *       <button onClick={toggleDarkMode}>토글</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useDarkMode(options?: {
  className?: string;
  storageKey?: string;
  defaultMode?: 'light' | 'dark' | 'system';
}) {
  // 초기 다크모드 상태 확인
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // SSR 환경에서는 false 반환
    if (typeof window === 'undefined') return false;
    return isDarkMode();
  });
  
  // 옵션 설정
  const className = options?.className || 'dark';
  const storageKey = options?.storageKey || 'cssma-theme';
  const defaultMode = options?.defaultMode || 'system';
  
  // 다크모드 초기화
  useEffect(() => {
    // SSR 환경에서는 실행하지 않음
    if (typeof window === 'undefined') return;
    
    // 저장된 테마 설정 확인
    const savedTheme = localStorage.getItem(storageKey);
    
    // 저장된 설정이 있으면 적용, 없으면 기본값 사용
    if (savedTheme === 'dark') {
      const isDark = toggleDarkMode('dark', { className, storageKey });
      setDarkMode(isDark);
    } else if (savedTheme === 'light') {
      const isDark = toggleDarkMode('light', { className, storageKey });
      setDarkMode(isDark);
    } else {
      const isDark = toggleDarkMode(defaultMode, { className, storageKey });
      setDarkMode(isDark);
    }
    
    // 시스템 설정 변경 감지 (시스템 모드일 때만 적용)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // 사용자가 직접 설정하지 않은 경우에만 시스템 설정 따름
      if (localStorage.getItem(storageKey) === null) {
        const isDark = toggleDarkMode('system', { className, storageKey });
        setDarkMode(isDark);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [className, storageKey, defaultMode]);
  
  // 다크모드 설정 함수
  const setMode = useCallback((mode: 'light' | 'dark' | 'system') => {
    const isDark = toggleDarkMode(mode, { className, storageKey });
    setDarkMode(isDark);
    return isDark;
  }, [className, storageKey]);
  
  // 다크모드 토글 함수
  const toggle = useCallback(() => {
    const isDark = toggleDarkMode('toggle', { className, storageKey });
    setDarkMode(isDark);
    return isDark;
  }, [className, storageKey]);
  
  return [darkMode, setMode, toggle] as const;
}

export default useDarkMode; 