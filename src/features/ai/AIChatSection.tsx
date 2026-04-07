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

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface AIChatSectionProps {
  onRecommendationReady: () => void;
  onGoHome?: () => void;
  initialPrompt?: string;
}

export function AIChatSection({ onRecommendationReady, onGoHome, initialPrompt }: AIChatSectionProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]); // Start empty to show welcome
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialPromptProcessed = useRef(false);

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

  const handleSend = useCallback((text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic response selection
    const lowercaseText = text.toLowerCase();
    let responseKey = 'ai.response.default';

    if (lowercaseText.includes('plan') || lowercaseText.includes('itinerary')) {
      responseKey = 'ai.response.plan';
    } else if (lowercaseText.includes('kigali') || lowercaseText.includes('city') || lowercaseText.includes('market')) {
      responseKey = 'ai.response.kigali';
    } else if (lowercaseText.includes('volcano') || lowercaseText.includes('gorilla') || lowercaseText.includes('mountain')) {
      responseKey = 'ai.response.volcanoes';
    } else if (lowercaseText.includes('lake') || lowercaseText.includes('kivu') || lowercaseText.includes('beach') || lowercaseText.includes('water')) {
      responseKey = 'ai.response.kivu';
    } else if (lowercaseText.includes('nature') || lowercaseText.includes('hiking') || lowercaseText.includes('hills')) {
      responseKey = 'ai.response.nature';
    } else if (lowercaseText.includes('wildlife') || lowercaseText.includes('animal') || lowercaseText.includes('safari') || lowercaseText.includes('akagera')) {
      responseKey = 'ai.response.wildlife';
    } else if (lowercaseText.includes('culture') || lowercaseText.includes('tradition') || lowercaseText.includes('dance') || lowercaseText.includes('history')) {
      responseKey = 'ai.response.culture';
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t(responseKey),
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Trigger recommendations display
      setTimeout(() => {
        onRecommendationReady();
      }, 1000);
    }, 1500);
  }, [inputValue, t, onRecommendationReady]);

  useEffect(() => {
    if (initialPrompt && !initialPromptProcessed.current) {
      initialPromptProcessed.current = true;
      handleSend(initialPrompt);
    }
  }, [initialPrompt, handleSend]);

  const handleMicClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend(t('ai.mic.mock'));
    }, 3000);
  };

  return (
    <Flex h="calc(100vh - 40px)" maxH="100vh" w="100%" color={textColor}>
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
          onClick={() => setMessages([])}
        >
          New Chat
        </Button>

        <VStack align="stretch" spacing={4}>
          <Text fontSize="xs" fontWeight="bold" color="appMuted" textTransform="uppercase" letterSpacing="widest">
            Recent Searches
          </Text>
          <HStack color="appMuted" _hover={{ color: "brand.500", cursor: "pointer" }} p={2} rounded="md" onClick={() => handleSend("Lake Kivu, relaxed pace")}>
            <Clock size={16} />
            <Text fontSize="sm" noOfLines={1}>Lake Kivu, relaxed pace</Text>
          </HStack>
          <HStack color="appMuted" _hover={{ color: "brand.500", cursor: "pointer" }} p={2} rounded="md" onClick={() => handleSend("Gorilla trekking budget")}>
            <Clock size={16} />
            <Text fontSize="sm" noOfLines={1}>Gorilla trekking budget</Text>
          </HStack>
        </VStack>
      </Box>

      {/* Main Chat Area */}
      <Flex flex={1} direction="column" position="relative" bg={mainBg}>
        {/* Header */}
        <Flex justify="space-between" align="center" p={4} borderBottomWidth="1px" borderColor={borderColor} bg={headerBg}>
          <HStack color="appMuted" cursor="pointer" _hover={{ color: "brand.500" }} onClick={onGoHome}>
            <ChevronLeft size={18} />
            <Text fontSize="sm">Home</Text>
            <Box ml={2} display="inline-flex"><LayoutGrid size={18} /></Box>
            <Text fontSize="sm">My Panel</Text>
          </HStack>
          <HStack>
            <Avatar icon={<Bot size={18} />} boxSize={8} bg="brand.500" color="black" />
            <Box>
              <Text fontWeight="bold" fontSize="sm" lineHeight="1">Rwanda Tour AI</Text>
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
                        <Text fontSize="md">{msg.text}</Text>
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
