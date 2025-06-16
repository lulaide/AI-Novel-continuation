import { useState, useEffect, useRef } from 'react';
import './App.css';

// Simple SVG for a refresh/retry icon
const RefreshIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
  </svg>
);

// New ShimmerPlaceholder component
const ShimmerPlaceholder = ({ lines = 1, className = '' }) => (
  <div className={`shimmer-container ${className}`}>
    {Array.from({ length: lines }).map((_, i) => {
      let widthPercent;
      if (lines === 1) {
        widthPercent = Math.random() * 20 + 50; // 50-70%
      } else {
        if (i === lines - 1) {
          widthPercent = Math.random() * 20 + 30; // Last line: 30-50%
        } else if (lines > 2 && i === lines - 2) {
          widthPercent = Math.random() * 20 + 60; // Second to last line (if more than 2 lines): 60-80%
        } else {
          widthPercent = Math.random() * 10 + 85; // Other lines: 85-95%
        }
      }
      return (
        <div
          key={i}
          className="shimmer-line"
          style={{ width: `${widthPercent}%` }}
        ></div>
      );
    })}
  </div>
);


function App() {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [novelContent, setNovelContent] = useState('');
  const [endings, setEndings] = useState([]);
  const [selectedEnding, setSelectedEnding] = useState('');
  const [isLoadingEndings, setIsLoadingEndings] = useState(false);
  const [isLoadingContinuation, setIsLoadingContinuation] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef(null);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false); // New state for placeholder animation

  // Effect to adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [novelContent]); // Re-run when novelContent changes

  // Effect to manage placeholder visibility for animation
  useEffect(() => {
    if (isLoadingContinuation) {
      // Set placeholder to visible shortly after loading starts, to allow transition
      const timer = setTimeout(() => {
        setIsPlaceholderVisible(true);
      }, 10); // Small delay for CSS transition to catch initial state
      return () => clearTimeout(timer);
    } else {
      setIsPlaceholderVisible(false);
    }
  }, [isLoadingContinuation]);

  const handleGetEndings = async () => {
    if (!novelContent.trim()) {
      setError('请输入小说内容');
      return;
    }
    setError('');
    setIsLoadingEndings(true);
    setEndings([]); // Clear previous endings
    setSelectedEnding('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500)); // Increased delay for demo
      const mockEndings = [
        "罗兰举起银色法杖，点亮夜空，将园中黑影驱散，魔法国度重现生机。",
        "彼岸花凋零之际，少女献出一滴泪水，唤回沉睡的灵魂，花园得以重生。",
        "寒风中，骑士踏碎魔镜，以血肉之躯封印黑暗，王国迎来久违的曙光。",
        "吟游诗人轻吟旧曲，旋律化为暖流，抚慰受伤心灵，爱与希望蔓延四方。"
      ];
      setEndings(mockEndings);
      setHasGeneratedOnce(true);
    } catch (err) {
      setError('获取结局失败，请检查API Key和Base URL设置，或稍后再试。');
      console.error(err);
    } finally {
      setIsLoadingEndings(false);
    }
  };

  const handleContinueNovel = async () => {
    if (!selectedEnding) {
      setError('请先选择一个结局');
      return;
    }
    setError('');
    setIsLoadingContinuation(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500)); // Increased delay for demo
      const newlyGeneratedText = "又是一段精彩的续写内容，充满了奇幻与冒险的色彩，让读者仿佛身临其境，与主角一同探索未知的世界，感受那份独特的魅力与激情。";
      setNovelContent(prevContent => prevContent + '\n\n' + selectedEnding + '\n\n' + newlyGeneratedText);
      // setSelectedEnding(''); // Optional
    } catch (err) {
      setError('续写小说失败，请稍后再试。');
      console.error(err);
    } finally {
      setIsLoadingContinuation(false);
    }
  };

  const handleSaveApiKey = async () => {
    // 实际应替换为 fetch POST /api/v1/openai/key
    console.log('Saving API Key:', apiKey);
    alert('API Key 已保存 (模拟)');
  };

  const handleSaveBaseUrl = async () => {
    // 实际应替换为 fetch POST /api/v1/openai/base-url
    console.log('Saving Base URL:', baseUrl);
    alert('Base URL 已保存 (模拟)');
  };


  return (
    <div className="app-container">
      <h1>AI 小说续写</h1>

      {/* Settings Section - no changes here */}
      <div className="settings-container">
        <h2>设置</h2>
        <div className="setting-item">
          <label htmlFor="apiKey">OpenAI API Key:</label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-xxxx"
          />
          <button onClick={handleSaveApiKey}>保存Key</button>
        </div>
        <div className="setting-item">
          <label htmlFor="baseUrl">OpenAI Base URL:</label>
          <input
            type="text"
            id="baseUrl"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://api.openai.com/v1"
          />
          <button onClick={handleSaveBaseUrl}>保存URL</button>
        </div>
      </div>

      {/* Renamed container and added a new column for textarea and its placeholder */}
      <div className="novel-input-processing-area">
        <div className="novel-input-main-column">
          <textarea
            ref={textareaRef}
            value={novelContent}
            onChange={(e) => setNovelContent(e.target.value)}
            placeholder="在此输入你的小说开头..."
            className={isLoadingContinuation ? 'textarea-connected-to-placeholder' : ''} // Apply class when loading continuation
          />
          {/* Placeholder for continuation - MOVED HERE and wrapped */}
          {isLoadingContinuation && ( // Mount when loading
            <div className={`continuation-placeholder-wrapper ${isPlaceholderVisible ? 'visible' : ''}`}> {/* Control visibility for animation */}
              <ShimmerPlaceholder lines={3} />
            </div>
          )}
        </div>
        <button onClick={handleGetEndings} disabled={isLoadingEndings || isLoadingContinuation} className="arrow-button">
          {isLoadingEndings ? (
            <div className="loader-small"></div>
          ) : hasGeneratedOnce ? (
            <RefreshIcon />
          ) : (
            '➤'
          )}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Endings section with shimmer placeholders */}
      {(isLoadingEndings || endings.length > 0) && (
         <div className="endings-container">
           <h2>{isLoadingEndings && !endings.length ? '正在生成结局...' : '选择一个结局：'}</h2>
           <div className="endings-grid">
             {isLoadingEndings ? (
               Array.from({ length: 4 }).map((_, index) => (
                 <div key={`placeholder-${index}`} className="ending-card is-loading">
                   <ShimmerPlaceholder lines={4} />
                 </div>
               ))
             ) : (
               endings.map((ending, index) => (
                 <div
                   key={index}
                   className={`ending-card ${selectedEnding === ending ? 'selected' : ''}`}
                   onClick={() => setSelectedEnding(ending)}
                 >
                   {ending}
                 </div>
               ))
             )}
           </div>
           {!isLoadingEndings && endings.length > 0 && (
             <button onClick={handleContinueNovel} disabled={!selectedEnding || isLoadingContinuation} className="generate-button">
               {isLoadingContinuation ? (
                 <>
                   正在生成...
                   <div className="loader-inline"></div>
                 </>
               ) : (
                 '生成续写'
               )}
             </button>
           )}
         </div>
       )}
    </div>
  );
}

export default App;
