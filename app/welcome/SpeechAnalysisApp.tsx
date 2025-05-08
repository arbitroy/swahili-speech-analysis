import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpeechAnalysisApp = () => {
  // State management
  const [activeTab, setActiveTab] = useState('chatbot');
  const [sessions, setSessions] = useState([
    { id: 1, name: 'Default Session', createdAt: new Date().toISOString() }
  ]);
  const [activeSession, setActiveSession] = useState(1);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [transcriptResult, setTranscriptResult] = useState('');
  const [ttsText, setTtsText] = useState('');
  const [ttsAudio, setTtsAudio] = useState('');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  // Translation state
  const [englishText, setEnglishText] = useState('');
  const [swahiliText, setSwahiliText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // History state
  const [history, setHistory] = useState({
    chatbot: [],
    asr: [],
    tts: [],
    translation: []
  });
  
  const audioInputRef = useRef(null);
  
  // Animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };
  
  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 30 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };
  
  const buttonHoverVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };
  
  // Session management
  const createNewSession = () => {
    if (newSessionName.trim() === '') return;
    
    const newSession = {
      id: sessions.length + 1,
      name: newSessionName,
      createdAt: new Date().toISOString()
    };
    
    setSessions([...sessions, newSession]);
    setActiveSession(newSession.id);
    setShowSessionModal(false);
    setNewSessionName('');
  };
  
  // Chat functionality
  const handleSendMessage = () => {
    if (chatInput.trim() === '') return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      text: chatInput,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    // Add to chat messages and history
    setChatMessages([...chatMessages, newMessage]);
    setHistory({
      ...history,
      chatbot: [...history.chatbot, {
        session: activeSession,
        message: newMessage,
        timestamp: new Date().toISOString()
      }]
    });
    
    // Simulate response (in real app, this would call your backend)
    setTimeout(() => {
      const response = {
        id: chatMessages.length + 2,
        text: "Samahani, ninafanya kazi bado. Tutawasiliana hivi punde.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setChatMessages(prev => [...prev, response]);
    }, 1000);
    
    setChatInput('');
  };
  
  // ASR functionality
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setAudioFile(file);
    setAudioFileName(file.name);
    
    // In a real app, you would upload the file to your backend here
    // and receive the transcript in response
    
    // Simulate transcript response
    setTimeout(() => {
      const simulatedTranscript = "This is a simulated transcript of the uploaded audio file.";
      setTranscriptResult(simulatedTranscript);
      
      // Add to history
      setHistory({
        ...history,
        asr: [...history.asr, {
          session: activeSession,
          type: 'upload',
          fileName: file.name,
          transcript: simulatedTranscript,
          timestamp: new Date().toISOString()
        }]
      });
    }, 1500);
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording
      // In a real app, you would implement actual recording here
      
      // Simulate recording for demo
      setTimeout(() => {
        setIsRecording(false);
        
        // Simulate transcript result
        const recordingTranscript = "This is a simulated transcript from voice recording.";
        setTranscriptResult(recordingTranscript);
        
        // Add to history
        setHistory({
          ...history,
          asr: [...history.asr, {
            session: activeSession,
            type: 'recording',
            transcript: recordingTranscript,
            timestamp: new Date().toISOString()
          }]
        });
      }, 3000);
    }
  };
  
  // TTS functionality
  const handleTtsSubmit = () => {
    if (ttsText.trim() === '') return;
    
    // In a real app, you would send the text to your backend
    // and receive an audio file URL in response
    
    // Simulate TTS response
    setTimeout(() => {
      // Set mock audio URL 
      setTtsAudio('/api/placeholder/400/80');
      
      // Add to history
      setHistory({
        ...history,
        tts: [...history.tts, {
          session: activeSession,
          text: ttsText,
          timestamp: new Date().toISOString()
        }]
      });
    }, 1000);
  };
  
  // Translation functionality
  const handleTranslate = () => {
    if (englishText.trim() === '') return;
    
    setIsTranslating(true);
    
    // Example translations (very basic simulation)
    const translations = {
      'hello': 'Jambo',
      'good morning': 'Habari ya asubuhi',
      'good afternoon': 'Habari ya mchana',
      'good evening': 'Habari ya jioni',
      'how are you': 'Habari yako',
      'thank you': 'Asante',
      'welcome': 'Karibu',
      'goodbye': 'Kwaheri',
      'please': 'Tafadhali',
      'sorry': 'Samahani',
      'yes': 'Ndiyo',
      'no': 'Hapana',
      'what is your name': 'Jina lako ni nani',
      'my name is': 'Jina langu ni',
      'i love you': 'Nakupenda',
      'today': 'Leo',
      'tomorrow': 'Kesho',
      'yesterday': 'Jana',
      'water': 'Maji',
      'food': 'Chakula',
      'friend': 'Rafiki',
      'school': 'Shule',
      'work': 'Kazi',
      'home': 'Nyumbani'
    };
    
    // Simulate translation processing
    setTimeout(() => {
      // Simple word-by-word translation (for demo purposes only)
      const words = englishText.toLowerCase().split(' ');
      const translated = words.map(word => {
        for (const [eng, swa] of Object.entries(translations)) {
          if (eng.includes(word) || word.includes(eng)) {
            return swa;
          }
        }
        return word;  // If no translation found, keep original
      });
      
      // For longer sentences, create a more sophisticated simulation
      let result = translated.join(' ');
      if (englishText.length > 10) {
        if (Math.random() > 0.5) {
          result += ' sana';
        }
        if (Math.random() > 0.7) {
          result = 'Tafadhali ' + result;
        }
      }
      
      setSwahiliText(result);
      setIsTranslating(false);
      
      // Add to history
      setHistory({
        ...history,
        translation: [...history.translation, {
          session: activeSession,
          english: englishText,
          swahili: result,
          timestamp: new Date().toISOString()
        }]
      });
    }, 1000);
  };
  
  // Filtered history for current session
  const filteredHistory = {
    chatbot: history.chatbot.filter(item => item.session === activeSession),
    asr: history.asr.filter(item => item.session === activeSession),
    tts: history.tts.filter(item => item.session === activeSession),
    translation: history.translation.filter(item => item.session === activeSession)
  };
  
  // Format date to local string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Sidebar content - used for both desktop and mobile
  const renderSidebarContent = (isMobile = false) => (
    <>
      {/* Logo/Header */}
      <div className="text-white p-4 flex justify-between items-center" 
        style={{ 
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' 
        }}>
        <h1 className="text-xl font-bold">Speech Analysis</h1>
        {isMobile && (
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMobileSidebar(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        )}
      </div>
      
      {/* Session Selector */}
      <div className="p-4 border-b" style={{ backgroundColor: 'var(--color-light)', borderColor: 'var(--color-accent)' }}>
        <h3 style={{ color: 'var(--color-primary)' }} className="font-medium mb-2">Session</h3>
        <select 
          className="w-full rounded px-3 py-2 text-sm mb-3 border-2 focus:outline-none"
          style={{ 
            borderColor: 'var(--color-accent)',
            backgroundColor: 'white',
            color: 'var(--color-primary)'
          }}
          value={activeSession}
          onChange={(e) => {
            setActiveSession(parseInt(e.target.value));
            if (isMobile) setShowMobileSidebar(false);
          }}
        >
          {sessions.map(session => (
            <option key={session.id} value={session.id}>
              {session.name}
            </option>
          ))}
        </select>
        <motion.button 
          whileHover="hover"
          variants={buttonHoverVariants}
          className="w-full text-sm px-3 py-2 rounded shadow-md hover:shadow-lg transition-all border-2"
          style={{ 
            background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-light) 100%)',
            color: 'var(--color-primary)',
            borderColor: 'var(--color-accent)'
          }}
          onClick={() => {
            setShowSessionModal(true);
            if (isMobile) setShowMobileSidebar(false);
          }}
        >
          New Session
        </motion.button>
      </div>
      
      {/* Feature Tabs */}
      <div className="p-4" style={{ backgroundColor: 'white' }}>
        <h3 style={{ color: 'var(--color-primary)' }} className="font-medium mb-3">Features</h3>
        <nav className="flex flex-col space-y-2">
          {['chatbot', 'asr', 'tts', 'translate', 'history'].map((tab) => (
            <motion.button 
              key={tab}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                background: activeTab === tab 
                  ? 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-secondary) 100%)' 
                  : 'white',
                color: activeTab === tab ? 'white' : 'var(--color-primary)',
                boxShadow: activeTab === tab ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                border: activeTab === tab 
                  ? 'none' 
                  : '2px solid var(--color-light)'
              }}
              className={`text-left px-4 py-3 rounded-lg transition-all`}
              onClick={() => {
                setActiveTab(tab);
                if (isMobile) setShowMobileSidebar(false);
              }}
            >
              {tab === 'chatbot' && 'Chatbot'}
              {tab === 'asr' && 'Speech Recognition'}
              {tab === 'tts' && 'Text to Speech'}
              {tab === 'translate' && 'English to Swahili'}
              {tab === 'history' && 'History'}
            </motion.button>
          ))}
        </nav>
      </div>
    </>
  );
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen" style={{ backgroundColor: 'var(--color-light)', opacity: 0.9 }}>
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block w-64 shadow-lg z-10" style={{ backgroundColor: 'white' }}>
        {renderSidebarContent()}
      </div>
      
      {/* Mobile Header - hidden on desktop */}
      <div 
        className="md:hidden text-white p-4 flex justify-between items-center shadow-md z-10"
        style={{ 
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' 
        }}
      >
        <h1 className="text-xl font-bold">Speech Analysis</h1>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowMobileSidebar(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </motion.button>
      </div>
      
      {/* Mobile Sidebar - slide in overlay */}
      <AnimatePresence>
        {showMobileSidebar && (
          <motion.div 
            className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg overflow-auto"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {renderSidebarContent(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4">
          {/* Feature Content */}
          <div className="rounded-xl shadow-lg p-6 h-full" style={{ backgroundColor: 'white', borderTop: '4px solid var(--color-accent)' }}>
            <AnimatePresence mode="wait">
              {/* Chatbot */}
              {activeTab === 'chatbot' && (
                <motion.div 
                  key="chatbot"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex flex-col"
                >
                  <div className="flex-grow overflow-y-auto mb-4 p-5 rounded-xl" style={{ backgroundColor: 'var(--color-light)', backgroundImage: 'radial-gradient(circle at 25px 25px, var(--color-accent) 2%, transparent 0%), radial-gradient(circle at 75px 75px, var(--color-accent) 2%, transparent 0%)', backgroundSize: '100px 100px' }}>
                    {chatMessages.length === 0 ? (
                      <div className="text-center py-12 px-4 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        <p style={{ color: 'var(--color-primary)' }}>Send a message to start chatting</p>
                        <p className="text-sm mt-2" style={{ color: 'var(--color-secondary)' }}>Maswali na majibu kwa Kiswahili</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatMessages.map((message, index) => (
                          <motion.div 
                            key={message.id} 
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <div 
                              style={{ 
                                background: message.sender === 'user' 
                                  ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' 
                                  : 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-light) 100%)',
                                color: message.sender === 'user' ? 'white' : 'var(--color-primary)',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                              }}
                              className="max-w-[80%] rounded-xl px-5 py-3"
                            >
                              <p>{message.text}</p>
                              <p className="text-xs opacity-75 mt-1">
                                {formatDate(message.timestamp)}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-grow px-4 py-3 focus:outline-none border-2 rounded-l-xl"
                      style={{ 
                        borderColor: 'var(--color-accent)',
                        backgroundColor: 'white',
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage} 
                      className="text-white px-6 py-3 rounded-r-xl shadow-md transition-all"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                      }}
                    >
                      Send
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Speech Recognition */}
              {activeTab === 'asr' && (
                <motion.div 
                  key="asr"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex flex-col"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Upload Audio */}
                    <div className="p-6 rounded-xl" style={{ 
                      background: 'linear-gradient(135deg, var(--color-light) 0%, white 100%)',
                      borderLeft: '4px solid var(--color-accent)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                    }}>
                      <h3 style={{ 
                        color: 'var(--color-primary)',
                        textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                      }} className="text-lg font-medium mb-4">
                        Upload Audio
                      </h3>
                      <div className="mb-4">
                        <input
                          type="file"
                          ref={audioInputRef}
                          onChange={handleFileUpload}
                          accept="audio/*"
                          className="hidden"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02, boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => audioInputRef.current.click()}
                          className="w-full bg-white border-2 border-dashed rounded-xl p-6 text-center transition-all"
                          style={{ 
                            borderColor: 'var(--color-accent)',
                            color: 'var(--color-secondary)'
                          }}
                        >
                          {audioFileName ? (
                            <span>{audioFileName}</span>
                          ) : (
                            <div>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" style={{ color: 'var(--color-secondary)' }} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span>Click to upload audio file</span>
                            </div>
                          )}
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Record Audio */}
                    <div className="p-6 rounded-xl" style={{ 
                      background: 'linear-gradient(135deg, var(--color-light) 0%, white 100%)',
                      borderLeft: '4px solid var(--color-accent)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                    }}>
                      <h3 style={{ 
                        color: 'var(--color-primary)',
                        textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                      }} className="text-lg font-medium mb-4">
                        Record Audio
                      </h3>
                      <div className="mb-4 flex justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(161, 227, 249, 0.7)' }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleRecording}
                          className={`w-20 h-20 rounded-full flex items-center justify-center text-white ${
                            isRecording ? 'animate-pulse' : ''
                          } transition-all shadow-lg`}
                          style={{ 
                            background: isRecording 
                              ? 'radial-gradient(circle, #ff5252 0%, #ff0000 100%)' 
                              : 'radial-gradient(circle, var(--color-accent) 0%, var(--color-primary) 100%)'
                          }}
                        >
                          {isRecording ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a2 2 0 00-2 2v8a2 2 0 104 0V4a2 2 0 00-2-2z" />
                              <path d="M6 9a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm9-1a1 1 0 00-1 1v.01a1 1 0 102 0V9a1 1 0 00-1-1z" />
                              <path d="M4 9a1 1 0 011-1h.01a1 1 0 110 2H5a1 1 0 01-1-1zm9-1a1 1 0 00-1 1v.01a1 1 0 102 0V9a1 1 0 00-1-1z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                            </svg>
                          )}
                        </motion.button>
                      </div>
                      <p className="text-center" style={{ color: isRecording ? '#ff0000' : 'var(--color-secondary)' }}>
                        {isRecording ? 'Recording...' : 'Click to start recording'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Transcript Result */}
                  <div className="mt-6 flex-grow">
                    <h3 style={{ 
                      color: 'var(--color-primary)',
                      textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                    }} className="text-lg font-medium mb-3">
                      Transcript
                    </h3>
                    <motion.div 
                      className="p-6 rounded-xl overflow-y-auto"
                      style={{ 
                        background: 'linear-gradient(135deg, white 0%, var(--color-light) 100%)',
                        borderLeft: '4px solid var(--color-accent)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        minHeight: '16rem'
                      }}
                      animate={{ 
                        height: transcriptResult ? 'auto' : '16rem',
                        transition: { duration: 0.3 }
                      }}
                    >
                      {transcriptResult ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="p-4 rounded-lg"
                          style={{ 
                            backgroundColor: 'white',
                            border: '1px solid var(--color-accent)',
                            color: 'var(--color-primary)'
                          }}
                        >
                          {transcriptResult}
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" style={{ color: 'var(--color-accent)' }} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                          </svg>
                          <p style={{ color: 'var(--color-secondary)' }}>
                            Transcript will appear here
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              {/* Text to Speech */}
              {activeTab === 'tts' && (
                <motion.div 
                  key="tts"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex flex-col"
                >
                  <div className="mb-6 flex-grow">
                    <h3 style={{ 
                      color: 'var(--color-primary)',
                      textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                    }} className="text-lg font-medium mb-4">
                      Enter Text
                    </h3>
                    <div className="p-1 rounded-xl" style={{ 
                      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                      <textarea
                        value={ttsText}
                        onChange={(e) => setTtsText(e.target.value)}
                        placeholder="Enter text to convert to speech..."
                        className="w-full p-5 h-64 focus:outline-none rounded-lg"
                        style={{ 
                          border: 'none',
                          backgroundColor: 'white',
                          resize: 'none'
                        }}
                      />
                    </div>
                    <div className="flex justify-center mt-6">
                      <motion.button 
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)'
                        }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTtsSubmit} 
                        className="text-white px-8 py-3 rounded-full shadow-lg transition-all"
                        style={{ 
                          background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                          border: '2px solid var(--color-accent)'
                        }}
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                          </svg>
                          Convert to Speech
                        </div>
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Audio Result */}
                  <AnimatePresence>
                    {ttsAudio && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6"
                      >
                        <h3 style={{ 
                          color: 'var(--color-primary)',
                          textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                        }} className="text-lg font-medium mb-4">
                          Generated Audio
                        </h3>
                        <div className="p-1 rounded-xl" style={{ 
                          background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-light) 100%)',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                          <div className="bg-white rounded-lg p-6">
                            <div className="w-full max-w-md mx-auto">
                              <motion.div 
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="rounded-xl p-5 text-center"
                                style={{ 
                                  background: 'linear-gradient(135deg, var(--color-light) 0%, var(--color-accent) 30%, var(--color-light) 100%)'
                                }}
                              >
                                <div className="flex justify-center mb-4">
                                  <motion.div 
                                    animate={{ 
                                      scale: [1, 1.2, 1],
                                      rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{ 
                                      repeat: Infinity,
                                      duration: 2,
                                      ease: "easeInOut"
                                    }}
                                    className="rounded-full p-3 mb-1" 
                                    style={{ backgroundColor: 'white' }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" style={{ color: 'var(--color-primary)' }} viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                  </motion.div>
                                </div>
                                <p className="mb-4 text-lg font-medium" style={{ color: 'var(--color-primary)' }}>
                                  Your audio is ready!
                                </p>
                                <motion.button 
                                  whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                                  }} 
                                  whileTap={{ scale: 0.95 }}
                                  className="text-white px-6 py-2 rounded-full shadow-md transition-all inline-flex items-center"
                                  style={{ 
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                  Download Audio
                                </motion.button>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
              
              {/* Translation */}
              {activeTab === 'translate' && (
                <motion.div 
                  key="translate"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex flex-col"
                >
                  <div className="grid md:grid-cols-2 gap-6 h-full">
                    {/* English Input */}
                    <div className="flex flex-col h-full">
                      <h3 style={{ 
                        color: 'var(--color-primary)',
                        textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                      }} className="text-lg font-medium mb-4">
                        English
                      </h3>
                      <div className="flex-grow p-1 rounded-xl" style={{ 
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}>
                        <textarea
                          value={englishText}
                          onChange={(e) => setEnglishText(e.target.value)}
                          placeholder="Enter English text to translate..."
                          className="w-full p-5 h-full focus:outline-none rounded-lg"
                          style={{ 
                            border: 'none',
                            backgroundColor: 'white',
                            resize: 'none'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Swahili Output */}
                    <div className="flex flex-col h-full">
                      <h3 style={{ 
                        color: 'var(--color-primary)',
                        textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                      }} className="text-lg font-medium mb-4">
                        Kiswahili
                      </h3>
                      <div className="flex-grow p-1 rounded-xl" style={{ 
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-light) 100%)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}>
                        <div 
                          className="w-full p-5 h-full rounded-lg bg-white relative"
                        >
                          {isTranslating ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
                              <div className="flex flex-col items-center">
                                <motion.div
                                  animate={{ 
                                    rotate: 360,
                                    transition: { 
                                      duration: 1.5,
                                      ease: "linear",
                                      repeat: Infinity 
                                    }
                                  }}
                                  className="mb-4"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" style={{ color: 'var(--color-secondary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                    <path d="M12 2C6.48 2 2 6.48 2 12" />
                                  </svg>
                                </motion.div>
                                <p style={{ color: 'var(--color-primary)' }}>Translating...</p>
                              </div>
                            </div>
                          ) : (
                            swahiliText ? (
                              <div>
                                <p style={{ color: 'var(--color-primary)' }}>{swahiliText}</p>
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center text-center">
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" style={{ color: 'var(--color-accent)' }} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.4-1.423 17.087 17.087 0 003.13-3.733c-.865-.333-1.75-.648-2.654-.94a1 1 0 11.59-1.91c.81.26 1.64.532 2.47.81 1.21-3.13 2-6.121 2.1-7.978h-1.82A1 1 0 015 2V1a1 1 0 011-1h5a1 1 0 011 1v1zM15 4a1 1 0 10-2 0v1a1 1 0 102 0V4zm-3 8a1 1 0 100-2 8 8 0 00-7.784 6.266A1 1 0 005 18a10 10 0 0110-6z" clipRule="evenodd" />
                                  </svg>
                                  <p style={{ color: 'var(--color-secondary)' }}>
                                    Swahili translation will appear here
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Translation Button */}
                  <div className="flex justify-center mt-6">
                    <motion.button 
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)'
                      }} 
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTranslate} 
                      disabled={isTranslating || !englishText.trim()}
                      className="text-white px-8 py-3 rounded-full shadow-lg transition-all flex items-center disabled:opacity-50"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.4-1.423 17.087 17.087 0 003.13-3.733c-.865-.333-1.75-.648-2.654-.94a1 1 0 11.59-1.91c.81.26 1.64.532 2.47.81 1.21-3.13 2-6.121 2.1-7.978h-1.82A1 1 0 015 2V1a1 1 0 011-1h5a1 1 0 011 1v1zM15 4a1 1 0 10-2 0v1a1 1 0 102 0V4zm-3 8a1 1 0 100-2 8 8 0 00-7.784 6.266A1 1 0 005 18a10 10 0 0110-6z" clipRule="evenodd" />
                      </svg>
                      Translate to Swahili
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* History */}
              {activeTab === 'history' && (
                <motion.div 
                  key="history"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] overflow-y-auto"
                >
                  <h3 style={{ color: 'var(--color-primary)' }} className="text-lg font-medium mb-4">
                    Session History
                  </h3>
                  
                  {/* Chat History */}
                  {filteredHistory.chatbot.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-6"
                    >
                      <h4 style={{ color: 'var(--color-secondary)' }} className="font-medium mb-2">
                        Chatbot History
                      </h4>
                      <div className="space-y-3">
                        {filteredHistory.chatbot.map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="bg-gray-50 p-3 rounded"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <p className="text-sm">{item.message.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(item.timestamp)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* ASR History */}
                  {filteredHistory.asr.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      <h4 style={{ color: 'var(--color-secondary)' }} className="font-medium mb-2">
                        Speech Recognition History
                      </h4>
                      <div className="space-y-3">
                        {filteredHistory.asr.map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="bg-gray-50 p-3 rounded"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.1 }}
                          >
                            <p style={{ color: 'var(--color-primary)' }} className="text-xs font-medium">
                              {item.type === 'upload' ? `File: ${item.fileName}` : 'Voice Recording'}
                            </p>
                            <p className="text-sm mt-1">{item.transcript}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(item.timestamp)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* TTS History */}
                  {filteredHistory.tts.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6"
                    >
                      <h4 style={{ color: 'var(--color-secondary)' }} className="font-medium mb-2">
                        Text to Speech History
                      </h4>
                      <div className="space-y-3">
                        {filteredHistory.tts.map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="bg-gray-50 p-3 rounded"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                          >
                            <p className="text-sm">{item.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(item.timestamp)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Translation History */}
                  {filteredHistory.translation && filteredHistory.translation.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-6"
                    >
                      <h4 style={{ color: 'var(--color-secondary)' }} className="font-medium mb-2">
                        Translation History
                      </h4>
                      <div className="space-y-3">
                        {filteredHistory.translation.map((item, index) => (
                          <motion.div 
                            key={index} 
                            className="p-4 rounded-xl"
                            style={{ 
                              background: 'linear-gradient(135deg, var(--color-light) 0%, white 100%)',
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                              borderLeft: '4px solid var(--color-accent)'
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                          >
                            <div className="grid md:grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
                                  English
                                </p>
                                <p className="text-sm">{item.english}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-primary)' }}>
                                  Kiswahili
                                </p>
                                <p className="text-sm">{item.swahili}</p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              {formatDate(item.timestamp)}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {filteredHistory.chatbot.length === 0 && 
                   filteredHistory.asr.length === 0 && 
                   filteredHistory.tts.length === 0 &&
                   filteredHistory.translation.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <p>No history available for this session</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        
        {/* Footer */}
        <footer 
          className="text-white text-center py-4"
          style={{ 
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            borderTop: '3px solid var(--color-accent)'
          }}
        >
          <p className="text-sm">© {new Date().getFullYear()} Speech Analysis Project</p>
        </footer>
      </div>
      
      {/* New Session Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="rounded-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
            >
              <div className="p-5 text-white" style={{ 
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)'
              }}>
                <h3 className="text-xl font-medium">Create New Session</h3>
              </div>
              
              <div className="bg-white p-6">
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-secondary)' }}>
                    Session Name
                  </label>
                  <div className="p-1 rounded-lg" style={{ 
                    background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-light) 100%)'
                  }}>
                    <input
                      type="text"
                      value={newSessionName}
                      onChange={(e) => setNewSessionName(e.target.value)}
                      placeholder="Enter a name for your session"
                      className="w-full rounded-md px-4 py-3 focus:outline-none"
                      style={{ border: 'none' }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-full border-2 transition-all"
                    style={{ 
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-primary)'
                    }}
                    onClick={() => setShowSessionModal(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }} 
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 text-white rounded-full shadow-md transition-all"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)'
                    }}
                    onClick={createNewSession}
                  >
                    Create
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeechAnalysisApp;