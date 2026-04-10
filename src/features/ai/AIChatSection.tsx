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
import { Send, Bot, Plus, Mic, ChevronLeft, LayoutGrid, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isHistorical?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

interface AIChatSectionProps {
  onGoHome?: () => void;
  initialPrompt?: string;
}

const TypewriterMarkdown = ({ text, isAi, isHistorical }: { text: string; isAi: boolean; isHistorical?: boolean }) => {
  const [displayedText, setDisplayedText] = useState(isAi && !isHistorical ? '' : text);

  useEffect(() => {
    if (!isAi || isHistorical) {
      setDisplayedText(text);
      return;
    }
    
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
      }
    }, 15);

    return () => clearInterval(intervalId);
  }, [text, isAi, isHistorical]);

  return (
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
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </Box>
  );
};

export function AIChatSection({ onGoHome, initialPrompt }: AIChatSectionProps) {
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('rwanda_tour_chat_sessions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]); // Start empty to show welcome
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialPromptProcessed = useRef(false);
  const currentSessionIdRef = useRef<string | null>(null);

  // Sync currentSessionId with Ref for handleSend
  useEffect(() => {
    currentSessionIdRef.current = currentSessionId;
  }, [currentSessionId]);

  // Sync sessions with localStorage
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

  const handleSend = useCallback(async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    };

    let activeSessionId = currentSessionIdRef.current;
    let isNewSession = false;

    if (!activeSessionId) {
      activeSessionId = Date.now().toString();
      setCurrentSessionId(activeSessionId);
      isNewSession = true;
    }

    setMessages((prev) => {
      const newMessages = [...prev, userMessage];
      
      setSessions(prevSessions => {
        if (isNewSession) {
          return [{
            id: activeSessionId!,
            title: text.length > 30 ? text.substring(0, 30) + '...' : text,
            messages: newMessages,
            updatedAt: Date.now(),
          }, ...prevSessions];
        } else {
          return prevSessions.map(s => 
            s.id === activeSessionId ? { ...s, messages: newMessages, updatedAt: Date.now() } : s
          );
        }
      });
      
      return newMessages;
    });

    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "I'm sorry, I couldn't process that right now.",
        sender: 'ai',
      };
      
      setMessages((prev) => {
        const newMessages = [...prev, aiMessage];
        setSessions(prevSessions => prevSessions.map(s => 
          s.id === activeSessionId ? { ...s, messages: newMessages, updatedAt: Date.now() } : s
        ));
        return newMessages;
      });
      
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Connection error. Please try again later.",
        sender: 'ai',
      };
      setMessages((prev) => {
        const newMessages = [...prev, errorMessage];
        setSessions(prevSessions => prevSessions.map(s => 
          s.id === activeSessionId ? { ...s, messages: newMessages, updatedAt: Date.now() } : s
        ));
        return newMessages;
      });
    } finally {
      setIsTyping(false);
    }
  }, [inputValue]);

  const loadSession = (session: ChatSession) => {
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

  const handleMicClick = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please try Chrome or Edge.");
      return;
    }

    if (isListening) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        handleSend(finalTranscript);
      } else if (interimTranscript) {
        setInputValue(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Error starting speech recognition", e);
      setIsListening(false);
    }
  };

  return (
    <Flex h="100vh" w="100%" color={textColor}>
      {/* Sidebar */}
      <Box
        w={{ base: "0", md: "280px" }}
        display={{ base: "none", md: "block" }}
        borderRightWidth="1px"
        borderColor={borderColor}
        bg={sidebarBg}
        p={4}
      >
        <Button
          w="100%"
          colorScheme="green"
          bg="brand.500"
          color="black"
          leftIcon={<Plus size={18} />}
          justifyContent="flex-start"
          _hover={{ bg: "brand.400" }}
          mb={8}
          onClick={startNewChat}
        >
          New Chat
        </Button>

        <VStack align="stretch" spacing={4}>
          <Text fontSize="xs" fontWeight="bold" color="appMuted" textTransform="uppercase" letterSpacing="widest">
            Recent Chats
          </Text>
          {sessions.length === 0 ? (
            <Text fontSize="sm" color="appMuted" fontStyle="italic" px={2}>No recent chats</Text>
          ) : (
            sessions.map(session => (
              <HStack 
                key={session.id} 
                color={currentSessionId === session.id ? "brand.500" : "appMuted"} 
                _hover={{ color: "brand.500", cursor: "pointer" }} 
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

      {/* Main Chat Area */}
      <Flex flex={1} direction="column" position="relative" bg={mainBg}>
        {/* Header */}
        <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px" borderColor={borderColor} bg={headerBg}>
          <HStack color="appMuted" cursor="pointer" _hover={{ color: "brand.500" }} onClick={onGoHome}>
            <ChevronLeft size={18} />
            <Text fontSize="sm">Home</Text>
          </HStack>
          <HStack>
            <Avatar icon={<Bot size={18} />} boxSize={8} bg="brand.500" color="black" />
            <Box>
              <Text fontWeight="bold" fontSize="sm" lineHeight="1">Rwanda Tourist Assistant</Text>
              <Text fontSize="xs" color="appMuted">Travel Assistant</Text>
            </Box>
          </HStack>
        </Flex>

        {/* Chat Content */}
        <Box flex={1} overflowY="auto" px={{ base: 4, md: 8 }} py={8}>
          {messages.length === 0 ? (
            <Flex direction="column" align="center" justify="center" h="100%" textAlign="center">
              <VStack spacing={6} maxW="md">
                <Heading size="2xl" mb={4}>Welcome back!</Heading>
                <Text color="appMuted" mb={4}>Pick up where you left off with your recent searches or start a new one.</Text>
                
                <Box mb={4} position="relative">
                  {isListening && (
                    <motion.div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "120px",
                        height: "120px",
                        backgroundColor: "#00E68A",
                        borderRadius: "50%",
                        zIndex: 0,
                      }}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  <IconButton
                    aria-label="Voice input"
                    icon={isListening ? <Spinner size="lg" /> : <Mic size={32} />}
                    boxSize="80px"
                    rounded="full"
                    bg="brand.500"
                    color="black"
                    _hover={{ bg: "brand.400", transform: "scale(1.05)" }}
                    transition="all 0.2s"
                    boxShadow="0 0 30px rgba(0,230,138,0.4)"
                    onClick={handleMicClick}
                    zIndex={1}
                    position="relative"
                  />
                </Box>
                <Text color="brand.500" mb={4} fontSize="sm" fontWeight="medium">
                  {isListening ? t('ai.mic.listening') : "Click the mic, tell me — I'll find it"}
                </Text>

                <HStack spacing={4} justify="center" flexWrap="wrap">
                  <Button variant="outline" borderColor={borderColor} rounded="full" fontWeight="normal" onClick={() => handleSend("I want a 3-day luxury tour in Akagera")}>
                    3-day luxury in Akagera
                  </Button>
                  <Button variant="outline" borderColor={borderColor} rounded="full" fontWeight="normal" onClick={() => handleSend("Budget-friendly places in Kigali")}>
                    Budget-friendly in Kigali
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
                        <TypewriterMarkdown text={msg.text} isAi={msg.sender === 'ai'} isHistorical={msg.isHistorical} />
                      </Box>
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
              aria-label="Voice input"
              icon={<Mic size={20} />}
              variant="ghost"
              color="appMuted"
              _hover={{ color: "brand.500", bg: "transparent" }}
              onClick={handleMicClick}
            />
            <Input
              placeholder="What kind of experience are you looking for? Tell me..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              border="none"
              _focus={{ boxShadow: 'none' }}
              color={textColor}
            />
            <IconButton
              aria-label="Send message"
              icon={<Send size={20} />}
              bg={inputValue.trim() ? "brand.500" : "transparent"}
              color={inputValue.trim() ? "black" : "appMuted"}
              rounded="xl"
              onClick={() => handleSend()}
              isDisabled={!inputValue.trim()}
              _hover={inputValue.trim() ? { bg: "brand.400" } : {}}
            />
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );
}

