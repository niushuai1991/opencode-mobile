/**
 * App Settings screen
 * Allows users to configure app preferences
 */

import React from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Heading,
  Switch,
  Pressable,
  Divider,
  Center,
  Alert,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppSettings } from '@/hooks/useAppSettings';
import type { ThemeMode, FontSize } from '@/types';

interface Props {
  navigation: any;
}

export const AppSettingsScreen: React.FC<Props> = ({
  navigation: _navigation,
}) => {
  const { preferences, isLoading, error, updatePreferences, resetPreferences } =
    useAppSettings();

  const handleThemeChange = async (mode: ThemeMode) => {
    await updatePreferences({ themeMode: mode });
  };

  const handleFontSizeChange = async (size: FontSize) => {
    await updatePreferences({ fontSize: size });
  };

  const handleToggleChange = async (
    field:
      | 'autoScrollToBottom'
      | 'showMessageTimestamps'
      | 'notificationsEnabled',
    value: boolean
  ) => {
    await updatePreferences({ [field]: value });
  };

  const handleReset = async () => {
    await resetPreferences();
  };

  if (isLoading) {
    return (
      <Center flex={1} bg="warmGray.50">
        <Text color="gray.500">Loading settings...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1} bg="warmGray.50" p={4}>
        <Alert w="100%" status="error">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center">
              <MaterialIcons name="error" size={20} color="white" />
              <Text
                fontSize="md"
                fontWeight="bold"
                color="coolGray.800"
                flexShrink={1}
              >
                Failed to load settings
              </Text>
            </HStack>
            <Text color="coolGray.600">{error.message}</Text>
          </VStack>
        </Alert>
      </Center>
    );
  }

  return (
    <Box flex={1} bg="warmGray.50">
      <ScrollView>
        <Box safeArea p={4} w="100%">
          {/* Header */}
          <Heading size="xl" mb={4} color="primary.600">
            App Settings
          </Heading>

          <VStack space={4}>
            {/* Appearance Section */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack space={3} alignItems="center" mb={3}>
                <MaterialIcons name="palette" size={20} color="#2196f3" />
                <Text fontSize="md" fontWeight="bold">
                  Appearance
                </Text>
              </HStack>

              {/* Theme Mode */}
              <VStack mt={2}>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Theme Mode
                </Text>
                <HStack space={2}>
                  <Pressable
                    flex={1}
                    onPress={() => handleThemeChange('light')}
                    bg={
                      preferences.themeMode === 'light'
                        ? 'primary.500'
                        : 'gray.100'
                    }
                    p={3}
                    rounded="md"
                  >
                    <Center>
                      <MaterialIcons
                        name="light-mode"
                        size={24}
                        color={
                          preferences.themeMode === 'light'
                            ? 'white'
                            : 'gray.600'
                        }
                      />
                      <Text
                        fontSize="xs"
                        mt={1}
                        color={
                          preferences.themeMode === 'light'
                            ? 'white'
                            : 'gray.600'
                        }
                      >
                        Light
                      </Text>
                    </Center>
                  </Pressable>

                  <Pressable
                    flex={1}
                    onPress={() => handleThemeChange('dark')}
                    bg={
                      preferences.themeMode === 'dark'
                        ? 'primary.500'
                        : 'gray.100'
                    }
                    p={3}
                    rounded="md"
                  >
                    <Center>
                      <MaterialIcons
                        name="dark-mode"
                        size={24}
                        color={
                          preferences.themeMode === 'dark'
                            ? 'white'
                            : 'gray.600'
                        }
                      />
                      <Text
                        fontSize="xs"
                        mt={1}
                        color={
                          preferences.themeMode === 'dark'
                            ? 'white'
                            : 'gray.600'
                        }
                      >
                        Dark
                      </Text>
                    </Center>
                  </Pressable>

                  <Pressable
                    flex={1}
                    onPress={() => handleThemeChange('system')}
                    bg={
                      preferences.themeMode === 'system'
                        ? 'primary.500'
                        : 'gray.100'
                    }
                    p={3}
                    rounded="md"
                  >
                    <Center>
                      <MaterialIcons
                        name="brightness-medium"
                        size={24}
                        color={
                          preferences.themeMode === 'system'
                            ? 'white'
                            : 'gray.600'
                        }
                      />
                      <Text
                        fontSize="xs"
                        mt={1}
                        color={
                          preferences.themeMode === 'system'
                            ? 'white'
                            : 'gray.600'
                        }
                      >
                        Auto
                      </Text>
                    </Center>
                  </Pressable>
                </HStack>
              </VStack>

              <Divider my={3} />

              {/* Font Size */}
              <VStack>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Font Size
                </Text>
                <HStack space={2}>
                  {(['small', 'medium', 'large'] as FontSize[]).map(size => (
                    <Pressable
                      key={size}
                      flex={1}
                      onPress={() => handleFontSizeChange(size)}
                      bg={
                        preferences.fontSize === size
                          ? 'primary.500'
                          : 'gray.100'
                      }
                      p={3}
                      rounded="md"
                    >
                      <Center>
                        <Text
                          fontSize={
                            size === 'small'
                              ? 'xs'
                              : size === 'medium'
                                ? 'sm'
                                : 'md'
                          }
                          color={
                            preferences.fontSize === size ? 'white' : 'gray.600'
                          }
                          fontWeight="bold"
                        >
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </Text>
                      </Center>
                    </Pressable>
                  ))}
                </HStack>
              </VStack>
            </Box>

            {/* Chat Settings Section */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack space={3} alignItems="center" mb={3}>
                <MaterialIcons name="chat" size={20} color="#2196f3" />
                <Text fontSize="md" fontWeight="bold">
                  Chat Settings
                </Text>
              </HStack>

              {/* Auto Scroll to Bottom */}
              <HStack justifyContent="space-between" alignItems="center" py={2}>
                <VStack flex={1}>
                  <Text fontSize="sm">Auto Scroll to Bottom</Text>
                  <Text fontSize="xs" color="gray.500">
                    Automatically scroll when new messages arrive
                  </Text>
                </VStack>
                <Switch
                  isChecked={preferences.autoScrollToBottom}
                  onToggle={value =>
                    handleToggleChange('autoScrollToBottom', value)
                  }
                  offTrackColor="gray.200"
                  onTrackColor="primary.500"
                />
              </HStack>

              <Divider my={2} />

              {/* Show Message Timestamps */}
              <HStack justifyContent="space-between" alignItems="center" py={2}>
                <VStack flex={1}>
                  <Text fontSize="sm">Show Timestamps</Text>
                  <Text fontSize="xs" color="gray.500">
                    Display timestamps on messages
                  </Text>
                </VStack>
                <Switch
                  isChecked={preferences.showMessageTimestamps}
                  onToggle={value =>
                    handleToggleChange('showMessageTimestamps', value)
                  }
                  offTrackColor="gray.200"
                  onTrackColor="primary.500"
                />
              </HStack>
            </Box>

            {/* Notifications Section */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack space={3} alignItems="center" mb={3}>
                <MaterialIcons name="notifications" size={20} color="#2196f3" />
                <Text fontSize="md" fontWeight="bold">
                  Notifications
                </Text>
              </HStack>

              {/* Enable Notifications */}
              <HStack justifyContent="space-between" alignItems="center" py={2}>
                <VStack flex={1}>
                  <Text fontSize="sm">Push Notifications</Text>
                  <Text fontSize="xs" color="gray.500">
                    Receive notifications for new messages
                  </Text>
                </VStack>
                <Switch
                  isChecked={preferences.notificationsEnabled}
                  onToggle={value =>
                    handleToggleChange('notificationsEnabled', value)
                  }
                  offTrackColor="gray.200"
                  onTrackColor="primary.500"
                />
              </HStack>
            </Box>

            {/* Danger Zone */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack space={3} alignItems="center" mb={3}>
                <MaterialIcons name="warning" size={20} color="#f44336" />
                <Text fontSize="md" fontWeight="bold" color="#f44336">
                  Danger Zone
                </Text>
              </HStack>

              <Pressable onPress={handleReset}>
                <HStack
                  space={3}
                  alignItems="center"
                  p={3}
                  bg="red.50"
                  rounded="md"
                >
                  <MaterialIcons name="restore" size={20} color="#f44336" />
                  <Text fontSize="sm" color="#f44336">
                    Reset All Settings to Defaults
                  </Text>
                </HStack>
              </Pressable>
            </Box>

            {/* About Section */}
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack space={3} alignItems="center" mb={3}>
                <MaterialIcons name="info" size={20} color="#2196f3" />
                <Text fontSize="md" fontWeight="bold">
                  About
                </Text>
              </HStack>

              <VStack space={2}>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm" color="gray.600">
                    Version
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    1.0.0
                  </Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text fontSize="sm" color="gray.600">
                    Build
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    1
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
};
