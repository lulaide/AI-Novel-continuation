import { useState, useEffect, useRef } from 'react';
import './App.css';

// Simple SVG for a refresh/retry icon
const RefreshIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="currentColor"/>
  </svg>
);

// Gear Icon SVG
const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.61l-1.92-3.32a.5.5 0 0 0-.59-.22l-2.39.96a6.5 6.5 0 0 0-1.62-.94L14.4 2.25a.5.5 0 0 0-.53-.41h-3.74a.5.5 0 0 0-.53.41L9.21 4.63a6.5 6.5 0 0 0-1.62.94l-2.39-.96a.5.5 0 0 0-.59.22L2.68 8.15a.5.5 0 0 0 .12.61l2.03 1.58c-.05.3-.07.64-.07.94s.02.64.07.94l-2.03 1.58a.5.5 0 0 0-.12.61l1.92 3.32a.5.5 0 0 0 .59.22l2.39-.96c.5.38 1.03.7 1.62.94l.39 2.38a.5.5 0 0 0 .53.41h3.74a.5.5 0 0 0 .53.41l.39-2.38c.59-.24 1.12-.56 1.62-.94l2.39.96a.5.5 0 0 0 .59-.22l1.92-3.32a.5.5 0 0 0-.12-.61l-2.03-1.58z"></path>
    <circle cx="12" cy="12" r="3"></circle>
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
  const [baseUrl, setBaseUrl] = useState('https://api.openai.com/v1');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [novelContent, setNovelContent] = useState('');
  const [baseNovelForEndings, setBaseNovelForEndings] = useState(''); // New state
  const [endings, setEndings] = useState([]);
  const [selectedEnding, setSelectedEnding] = useState('');
  const [isLoadingEndings, setIsLoadingEndings] = useState(false);
  const [isLoadingContinuation, setIsLoadingContinuation] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef(null);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsStatus, setSettingsStatus] = useState({ message: '', type: '' });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  const [selectedMaxLength, setSelectedMaxLength] = useState(500);
  const lengthOptions = [
    { id: 'short', label: '短篇 (300字)', value: 300 },
    { id: 'medium', label: '中篇 (500字)', value: 500 },
    { id: 'long', label: '长篇 (700字)', value: 700 },
  ];

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
    setEndings([]);
    setSelectedEnding('');

    try {
      const response = await fetch('/api/v1/novel/endings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: novelContent }),
      });
      const data = await response.json();

      if (response.ok && data.endings) {
        setEndings(data.endings);
        setBaseNovelForEndings(novelContent); // Store the content for which endings were generated
        setHasGeneratedOnce(true);
      } else {
        setError(data.message || '获取结局失败，请稍后再试。');
        console.error('Error fetching endings:', data.message);
      }
    } catch (err) {
      setError('获取结局时发生网络错误或未知问题。');
      console.error('Network or other error fetching endings:', err);
    } finally {
      setIsLoadingEndings(false);
    }
  };

  const handleContinueNovel = async () => {
    if (!selectedEnding) {
      setError('请先选择一个结局');
      return;
    }
    if (!baseNovelForEndings) {
        setError('无法找到生成结局时的原文，请重新生成结局。'); // Safety check
        return;
    }
    setError('');
    setIsLoadingContinuation(true);

    try {
      const response = await fetch('/api/v1/novel/continue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: baseNovelForEndings, // Use the stored base content
          ending: selectedEnding,
          maxLength: selectedMaxLength,
        }),
      });
      const data = await response.json();

      if (response.ok && data.novel) {
        setNovelContent(prev => prev + '\n\n' + data.novel); // 拼接续写内容到原内容后面
        // setSelectedEnding(''); // Optional: clear selected ending after use
        // setBaseNovelForEndings(data.novel); // Update base for potential further continuations from this new state
                                            // Or, user might want to generate new endings for data.novel
      } else {
        setError(data.message || '续写小说失败，请稍后再试。');
        console.error('Error continuing novel:', data.message);
      }
    } catch (err) {
      setError('续写小说时发生网络错误或未知问题。');
      console.error('Network or other error continuing novel:', err);
    } finally {
      setIsLoadingContinuation(false);
    }
  };

  const handleSaveSettings = async () => {
    setSettingsStatus({ message: '', type: '' });
    if (!apiKey.trim() || !baseUrl.trim() || !model.trim()) {
      setSettingsStatus({ message: 'API Key, Base URL 和 Model 不能为空。', type: 'error' });
      return;
    }
    setIsSavingSettings(true);

    try {
      const response = await fetch('/api/v1/openaiapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, baseUrl, model }),
      });
      const data = await response.json();

      if (response.ok && data.status === "success") {
        setSettingsStatus({ message: data.message || '设置已成功保存。', type: 'success' });
        setTimeout(() => {
          setShowSettingsModal(false);
          setSettingsStatus({ message: '', type: '' });
        }, 2000);
      } else {
        setSettingsStatus({ message: data.message || '保存配置失败，请重试。', type: 'error' });
        console.error('Error saving settings:', data.message);
      }
    } catch (err) {
      console.error("Network or other error saving settings:", err);
      setSettingsStatus({ message: '保存设置时发生网络错误或未知问题。', type: 'error' });
    } finally {
      setIsSavingSettings(false);
    }
  };


  return (
    <div className="app-container">
      <h1>AI 小说续写</h1>

      <div className="novel-input-processing-area">
        <div className="novel-input-main-column"> 
          <textarea
            ref={textareaRef}
            value={novelContent}
            onChange={(e) => setNovelContent(e.target.value)}
            placeholder="在此输入你的小说开头..."
            className={isLoadingContinuation ? 'textarea-connected-to-placeholder' : ''}
          />
          <button 
            onClick={handleGetEndings} 
            disabled={isLoadingEndings || isLoadingContinuation} 
            className="arrow-button-inside-textarea"
          >
            {isLoadingEndings ? (
              <div className="loader-small"></div>
            ) : hasGeneratedOnce ? (
              <RefreshIcon />
            ) : (
              '➤'
            )}
          </button>

          {isLoadingContinuation && ( 
            <div className={`continuation-placeholder-wrapper ${isPlaceholderVisible ? 'visible' : ''}`}> 
              <ShimmerPlaceholder lines={3} />
            </div>
          )}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {(isLoadingEndings || endings.length > 0) && (
         <div className="endings-container">
           <h2>{isLoadingEndings && !endings.length ? '正在生成结局...' : '选择一个结局：'}</h2>
           <div className="endings-grid">
             {isLoadingEndings ? (
               Array.from({ length: 4 }).map((_, index) => (
                 <div key={`placeholder-${index}`} className="ending-card is-loading">
                   <ShimmerPlaceholder lines={4} />
                 </div>
               )))
             : (
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
            <div className="continuation-controls">
              <div className="length-selector-strip">
                {lengthOptions.map(option => (
                  <button
                    key={option.id}
                    className={`length-option ${selectedMaxLength === option.value ? 'selected' : ''}`}
                    onClick={() => setSelectedMaxLength(option.value)}
                    title={option.label}
                  >
                    {option.label.split(' ')[0]}
                  </button>
                ))}
              </div>
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
            </div>
           )}
         </div>
       )}

      {/* Settings Modal and FAB */}
      {showSettingsModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal-content">
            <h2>API 设置</h2>
            
            <div className="modal-setting-item">
              <label htmlFor="modalApiKey">OpenAI API Key:</label>
              <input
                type="password"
                id="modalApiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-xxxx..."
              />
            </div>
            
            <div className="modal-setting-item">
              <label htmlFor="modalBaseUrl">OpenAI Base URL:</label>
              <input
                type="text"
                id="modalBaseUrl"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://api.openai.com/v1"
              />
            </div>

            <div className="modal-setting-item">
              <label htmlFor="modalModel">Model:</label>
              <input
                type="text"
                id="modalModel"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="gpt-3.5-turbo"
              />
            </div>

            {settingsStatus.message && (
              <p className={`settings-status-message ${settingsStatus.type}`}>
                {settingsStatus.message}
              </p>
            )}

            <div className="modal-actions">
              <button 
                onClick={handleSaveSettings} 
                className="modal-save-button"
                disabled={isSavingSettings}
              >
                {isSavingSettings ? (
                  <>
                    保存中...
                    <div className="loader-inline-dark"></div>
                  </>
                ) : '保存设置'}
              </button>
              <button 
                onClick={() => {
                  setShowSettingsModal(false);
                  setSettingsStatus({ message: '', type: '' }); // Clear status on close
                }} 
                className="modal-close-button"
                disabled={isSavingSettings}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gear Icon Button to open settings modal */}
      <button 
        className="settings-fab" 
        onClick={() => {
          setShowSettingsModal(true);
          // Optionally pre-fill status if needed or clear previous
          setSettingsStatus({ message: '', type: '' }); 
        }}
        aria-label="Open API Settings"
      >
        <GearIcon />
      </button>

    </div>
  );
}

export default App;
