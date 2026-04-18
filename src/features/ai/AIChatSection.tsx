import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Avatar,
  Flex,
  Spinner,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Send, Bot, Plus, Mic, ChevronLeft, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { usePreferences } from '../preferences/PreferenceContext';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage, ChatSession } from '../../types/chat';

interface AIChatSectionProps {
  onGoHome?: () => void;
  initialPrompt?: string;
}

const MarkdownMessage = ({ text }: { text: string }) => (
  <Box sx={{
    '& p': { mb: 2, _last: { mb: 0 } },
    '& h1, & h2, & h3': { fontWeight: 'bold', mt: 3, mb: 2 },
    '& h1': { fontSize: 'xl' },
    '& h2': { fontSize: 'lg' },
    '& h3': { fontSize: 'md' },
    '& ul, & ol': { pl: 5, mb: 2 },
    '& li': { mb: 1 },
    '& strong': { fontWeight: 'bold' }
  }}>
    <ReactMarkdown>{text}</ReactMarkdown>
  </Box>
);

export function AIChatSection({ onGoHome, initialPrompt }: AIChatSectionProps) {
  const { t, language } = useLanguage();
  const { preferences } = usePreferences();

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('rwanda_tour_chat_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputValueRef = useRef('');

  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialPromptProcessed = useRef(false);
  const currentSessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    currentSessionIdRef.current = currentSessionId;
  }, [currentSessionId]);

  useEffect(() => {
    localStorage.setItem('rwanda_tour_chat_sessions', JSON.stringify(sessions));
  }, [sessions]);

  const bgColor = useColorModeValue('rgba(0,0,0,0.05)', 'rgba(255,255,255,0.05)');
  const sidebarBg = useColorModeValue('gray.50', '#070C12');
  const mainBg = useColorModeValue('white', '#0A1118');
  const headerBg = useColorModeValue('white', '#0A1118');
  const userMsgBg = 'brand.500';
  const aiMsgBg = useColorModeValue('gray.100', 'rgba(255,255,255,0.08)');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(async (textOverride?: string) => {
    const text = textOverride !== undefined ? textOverride : inputValueRef.current;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      sender: 'user',
    };

    let activeSessionId = currentSessionIdRef.current;
    let isNewSession = false;

    if (!activeSessionId) {
      activeSessionId = Date.now().toString();
      currentSessionIdRef.current = activeSessionId;
      setCurrentSessionId(activeSessionId);
      isNewSession = true;
    }

    setMessages((prev) => [...prev, userMessage]);

    setSessions(prevSessions => {
      if (isNewSession) {
        return [{
          id: activeSessionId!,
          title: text.length > 30 ? text.substring(0, 30) + '...' : text,
          messages: [userMessage],
          updatedAt: Date.now(),
        }, ...prevSessions];
      }
      return prevSessions.map(s =>
        s.id === activeSessionId ? { ...s, messages: [...s.messages, userMessage], updatedAt: Date.now() } : s
      );
    });

    setInputValue('');
    setIsTyping(true);

    if (isNewSession) {
      fetch('/api/title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
        .then(res => res.json())
        .then(data => {
          if (data.title) {
            setSessions(prev => prev.map(s =>
              s.id === activeSessionId ? { ...s, title: data.title } : s
            ));
          }
        })
        .catch(err => console.error('Title error:', err));
    }

    // Build conversation history (last 10 messages, excluding the one just added)
    const currentMessages = messages;
    const history = currentMessages
      .filter(m => !m.isError)
      .slice(-10)
      .map(m => ({ role: m.sender === 'user' ? 'user' as const : 'assistant' as const, content: m.text }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, preferences, history })
      });

      if (response.status === 429) {
        const data = await response.json();
        setIsTyping(false);
        const rateLimitMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          text: t('ai.ratelimit.text'),
          sender: 'ai',
          isError: true,
          resetTime: data.reset,
        };
        setMessages(prev => [...prev, rateLimitMsg]);
        setSessions(prev => prev.map(s =>
          s.id === activeSessionId ? { ...s, messages: [...s.messages, rateLimitMsg], updatedAt: Date.now() } : s
        ));
        return;
      }

      if (response.status === 503) {
        setIsTyping(false);
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          text: t('ai.error.model_loading'),
          sender: 'ai',
          isError: true,
        };
        setMessages(prev => [...prev, errorMsg]);
        setSessions(prev => prev.map(s =>
          s.id === activeSessionId ? { ...s, messages: [...s.messages, errorMsg], updatedAt: Date.now() } : s
        ));
        return;
      }

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      if (!response.body) throw new Error('No response body');

      setIsTyping(false);
      setIsStreaming(true);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiText = '';
      const aiMessageId = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const aiMessage: ChatMessage = { id: aiMessageId, text: '', sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setSessions(prev => prev.map(s =>
        s.id === activeSessionId ? { ...s, messages: [...s.messages, aiMessage] } : s
      ));

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        aiText += decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(m =>
          m.id === aiMessageId ? { ...m, text: aiText } : m
        ));
      }

      setIsStreaming(false);

      setSessions(prev => prev.map(s =>
        s.id === activeSessionId ? {
          ...s,
          messages: s.messages.map(m => m.id === aiMessageId ? { ...m, text: aiText } : m),
          updatedAt: Date.now()
        } : s
      ));

    } catch (error: unknown) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setIsStreaming(false);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: t('ai.error.generic'),
        sender: 'ai',
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      setSessions(prev => prev.map(s =>
        s.id === activeSessionId ? { ...s, messages: [...s.messages, errorMessage], updatedAt: Date.now() } : s
      ));
    }
  }, [preferences, messages, t]);

  const loadSession = (session: ChatSession) => {
    if (!session?.messages || !Array.isArray(session.messages)) return;
    setCurrentSessionId(session.id);
    setMessages(session.messages.map(m => ({ ...m, isHistorical: true })));
  };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
  };

  useEffect(() => {
    if (initialPrompt && !initialPromptProcessed.current) {
      initialPromptProcessed.current = true;
      handleSend(initialPrompt);
    }
  }, [initialPrompt, handleSend]);

  const speechLang: Record<string, string> = { en: 'en-US', fr: 'fr-FR', rw: 'rw-RW' };

  const handleMicClick = () => {
    type SpeechRecognitionCtor = new () => {
      lang: string;
      interimResults: boolean;
      continuous: boolean;
      start: () => void;
      stop: () => void;
      onstart: (() => void) | null;
      onresult: ((e: { resultIndex: number; results: SpeechRecognitionResultList }) => void) | null;
      onerror: ((e: { error: string }) => void) | null;
      onend: (() => void) | null;
    };

    const w = window as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
    const SpeechRecognitionClass = w.SpeechRecognition || w.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('Your browser does not support Speech Recognition. Please try Chrome or Edge.');
      return;
    }
    if (isListening) return;

    const recognition = new SpeechRecognitionClass();
    recognition.lang = speechLang[language] ?? 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    let hasSent = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript && !hasSent) {
        hasSent = true;
        recognition.stop();
        handleSend(finalTranscript);
      } else if (interimTranscript && !hasSent) {
        setInputValue(interimTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    try {
      recognition.start();
    } catch (e) {
      console.error('Error starting speech recognition', e);
      setIsListening(false);
    }
  };

  const isReturningUser = sessions.length > 0;

  return (
    <Flex h="100vh" w="100%" color={textColor} overflow="hidden">
      {/* Sidebar */}
      <Flex
        w={{ base: '0', md: '280px' }}
        display={{ base: 'none', md: 'flex' }}
        direction="column"
        borderRightWidth="1px"
        borderColor={borderColor}
        bg={sidebarBg}
        p={4}
        h="100%"
      >
        <Button
          w="100%"
          colorScheme="green"
          bg="brand.500"
          color="black"
          leftIcon={<Plus size={18} />}
          justifyContent="flex-start"
          _hover={{ bg: 'brand.400' }}
          mb={8}
          onClick={startNewChat}
          flexShrink={0}
        >
          {t('chat.new')}
        </Button>

        <Box flex={1} overflowY="auto" pr={2} sx={{
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '24px' },
        }}>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="xs" fontWeight="bold" color="appMuted" textTransform="uppercase" letterSpacing="widest">
              {t('chat.recent')}
            </Text>
            {sessions.length === 0 ? (
              <Text fontSize="sm" color="appMuted" fontStyle="italic" px={2}>{t('chat.empty')}</Text>
            ) : (
              sessions.map(session => (
                <HStack
                  key={session.id}
                  color={currentSessionId === session.id ? 'brand.500' : 'appMuted'}
                  _hover={{ color: 'brand.500', cursor: 'pointer' }}
                  p={2}
                  rounded="md"
                  onClick={() => loadSession(session)}
                >
                  <Clock size={16} />
                  <Text fontSize="sm" noOfLines={1}>{session.title}</Text>
                </HStack>
              ))
            )}
          </VStack>
        </Box>
      </Flex>

      {/* Main Chat Area */}
      <Flex flex={1} direction="column" position="relative" bg={mainBg}>
        {/* Header */}
        <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px" borderColor={borderColor} bg={headerBg}>
          <HStack color="appMuted" cursor="pointer" _hover={{ color: 'brand.500' }} onClick={onGoHome}>
            <ChevronLeft size={18} />
            <Text fontSize="sm">{t('chat.back_home')}</Text>
          </HStack>
          <HStack>
            <Avatar icon={<Bot size={18} />} boxSize={8} bg="brand.500" color="black" />
            <Box>
              <Text fontWeight="bold" fontSize="sm" lineHeight="1">{t('nav.title')}</Text>
              <Text fontSize="xs" color="appMuted">{t('ai.assistant.subtitle')}</Text>
            </Box>
          </HStack>
        </Flex>

        {/* Chat Content */}
        <Box flex={1} overflowY="auto" px={{ base: 4, md: 8 }} py={8}>
          {messages.length === 0 ? (
            <Flex direction="column" align="center" justify="center" h="100%" textAlign="center">
              <VStack spacing={6} maxW="md">
                <Heading size="2xl" mb={4}>
                  {isReturningUser ? t('ai.welcome.title') : t('ai.welcome.title_new')}
                </Heading>
                <Text color="appMuted" mb={4}>
                  {isReturningUser ? t('ai.welcome.subtitle') : t('ai.welcome.subtitle_new')}
                </Text>

                <Box mb={4} position="relative">
                  {isListening && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120px',
                        height: '120px',
                        backgroundColor: '#00E68A',
                        borderRadius: '50%',
                        zIndex: 0,
                      }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <IconButton
                    aria-label={t('ai.mic.listening')}
                    icon={isListening ? <Spinner size="lg" /> : <Mic size={32} />}
                    boxSize="80px"
                    rounded="full"
                    bg="brand.500"
                    color="black"
                    _hover={{ bg: 'brand.400', transform: 'scale(1.05)' }}
                    transition="all 0.2s"
                    boxShadow="0 0 30px rgba(0,230,138,0.4)"
                    onClick={handleMicClick}
                    zIndex={1}
                    position="relative"
                  />
                </Box>
                <Text color="brand.500" mb={4} fontSize="sm" fontWeight="medium">
                  {isListening ? t('ai.mic.listening') : t('ai.mic.prompt')}
                </Text>

                <HStack spacing={4} justify="center" flexWrap="wrap">
                  <Button
                    variant="outline"
                    borderColor={borderColor}
                    rounded="full"
                    fontWeight="normal"
                    onClick={() => handleSend(t('ai.suggestion.akagera'))}
                  >
                    {t('ai.suggestion.akagera')}
                  </Button>
                  <Button
                    variant="outline"
                    borderColor={borderColor}
                    rounded="full"
                    fontWeight="normal"
                    onClick={() => handleSend(t('ai.suggestion.kigali'))}
                  >
                    {t('ai.suggestion.kigali')}
                  </Button>
                </HStack>
              </VStack>
            </Flex>
          ) : (
            <VStack spacing={6} align="stretch" maxW="4xl" mx="auto">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Flex justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                      {msg.isError ? (
                        <Box
                          maxW="80%"
                          bg="orange.50"
                          border="1px solid"
                          borderColor="orange.300"
                          color="orange.800"
                          px={5}
                          py={4}
                          rounded="2xl"
                          borderBottomLeftRadius="4px"
                          boxShadow="sm"
                        >
                          <HStack spacing={2} mb={msg.resetTime ? 2 : 0}>
                            <Clock size={15} />
                            <Text fontWeight="semibold" fontSize="sm">{msg.text}</Text>
                          </HStack>
                          {msg.resetTime && (
                            <Text fontSize="xs" color="orange.600">
                              {t('ai.ratelimit.reset').replace('{time}', msg.resetTime)}
                            </Text>
                          )}
                        </Box>
                      ) : (
                        <Box
                          maxW="80%"
                          bg={msg.sender === 'user' ? userMsgBg : aiMsgBg}
                          color={msg.sender === 'user' ? 'black' : textColor}
                          px={5}
                          py={3}
                          rounded="2xl"
                          borderBottomRightRadius={msg.sender === 'user' ? '4px' : '2xl'}
                          borderBottomLeftRadius={msg.sender === 'ai' ? '4px' : '2xl'}
                          boxShadow="sm"
                        >
                          <MarkdownMessage text={msg.text} />
                        </Box>
                      )}
                    </Flex>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <HStack spacing={2} p={2}>
                  <Spinner size="xs" color="brand.500" />
                  <Text fontSize="xs" color="appMuted">{t('ai.thinking')}</Text>
                </HStack>
              )}
              <div ref={messagesEndRef} />
            </VStack>
          )}
        </Box>

        {/* Input Area */}
        <Box p={4} maxW="4xl" w="100%" mx="auto">
          <HStack spacing={2} bg={bgColor} rounded="2xl" p={2} borderWidth="1px" borderColor={borderColor}>
            <IconButton
              aria-label={t('ai.mic.listening')}
              icon={<Mic size={20} />}
              variant="ghost"
              color="appMuted"
              _hover={{ color: 'brand.500', bg: 'transparent' }}
              onClick={handleMicClick}
            />
            <Input
              placeholder={t('ai.input.placeholder')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              border="none"
              _focus={{ boxShadow: 'none' }}
              color={textColor}
            />
            <IconButton
              aria-label={t('ai.send')}
              icon={<Send size={20} />}
              bg={inputValue.trim() ? 'brand.500' : 'transparent'}
              color={inputValue.trim() ? 'black' : 'appMuted'}
              rounded="xl"
              onClick={() => handleSend()}
              isDisabled={!inputValue.trim() || isStreaming}
              _hover={inputValue.trim() ? { bg: 'brand.400' } : {}}
            />
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
}
