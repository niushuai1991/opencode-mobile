/**
 * Connection status indicator component
 */

import React from 'react';
import { Box, HStack, Text, useColorModeValue } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

interface ConnectionStatusProps {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'success.500';
      case 'connecting':
        return 'warning.500';
      case 'error':
        return 'error.500';
      default:
        return 'gray.400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Connection Error';
      default:
        return 'Disconnected';
    }
  };

  const getIconName = () => {
    switch (status) {
      case 'connected':
        return 'wifi';
      case 'connecting':
        return 'refresh';
      case 'error':
        return 'close-circle';
      default:
        return 'wifi-outline';
    }
  };

  return (
    <Box
      bg={useColorModeValue('warmGray.200', 'warmGray.700')}
      px={3}
      py={1}
      rounded="full"
    >
      <HStack space={2} alignItems="center">
        <Ionicons name={getIconName()} size={14} color={getStatusColor()} />
        <Text fontSize="xs" color="gray.700">
          {getStatusText()}
        </Text>
      </HStack>
    </Box>
  );
};
