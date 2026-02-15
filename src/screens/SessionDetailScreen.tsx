/**
 * Session detail screen placeholder
 */

import React from 'react';
import { Center, Box, Heading, Text } from 'native-base';
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../types';

type SessionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'SessionDetail'
>;
type SessionDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SessionDetail'
>;

interface Props {
  route: SessionDetailScreenRouteProp;
  navigation: SessionDetailScreenNavigationProp;
}

export const SessionDetailScreen: React.FC<Props> = ({ route }) => {
  const { sessionId } = route.params;

  return (
    <Center flex={1} bg="warmGray.50">
      <Box safeArea p={4} w="100%">
        <Heading size="xl" mb={4} color="primary.600">
          Session Details
        </Heading>
        <Text fontSize="md" color="gray.600">
          Session ID: {sessionId}
        </Text>
        <Text fontSize="sm" color="gray.500" mt={2}>
          Session detail screen - Coming soon!
        </Text>
      </Box>
    </Center>
  );
};
