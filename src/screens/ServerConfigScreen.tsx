/**
 * Server configuration screen
 */

import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  HStack,
  Switch,
  useToast,
  ScrollView,
  Divider,
} from 'native-base';
import { useOpencodeClient } from '../hooks/useOpencodeClient';
import { CONFIG } from '../constants/config';
import { validateServerUrl, validateDirectory } from '../utils/validation';
import type { ServerConfig } from '../types';

export const ServerConfigScreen: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState(CONFIG.DEFAULT_SERVER_URL);
  const [directory, setDirectory] = useState('');
  const [isLocal, setIsLocal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);

  const { initialize, connectionStatus, serverConfig } = useOpencodeClient();
  const toast = useToast();

  // Load saved config on mount
  React.useEffect(() => {
    if (serverConfig) {
      setBaseUrl(serverConfig.baseUrl);
      setDirectory(serverConfig.directory || '');
      setIsLocal(serverConfig.isLocal);
    }
  }, [serverConfig]);

  const handleTestConnection = async () => {
    if (!validateServerUrl(baseUrl)) {
      toast.show({
        description: 'Invalid server URL',
        placement: 'top',
      });
      return;
    }

    setTesting(true);
    try {
      // TODO: Implement actual connection test
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      toast.show({
        description: 'Connection successful!',
        placement: 'top',
      });
    } catch {
      toast.show({
        description: 'Connection failed',
        placement: 'top',
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    if (!validateServerUrl(baseUrl)) {
      toast.show({
        description: 'Invalid server URL',
        placement: 'top',
      });
      return;
    }

    if (directory && !validateDirectory(directory)) {
      toast.show({
        description: 'Invalid directory path',
        placement: 'top',
      });
      return;
    }

    setLoading(true);
    try {
      const config: ServerConfig = {
        baseUrl,
        directory: directory || undefined,
        isLocal,
      };
      await initialize(config);
      toast.show({
        description: 'Configuration saved',
        placement: 'top',
      });
    } catch (error) {
      toast.show({
        description:
          error instanceof Error
            ? error.message
            : 'Failed to save configuration',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const isConnected = connectionStatus === 'connected';

  return (
    <Box flex={1} bg="warmGray.50">
      <ScrollView>
        <Box safeArea p={4}>
          <Heading size="xl" color="primary.600" mb={6}>
            Server Configuration
          </Heading>

          <VStack space={6}>
            {/* Connection Status */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <VStack>
                  <Text fontSize="md" fontWeight="bold">
                    Status
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {connectionStatus === 'connected'
                      ? 'Connected to server'
                      : 'Not connected'}
                  </Text>
                </VStack>
                <Box
                  w={3}
                  h={3}
                  rounded="full"
                  bg={isConnected ? 'success.500' : 'gray.300'}
                />
              </HStack>
            </Box>

            {/* Server Type */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <VStack space={4}>
                <Text fontSize="md" fontWeight="bold">
                  Server Type
                </Text>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="sm">Local Server</Text>
                  <Switch
                    isChecked={isLocal}
                    onToggle={() => setIsLocal(!isLocal)}
                    offTrackColor="gray.200"
                  />
                </HStack>
              </VStack>
            </Box>

            {/* Server URL */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <VStack space={4}>
                <FormControl isRequired>
                  <FormControl.Label>Server URL</FormControl.Label>
                  <Input
                    value={baseUrl}
                    onChangeText={setBaseUrl}
                    placeholder="http://localhost:8080"
                    autoCapitalize="none"
                    keyboardType="url"
                  />
                  <FormControl.HelperText>
                    The URL of your OpenCode server
                  </FormControl.HelperText>
                </FormControl>
              </VStack>
            </Box>

            {/* Directory (Optional) */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <VStack space={4}>
                <FormControl>
                  <FormControl.Label>
                    Project Directory (Optional)
                  </FormControl.Label>
                  <Input
                    value={directory}
                    onChangeText={setDirectory}
                    placeholder="/path/to/project"
                    autoCapitalize="none"
                  />
                  <FormControl.HelperText>
                    Default directory for sessions
                  </FormControl.HelperText>
                </FormControl>
              </VStack>
            </Box>

            {/* Actions */}
            <VStack space={3}>
              <Button
                variant="outline"
                colorScheme="primary"
                onPress={handleTestConnection}
                isLoading={testing}
                isDisabled={!baseUrl}
              >
                Test Connection
              </Button>
              <Button
                colorScheme="primary"
                onPress={handleSave}
                isLoading={loading}
                isDisabled={isConnected}
              >
                {isConnected ? 'Connected' : 'Save Configuration'}
              </Button>
            </VStack>

            {/* Quick Actions */}
            <Divider my={4} />
            <Text fontSize="sm" color="gray.500" mb={2}>
              Quick Presets
            </Text>
            <VStack space={2}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onPress={() => {
                  setBaseUrl(CONFIG.DEFAULT_SERVER_URL);
                  setIsLocal(true);
                }}
              >
                Use Local Server (localhost:8080)
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                onPress={() => {
                  setBaseUrl(CONFIG.DEFAULT_REMOTE_SERVER);
                  setIsLocal(false);
                }}
              >
                Use Remote Server
              </Button>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};
