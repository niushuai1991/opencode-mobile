/**
 * Message list screen
 */

import React from 'react';
import {
  Box,
  Heading,
  ScrollView,
  Text,
  Center,
  Spinner,
  VStack,
  HStack,
  IconButton,
  useToast,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useMessages } from '../hooks/useMessages';
import { useEventStream } from '../hooks/useEventStream';
import { usePermissions } from '../hooks/usePermissions';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { PermissionModal } from '../components/PermissionModal';
import type { PermissionRequest } from '@/services/opencode/permission';

interface Props {
  route: {
    params: {
      sessionId: string;
    };
  };
  navigation: any;
}

export const MessageListScreen: React.FC<Props> = ({ route }) => {
  const { sessionId } = route.params;
  const toast = useToast();

  const { messages, loading, error, refreshing, refresh, sendMessage } =
    useMessages(sessionId);

  const {
    pendingPermission,
    isResponding,
    loadHistory,
    handlePermissionRequest,
    approveOnce,
    approveAlways,
    deny,
  } = usePermissions(sessionId);

  // Load permission history on mount
  React.useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Listen for message updates
  useEventStream(
    'message.updated',
    (_event: unknown) => {
      // Message was updated - refresh the list
      refresh();
    },
    true
  );

  // Listen for permission requests
  useEventStream(
    'permission.request',
    (event: unknown) => {
      const permissionEvent = event as {
        sessionID: string;
        permissionID: string;
        type: string;
        message?: string;
        data?: unknown;
      };

      // Handle permission request
      const permissionRequest: PermissionRequest = {
        id: permissionEvent.permissionID,
        sessionID: permissionEvent.sessionID,
        type: permissionEvent.type,
        message: permissionEvent.message,
        data: permissionEvent.data as any,
        timestamp: Date.now(),
      };

      handlePermissionRequest(permissionRequest);
    },
    true
  );

  const handleSend = async (content: string) => {
    try {
      await sendMessage(content);
      // Refresh will be triggered by SSE event
    } catch (err) {
      toast.show({
        description:
          err instanceof Error ? err.message : 'Failed to send message',
        placement: 'top',
      });
    }
  };

  // Loading state
  if (loading && messages.length === 0) {
    return (
      <Center flex={1} bg="warmGray.50">
        <VStack space={3} alignItems="center">
          <Spinner size="lg" color="primary.600" />
          <Text color="gray.600">Loading messages...</Text>
        </VStack>
      </Center>
    );
  }

  // Error state
  if (error && messages.length === 0) {
    return (
      <Center flex={1} bg="warmGray.50">
        <VStack space={4} alignItems="center" px={8}>
          <MaterialIcons name="error-outline" size={60} color="#ef4444" />
          <Heading size="md" color="error.500">
            Error
          </Heading>
          <Text fontSize="md" color="gray.600" textAlign="center">
            {error.message}
          </Text>
          <IconButton
            icon={<MaterialIcons name="refresh" size={24} color="white" />}
            bg="primary.500"
            borderRadius="full"
            size={12}
            onPress={refresh}
          />
        </VStack>
      </Center>
    );
  }

  // Empty state
  if (messages.length === 0) {
    return (
      <Box flex={1} bg="warmGray.50">
        <Box safeArea p={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="sm" color="primary.600">
              Messages
            </Heading>
            <IconButton
              icon={<MaterialIcons name="refresh" />}
              onPress={refresh}
              isDisabled={refreshing}
            />
          </HStack>
        </Box>
        <Center flex={1}>
          <VStack space={4} alignItems="center" px={8}>
            <MaterialIcons
              name="chat-bubble-outline"
              size={60}
              color="gray.400"
            />
            <Text fontSize="lg" color="gray.600" textAlign="center">
              No messages yet
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Start the conversation by sending a message below
            </Text>
          </VStack>
        </Center>
        <MessageInput onSend={handleSend} loading={loading} />
      </Box>
    );
  }

  // Messages list
  return (
    <Box flex={1} bg="warmGray.50">
      {/* Header */}
      <Box safeArea p={4}>
        <HStack justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="sm" color="primary.600">
            Messages
          </Heading>
          <IconButton
            icon={<MaterialIcons name="refresh" />}
            onPress={refresh}
            isDisabled={refreshing}
          />
        </HStack>
      </Box>

      {/* Messages */}
      <ScrollView flex={1} px={4} pb={5}>
        <VStack space={2}>
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              message={message}
              isUser={message.role === 'user'}
              onPress={() => {
                // TODO: Show message details
              }}
            />
          ))}
        </VStack>
      </ScrollView>

      {/* Input */}
      <MessageInput onSend={handleSend} loading={loading} />

      {/* Permission Modal */}
      <PermissionModal
        isOpen={pendingPermission !== null}
        permission={pendingPermission}
        onApproveOnce={approveOnce}
        onApproveAlways={approveAlways}
        onDeny={deny}
        isResponding={isResponding}
      />
    </Box>
  );
};
