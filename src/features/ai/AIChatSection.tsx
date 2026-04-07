import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Avatar,
  useColorModeValue,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { SectionShell } from '../../components/SectionShell';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface AIChatSectionProps {
  onRecommendationReady: () => void;
}

export function AIChatSection({ onRecommendationReady }: AIChatSectionProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('ai.response.default'),
      sender: 'ai',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bgColor = useColorModeValue('whiteAlpha.800', 'whiteAlpha.50');
  const userMsgBg = useColorModeValue('brand.500', 'brand.600');
  const aiMsgBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t('ai.response.default'),
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Trigger recommendations display
      setTimeout(() => {
        onRecommendationReady();
      }, 1000);
    }, 1500);
  };

  return (
    <Container maxW="4xl" py={12} id="ai-section">
      <SectionShell px={6} py={8}>
        <VStack spacing={6} align="stretch">
          <HStack spacing={4}>
            <Avatar
              icon={<Bot size={24} />}
              bg="brand.500"
              color="white"
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                Rwanda Tour Assistant
              </Text>
              <Text fontSize="sm" color="appMuted">
                Online | {t('nav.subtitle')}
              </Text>
            </Box>
          </HStack>

          <Box
            h="400px"
            overflowY="auto"
            px={4}
            py={2}
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '4px' },
              '&::-webkit-scrollbar-thumb:hover': { background: '#555' },
            }}
          >
            <VStack spacing={4} align="stretch">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Flex justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                      <Box
                        maxW="80%"
                        bg={msg.sender === 'user' ? userMsgBg : aiMsgBg}
                        color={msg.sender === 'user' ? 'white' : textColor}
                        px={4}
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
          </Box>

          <HStack spacing={2}>
            <Input
              placeholder={t('ai.placeholder')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              bg={bgColor}
              border="none"
              _focus={{ boxShadow: '0 0 0 1px #36af63' }}
              rounded="full"
              py={6}
            />
            <IconButton
              aria-label="Send message"
              icon={<Send size={20} />}
              colorScheme="green"
              rounded="full"
              onClick={handleSend}
              isDisabled={!inputValue.trim()}
              size="lg"
            />
          </HStack>
        </VStack>
      </SectionShell>
    </Container>
  );
}
