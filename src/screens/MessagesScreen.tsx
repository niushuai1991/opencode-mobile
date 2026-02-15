/**
 * Messages screen placeholder
 */

import React from 'react';
import { Center, Box, Heading, Text } from 'native-base';

export const MessagesScreen: React.FC = () => {
  return (
    <Center flex={1} bg="warmGray.50">
      <Box safeArea p={4} w="100%">
        <Heading size="xl" mb={4} color="primary.600">
          Messages
        </Heading>
        <Text fontSize="md" color="gray.600">
          Message list screen - Coming soon!
        </Text>
      </Box>
    </Center>
  );
};
