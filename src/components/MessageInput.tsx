/**
 * Message input component
 */

import React, { useState } from 'react';
import {
  HStack,
  Input,
  IconButton,
  Icon,
  useToast,
  Box,
  Text,
  Spinner,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { CONFIG } from '../constants/config';

interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  loading = false,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const toast = useToast();

  const handleSend = async () => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    if (trimmedText.length > CONFIG.MAX_MESSAGE_LENGTH) {
      toast.show({
        description: `Message too long (max ${CONFIG.MAX_MESSAGE_LENGTH} characters)`,
        placement: 'top',
      });
      return;
    }

    try {
      await onSend(trimmedText);
      setText('');
    } catch (error) {
      // Error is already handled by the parent
      console.error('Failed to send message:', error);
    }
  };

  const canSend = text.trim().length > 0 && !loading && !disabled;

  return (
    <Box bg="white" p={3} borderTopWidth={1} borderTopColor="gray.200">
      <HStack space={2} alignItems="flex-end">
        <Input
          flex={1}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
          multiline
          maxHeight={120}
          isDisabled={disabled || loading}
          bg="gray.100"
          borderRadius={20}
          px={4}
        />
        <IconButton
          size="md"
          borderRadius="full"
          icon={
            loading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Icon
                as={Ionicons}
                name="send"
                size={20}
                color={canSend ? 'white' : 'gray.400'}
              />
            )
          }
          bg={canSend ? 'primary.500' : 'gray.300'}
          onPress={handleSend}
          isDisabled={!canSend || loading}
        />
      </HStack>
      {text.length > 0 && (
        <Text fontSize="xs" color="gray.500" mt={1} textAlign="right">
          {text.length} / {CONFIG.MAX_MESSAGE_LENGTH}
        </Text>
      )}
    </Box>
  );
};
