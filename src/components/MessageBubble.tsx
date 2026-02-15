/**
 * Message bubble component for displaying a single message
 */

import React from 'react';
import { Box, HStack, VStack, Text, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
  onPress?: () => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isUser,
  onPress,
}) => {
  const timeAgo = formatDistanceToNow(new Date(message.time.created), {
    addSuffix: true,
  });

  const bubbleColor = isUser ? 'primary.500' : 'gray.200';
  const textColor = isUser ? 'white' : 'gray.800';

  return (
    <HStack
      space={2}
      mb={3}
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      w="100%"
    >
      {!isUser && (
        <Box
          w={8}
          h={8}
          rounded="full"
          bg="primary.600"
          alignItems="center"
          justifyContent="center"
          mt={2}
        >
          <Ionicons name="chatbubbles" size={16} color="white" />
        </Box>
      )}
      <VStack maxWidth="75%">
        <Pressable onPress={onPress}>
          <Box
            bg={bubbleColor}
            p={3}
            borderRadius={16}
            borderBottomLeftRadius={isUser ? 16 : 4}
            borderBottomRightRadius={isUser ? 4 : 16}
          >
            {message.error ? (
              <VStack space={2}>
                <HStack space={2} alignItems="center">
                  <Ionicons name="warning" size={16} color="white" />
                  <Text fontSize="sm" color={textColor}>
                    {message.error.data.message}
                  </Text>
                </HStack>
              </VStack>
            ) : message.content ? (
              <Text fontSize="md" color={textColor}>
                {message.content}
              </Text>
            ) : (
              <Text fontSize="sm" color="gray.500" italic>
                Empty message
              </Text>
            )}
          </Box>
        </Pressable>
        <HStack space={2} alignItems="center" mt={1}>
          <Text fontSize="xs" color="gray.500">
            {timeAgo}
          </Text>
          {message.time.completed && (
            <Text fontSize="xs" color="gray.500">
              •{' '}
              {formatDistanceToNow(new Date(message.time.completed), {
                addSuffix: false,
              })}
            </Text>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
};
