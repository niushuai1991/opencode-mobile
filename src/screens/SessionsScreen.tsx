/**
 * Sessions list screen
 */

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Fab,
  Icon,
  Spinner,
  Text,
  Center,
  HStack,
  VStack,
  useToast,
  IconButton,
  Button,
  ScrollView,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useOpencodeClient } from '../hooks/useOpencodeClient';
import { useSessions } from '../hooks/useSessions';
import { useEventStream } from '../hooks/useEventStream';
import { SessionItem } from '../components/SessionItem';
import { CreateSessionModal } from '../components/CreateSessionModal';
import { ConnectionStatus } from '../components/ConnectionStatus';

interface Props {
  navigation: any;
}

export const SessionsScreen: React.FC<Props> = ({ navigation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const { isInitialized, connectionStatus, serverConfig } = useOpencodeClient();
  const { sessions, loading, error, refresh, createSession } = useSessions(
    serverConfig?.directory
  );

  // Listen for session creation events
  useEventStream(
    'session.created',
    (event: unknown) => {
      const payload = event as {
        properties: { info: { id: string; title: string } };
      };
      toast.show({
        description: `New session "${payload.properties.info.title}" created`,
        placement: 'top',
        duration: 3000,
      });
      refresh();
    },
    isInitialized && connectionStatus === 'connected'
  );

  // Listen for session update events
  useEventStream(
    'session.updated',
    (event: unknown) => {
      const payload = event as {
        properties: { info: { id: string; title: string } };
      };
      toast.show({
        description: `Session "${payload.properties.info.title}" updated`,
        placement: 'top',
        duration: 2000,
      });
      refresh();
    },
    isInitialized && connectionStatus === 'connected'
  );

  // Listen for session deletion events
  useEventStream(
    'session.deleted',
    (event: unknown) => {
      const payload = event as {
        properties: { info: { title: string } };
      };
      toast.show({
        description: `Session "${payload.properties.info.title}" deleted`,
        placement: 'top',
        duration: 3000,
      });
      refresh();
    },
    isInitialized && connectionStatus === 'connected'
  );

  // Listen for session status changes
  useEventStream(
    'session.status',
    (_event: unknown) => {
      // Session status changed (idle, busy, retry)
      // Refresh sessions when status changes
      refresh();
    },
    isInitialized && connectionStatus === 'connected'
  );

  const handleCreateSession = async (title: string) => {
    try {
      await createSession(title);
      await refresh();
    } catch (err) {
      throw err;
    }
  };

  const handleRefresh = async () => {
    try {
      await refresh();
    } catch (err) {
      toast.show({
        description: err instanceof Error ? err.message : 'Failed to refresh',
        placement: 'top',
      });
    }
  };

  // Not connected state
  if (!isInitialized || connectionStatus === 'disconnected') {
    return (
      <Center flex={1} bg="warmGray.50">
        <Box safeArea p={4} w="100%" alignItems="center">
          <Heading size="xl" mb={4} color="primary.600">
            OpenCode Mobile
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center" mb={6}>
            Configure your server to get started
          </Text>
          <Button
            colorScheme="primary"
            onPress={() => navigation.navigate('ServerConfig')}
          >
            Go to Settings
          </Button>
        </Box>
      </Center>
    );
  }

  // Loading state
  if (loading && sessions.length === 0) {
    return (
      <Center flex={1} bg="warmGray.50">
        <Spinner size="lg" color="primary.600" />
      </Center>
    );
  }

  // Error state
  if (error && sessions.length === 0) {
    return (
      <Center flex={1} bg="warmGray.50">
        <Box safeArea p={4} w="100%" alignItems="center">
          <Heading size="md" mb={2} color="error.500">
            Error
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center" mb={4}>
            {error.message}
          </Text>
          <Button colorScheme="primary" onPress={handleRefresh}>
            Retry
          </Button>
        </Box>
      </Center>
    );
  }

  // Empty state
  if (sessions.length === 0) {
    return (
      <Box flex={1} bg="warmGray.50">
        <Box safeArea p={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="xl" color="primary.600">
              Sessions
            </Heading>
            <IconButton
              icon={<Icon as={MaterialIcons} name="refresh" />}
              onPress={handleRefresh}
              isDisabled={loading}
            />
          </HStack>
        </Box>
        <Center flex={1}>
          <VStack space={4} alignItems="center">
            <Icon
              as={MaterialIcons}
              name="folder-open"
              size={20}
              color="gray.400"
            />
            <Text fontSize="lg" color="gray.600">
              No sessions yet
            </Text>
            <Text fontSize="sm" color="gray.500">
              Create your first session to get started
            </Text>
          </VStack>
        </Center>
        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          icon={<Icon color="white" as={MaterialIcons} name="add" />}
          label="Create Session"
          onPress={() => setIsModalOpen(true)}
        />
        <CreateSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateSession}
        />
      </Box>
    );
  }

  // Sessions list
  return (
    <Box flex={1} bg="warmGray.50">
      <Box safeArea p={4}>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="xl" color="primary.600">
            Sessions
          </Heading>
          <HStack space={3} alignItems="center">
            <ConnectionStatus status={connectionStatus} />
            <IconButton
              icon={<Icon as={MaterialIcons} name="refresh" />}
              onPress={handleRefresh}
              isDisabled={loading}
            />
          </HStack>
        </HStack>
      </Box>
      <ScrollView>
        <VStack space={0} pb={24}>
          {sessions.map(session => (
            <Box px={4}>
              <SessionItem
                session={session}
                onPress={() => {
                  navigation.navigate('MessageList' as any, {
                    sessionId: session.id,
                  });
                }}
              />
            </Box>
          ))}
        </VStack>
      </ScrollView>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={MaterialIcons} name="add" />}
        label="Create Session"
        onPress={() => setIsModalOpen(true)}
      />
      <CreateSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateSession}
      />
    </Box>
  );
};
