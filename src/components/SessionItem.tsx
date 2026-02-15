/**
 * Session item component for displaying a single session
 */

import React from 'react';
import { Box, Pressable, HStack, VStack, Text } from 'native-base';
import { formatDistanceToNow } from 'date-fns';
import type { Session } from '../types';

interface SessionItemProps {
  session: Session;
  onPress: () => void;
}

export const SessionItem: React.FC<SessionItemProps> = ({
  session,
  onPress,
}) => {
  const timeAgo = formatDistanceToNow(new Date(session.time.created), {
    addSuffix: true,
  });

  return (
    <Pressable onPress={onPress} mb={3}>
      <Box
        bg="white"
        p={4}
        rounded="md"
        shadow={1}
        borderWidth={1}
        borderColor="gray.200"
      >
        <VStack space={2}>
          <HStack alignItems="center">
            <Text fontSize="lg" fontWeight="bold" color="gray.800" flex={1}>
              {session.title}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {timeAgo}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {session.directory}
          </Text>
          <HStack mt={2}>
            <Text fontSize="xs" color="primary.600" fontWeight="semibold">
              {session.version}
            </Text>
            {session.share && (
              <Text fontSize="xs" color="green.600" ml={2}>
                Shared
              </Text>
            )}
          </HStack>
        </VStack>
      </Box>
    </Pressable>
  );
};
