import React from 'react';
import { useDarkMode } from '../src/hooks/useDarkMode';
import { CSSMABox } from '../src/components/CSSMABox';

/**
 * 다크모드 예제 컴포넌트
 * 
 * useDarkMode hook을 사용하여 다크모드를 관리하는 방법을 보여줍니다.
 */
const DarkModeExample: React.FC = () => {
  // useDarkMode hook 사용
  const [isDark, setDarkMode, toggleDarkMode] = useDarkMode({
    defaultMode: 'system', // 'light', 'dark', 'system' 중 하나
  });

  return (
    <CSSMABox className="min-h-screen p-8 transition-colors duration-300 bg-white dark:bg-gray-900">
      <CSSMABox className="max-w-3xl mx-auto">
        <CSSMABox className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
            CSSMA v2 다크모드 예제
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            useDarkMode hook을 사용하여 다크모드를 쉽게 관리할 수 있습니다.
          </p>
        </CSSMABox>

        <CSSMABox className="p-6 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            현재 테마 설정
          </h2>
          <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
            현재 모드: <strong>{isDark ? '다크 모드' : '라이트 모드'}</strong>
          </p>

          <CSSMABox className="flex flex-wrap gap-3">
            <button
              onClick={() => setDarkMode('light')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !isDark
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              라이트 모드
            </button>
            <button
              onClick={() => setDarkMode('dark')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isDark
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              다크 모드
            </button>
            <button
              onClick={() => setDarkMode('system')}
              className="px-4 py-2 rounded-md font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
            >
              시스템 설정
            </button>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-md font-medium bg-indigo-500 text-white transition-colors"
            >
              토글
            </button>
          </CSSMABox>
        </CSSMABox>

        <CSSMABox className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CSSMABox className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              다크모드 사용법
            </h2>
            <CSSMABox className="text-gray-700 dark:text-gray-300 space-y-2">
              <p>1. useDarkMode hook을 import 합니다.</p>
              <p>2. 컴포넌트에서 hook을 호출합니다.</p>
              <p>3. 반환된 상태와 함수를 사용하여 다크모드를 관리합니다.</p>
            </CSSMABox>
          </CSSMABox>

          <CSSMABox className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              코드 예제
            </h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
              {`
import { useDarkMode } from 'cssma-react-v2';

function App() {
  const [isDark, setDarkMode, toggleDarkMode] = useDarkMode();
  
  return (
    <div>
      <p>현재 모드: {isDark ? '다크' : '라이트'}</p>
      <button onClick={() => setDarkMode('light')}>라이트</button>
      <button onClick={() => setDarkMode('dark')}>다크</button>
      <button onClick={toggleDarkMode}>토글</button>
    </div>
  );
}
              `}
            </pre>
          </CSSMABox>
        </CSSMABox>

        <CSSMABox className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            다크모드 적용 예시
          </h2>
          <CSSMABox className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CSSMABox className="p-4 bg-blue-100 dark:bg-blue-900 rounded-md text-blue-900 dark:text-blue-100">
              블루 카드
            </CSSMABox>
            <CSSMABox className="p-4 bg-green-100 dark:bg-green-900 rounded-md text-green-900 dark:text-green-100">
              그린 카드
            </CSSMABox>
            <CSSMABox className="p-4 bg-red-100 dark:bg-red-900 rounded-md text-red-900 dark:text-red-100">
              레드 카드
            </CSSMABox>
          </CSSMABox>
        </CSSMABox>

        <CSSMABox className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p>CSSMA v2 - 다크모드 시스템 예제</p>
        </CSSMABox>
      </CSSMABox>
    </CSSMABox>
  );
};

export default DarkModeExample; 