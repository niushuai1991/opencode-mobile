/**
 * Loading screen component
 * Displays various loading states
 */

import React from 'react';
import { Center, VStack, Spinner, Text, Heading } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title?: string;
  message?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingScreen: React.FC<Props> = ({
  title = 'Loading',
  message,
  icon,
  size = 'lg',
}) => {
  return (
    <Center flex={1} bg="warmGray.50" px={8}>
      <VStack space={4} alignItems="center">
        {icon ? (
          <MaterialIcons name={icon} size={60} color="#2196f3" />
        ) : (
          <Spinner size={size} color="primary.500" />
        )}
        <Heading size="md" color="gray.700" textAlign="center">
          {title}
        </Heading>
        {message && (
          <Text fontSize="sm" color="gray.500" textAlign="center">
            {message}
          </Text>
        )}
      </VStack>
    </Center>
  );
};
