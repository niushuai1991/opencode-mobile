/**
 * Error screen component
 * Displays error states with retry option
 */

import React from 'react';
import { Center, VStack, Text, Heading, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  icon?: string;
}

export const ErrorScreen: React.FC<Props> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Retry',
  icon = 'error-outline',
}) => {
  return (
    <Center flex={1} bg="warmGray.50" px={8}>
      <VStack space={4} alignItems="center" maxWidth="400">
        <MaterialIcons name={icon} size={80} color="#ef4444" />
        <Heading size="lg" color="error.500" textAlign="center">
          {title}
        </Heading>
        <Text fontSize="md" color="gray.600" textAlign="center">
          {message}
        </Text>
        {onRetry && (
          <Button
            leftIcon={<MaterialIcons name="refresh" size={20} color="white" />}
            colorScheme="primary"
            size="lg"
            onPress={onRetry}
            mt={2}
          >
            {retryText}
          </Button>
        )}
      </VStack>
    </Center>
  );
};
