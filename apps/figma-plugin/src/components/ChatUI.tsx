import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';
import Placeholder from '@tiptap/extension-placeholder';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  status: 'sending' | 'sent' | 'error';
}

interface ChatUIProps {
  onSendMessage: (message: string) => Promise<void>;
}

const markdownStyles = {
  user: 'prose prose-sm prose-invert max-w-none text-[0.9rem] leading-[1.5] break-words' +
        ' [&_code]:bg-blue-400 [&_code]:bg-opacity-50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded' +
        ' [&_pre]:bg-blue-400 [&_pre]:bg-opacity-30 [&_pre]:p-2 [&_pre]:rounded' +
        ' [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5' +
        ' [&_a]:text-blue-100 [&_a]:underline [&_a]:font-medium',

  assistant: 'prose prose-sm max-w-none text-[0.9rem] leading-[1.5] break-words' +
             ' [&_code]:bg-gray-200 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-gray-800' +
             ' [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:my-2 [&_pre]:overflow-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0' +
             ' [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2' +
             ' [&_p]:my-2 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:my-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:my-2' +
             ' [&_h3]:text-base [&_h3]:font-bold [&_h3]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:my-2' +
             ' [&_a]:text-blue-600 [&_a]:underline [&_a]:font-medium' +
             ' [&_table]:border-collapse [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:p-2'
};

// ChatUI 컴포넌트에 추가할 초기 메시지
const chatInitialMessage = `# 안녕하세요! Figma 디자인 프레임 생성을 도와드리겠습니다.

다음과 같은 형식으로 요청해주세요:

## 1. 페이지/섹션 유형
- 랜딩 페이지, 제품 상세, 블로그 등
- 원하는 섹션 구성 (히어로, 피처, 갤러리 등)

## 2. 레이아웃 선호도
- 전체 너비 활용 또는 제한된 너비
- 단일 컬럼 또는 멀티 컬럼
- 그리드 구조 선호도

## 3. 스타일 가이드
- 색상 톤 (밝은/어두운, 특정 색상 선호)
- 여백 활용도 (조밀한/여유로운)
- 시각적 강조점

### 예시 요청:
\`\`\`
깔끔한 SaaS 랜딩 페이지를 만들어주세요.
히어로 섹션에는 큰 제목과 설명,
그 아래에는 3개의 주요 기능을 보여주는 카드 섹션,
마지막으로 고객 후기 섹션을 넣어주세요.
전체적으로 밝은 톤에 파란색 포인트를 사용하고,
여유로운 여백으로 가독성을 높여주세요.
\`\`\``;

// 마크다운 서식 도우미 버튼 정의
interface MarkdownHelper {
  icon: string;
  title: string;
  action: (editor: any) => void;
}

const markdownHelpers: MarkdownHelper[] = [
  {
    icon: "B",
    title: "굵게",
    action: (editor) => editor.chain().focus().toggleBold().run()
  },
  {
    icon: "H1",
    title: "제목 1",
    action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run()
  },
  {
    icon: "H2",
    title: "제목 2",
    action: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run()
  },
  {
    icon: "•",
    title: "글머리 기호",
    action: (editor) => editor.chain().focus().toggleBulletList().run()
  },
  {
    icon: "1.",
    title: "번호 매기기",
    action: (editor) => editor.chain().focus().toggleOrderedList().run()
  },
  {
    icon: "</>",
    title: "코드",
    action: (editor) => editor.chain().focus().toggleCodeBlock().run()
  },
  {
    icon: "`",
    title: "인라인 코드",
    action: (editor) => editor.chain().focus().toggleCode().run()
  },
  {
    icon: "🔗",
    title: "링크",
    action: (editor) => {
      const url = prompt("URL을 입력하세요:");
      if (url) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      }
    }
  }
];

export const ChatUI: React.FC<ChatUIProps> = ({ onSendMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: chatInitialMessage,
      timestamp: Date.now(),
      status: 'sent'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Markdown,
      Placeholder.configure({
        placeholder: 'Type your message here... (Markdown supported)'
      })
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[60px] max-h-[200px] overflow-y-auto p-2'
      }
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor || !editor.getText().trim() || isLoading) return;

    const markdown = editor.storage.markdown.getMarkdown();
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: markdown,
      timestamp: Date.now(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    editor.commands.clearContent();
    setIsLoading(true);

    try {
      await onSendMessage(markdown);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    } catch (error) {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'error' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 260px)' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-900'
              }`}
            >
              <div className={markdownStyles[message.type]}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSanitize, rehypeRaw]}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                }`}
              >
                {message.status === 'sending' && 'Sending...'}
                {message.status === 'error' && 'Error sending message'}
                {message.status === 'sent' &&
                  new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Editor Area */}
      <form onSubmit={handleSubmit} className="border-t flex-shrink-0 p-4 mb-0">
        <div className="flex flex-col space-y-2">
          <div className="relative border rounded-lg">
            <EditorContent 
              editor={editor} 
              className="prose prose-sm focus:outline-none min-h-[60px] max-h-[60px] overflow-y-auto p-2
                [&_p]:my-1 
                [&_h1]:text-xl [&_h1]:font-bold [&_h1]:my-2
                [&_h2]:text-lg [&_h2]:font-bold [&_h2]:my-2
                [&_h3]:text-base [&_h3]:font-bold [&_h3]:my-1
                [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-1
                [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:my-1
                [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded
                [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:rounded [&_pre]:my-1
                [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:my-1
                [&_a]:text-blue-600 [&_a]:underline"
              onKeyDown={handleKeyDown}
            />
            {isLoading && (
              <div className="absolute right-3 bottom-3">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
              </div>
            )}
          </div>

          {/* 마크다운 서식 도우미 버튼 */}
          <div className="flex space-x-1 overflow-x-auto pb-1">
            {markdownHelpers.map((helper, index) => (
              <button
                key={index}
                type="button"
                title={helper.title}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                onClick={() => editor && helper.action(editor)}
              >
                {helper.icon}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="text-xs">
              Shift + Enter for new line, Enter to send
            </div>
            <button
              type="submit"
              disabled={isLoading || !editor?.getText().trim()}
              className={`px-4 py-2 rounded-lg ${
                isLoading || !editor?.getText().trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}; 