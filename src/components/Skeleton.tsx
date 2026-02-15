/**
 * Skeleton loading components
 * Provides placeholder UI during loading
 */

import React from 'react';
import { Box, VStack, HStack } from 'native-base';

interface Props {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export const Skeleton: React.FC<Props> = ({
  variant = 'rect',
  width = '100%',
  height = 20,
  borderRadius,
}) => {
  // Calculate border radius based on variant
  const getBorderRadius = (): string | number => {
    if (borderRadius) return borderRadius;
    if (variant === 'circle') return 999;
    return 'md';
  };

  return (
    <Box
      width={width}
      height={height}
      borderRadius={getBorderRadius()}
      bg="gray.200"
    />
  );
};

/**
 * Session list skeleton
 */
export const SessionListSkeleton: React.FC = () => {
  return (
    <VStack space={3} p={4}>
      {[1, 2, 3].map(item => (
        <Box
          key={item}
          bg="white"
          p={4}
          rounded="md"
          shadow={1}
          borderWidth={1}
          borderColor="gray.200"
        >
          <HStack space={3} alignItems="center">
            <Skeleton variant="circle" width={50} height={50} />
            <VStack flex={1} space={2}>
              <Skeleton width="70%" height={5} />
              <Skeleton width="40%" height={4} />
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

/**
 * Message list skeleton
 */
export const MessageListSkeleton: React.FC = () => {
  return (
    <VStack space={4} p={4}>
      {[1, 2, 3].map(item => (
        <Box key={item} alignItems={item % 2 === 0 ? 'flex-start' : 'flex-end'}>
          <Box
            bg={item % 2 === 0 ? 'gray.100' : 'primary.100'}
            p={4}
            rounded="2xl"
            maxWidth="80%"
          >
            <VStack space={2}>
              <Skeleton width={150} height={4} />
              <Skeleton width={200} height={4} />
              <Skeleton width={100} height={4} />
            </VStack>
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

/**
 * File list skeleton
 */
export const FileListSkeleton: React.FC = () => {
  return (
    <VStack space={2} p={2}>
      {[1, 2, 3, 4, 5].map(item => (
        <Box
          key={item}
          bg="white"
          p={4}
          rounded="md"
          borderWidth={1}
          borderColor="gray.200"
        >
          <HStack space={3} alignItems="center">
            <Skeleton variant="circle" width={40} height={40} />
            <VStack flex={1} space={2}>
              <Skeleton width="60%" height={4} />
              <Skeleton width="30%" height={3} />
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};
