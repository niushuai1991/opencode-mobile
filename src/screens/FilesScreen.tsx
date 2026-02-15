/**
 * Files screen placeholder
 */

import React from 'react';
import { Center, Box, Heading, Text } from 'native-base';

export const FilesScreen: React.FC = () => {
  return (
    <Center flex={1} bg="warmGray.50">
      <Box safeArea p={4} w="100%">
        <Heading size="xl" mb={4} color="primary.600">
          File Browser
        </Heading>
        <Text fontSize="md" color="gray.600">
          File browser screen - Coming soon!
        </Text>
      </Box>
    </Center>
  );
};
