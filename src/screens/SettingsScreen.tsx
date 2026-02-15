/**
 * Settings screen
 */

import React from 'react';
import {
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Pressable,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  navigation: any;
}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Center flex={1} bg="warmGray.50">
      <Box safeArea p={4} w="100%">
        <Heading size="xl" mb={4} color="primary.600">
          Settings
        </Heading>
        <VStack space={4}>
          {/* Server Configuration */}
          <Pressable onPress={() => navigation.navigate('ServerConfig' as any)}>
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space={3} alignItems="center">
                  <MaterialIcons name="settings" size={20} color="#2196f3" />
                  <VStack>
                    <Text fontSize="md" fontWeight="bold">
                      Server Configuration
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Configure server URL and directory
                    </Text>
                  </VStack>
                </HStack>
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color="gray.400"
                />
              </HStack>
            </Box>
          </Pressable>

          {/* App Settings */}
          <Pressable onPress={() => navigation.navigate('AppSettings' as any)}>
            <Box bg="white" p={4} rounded="md" shadow={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space={3} alignItems="center">
                  <MaterialIcons name="tune" size={20} color="#2196f3" />
                  <VStack>
                    <Text fontSize="md" fontWeight="bold">
                      App Settings
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Theme, font size, notifications
                    </Text>
                  </VStack>
                </HStack>
                <MaterialIcons
                  name="chevron-right"
                  size={20}
                  color="gray.400"
                />
              </HStack>
            </Box>
          </Pressable>

          {/* App Version */}
          <Box bg="white" p={4} rounded="md" shadow={1}>
            <HStack space={3} alignItems="center">
              <MaterialIcons name="info" size={20} color="#2196f3" />
              <VStack>
                <Text fontSize="md" fontWeight="bold">
                  App Version
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  1.0.0
                </Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};
