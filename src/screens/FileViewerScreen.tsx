/**
 * File Viewer screen
 * Displays file content with syntax highlighting
 */

import React from 'react';
import {
  Box,
  ScrollView,
  VStack,
  HStack,
  Text,
  Pressable,
  Heading,
  Icon,
  Spinner,
  Alert,
  Center,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { readFile } from '@/services/opencode/file';

interface Props {
  navigation: any;
  route: {
    params: {
      path: string;
    };
  };
}

export const FileViewerScreen: React.FC<Props> = ({ navigation, route }) => {
  const { path } = route.params;
  const [content, setContent] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    loadFileContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const loadFileContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await readFile(path);

      if (result.error) {
        setError(result.error);
        setContent('');
      } else if (result.data) {
        setContent((result.data as any).content || '');
      }
    } catch (err) {
      setError(err as Error);
      setContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const fileName = path.split('/').pop() || path;

  return (
    <Box flex={1} bg="warmGray.50">
      {/* Header */}
      <Box bg="primary.600" p={4} safeArea>
        <HStack alignItems="center" space={3}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={MaterialIcons} name="arrow-back" size={6} color="white" />
          </Pressable>
          <VStack flex={1}>
            <Heading size="md" color="white" numberOfLines={1}>
              {fileName}
            </Heading>
            <Text fontSize="xs" color="primary.100" numberOfLines={1}>
              {path}
            </Text>
          </VStack>
          <Pressable onPress={loadFileContent} disabled={isLoading}>
            <Icon
              as={MaterialIcons}
              name="refresh"
              size={6}
              color={isLoading ? 'gray.400' : 'white'}
            />
          </Pressable>
        </HStack>
      </Box>

      {/* Content */}
      {isLoading ? (
        <Center flex={1}>
          <Spinner size="lg" color="primary.500" />
          <Text mt={4} color="gray.500">
            Loading file...
          </Text>
        </Center>
      ) : error ? (
        <Center flex={1} p={4}>
          <Alert w="100%" status="error">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Icon
                  as={MaterialIcons}
                  name="error"
                  size={5}
                  color="coolGray.800"
                />
                <Text fontSize="md" fontWeight="bold" color="coolGray.800">
                  Failed to load file
                </Text>
              </HStack>
              <Text color="coolGray.600">{error.message}</Text>
            </VStack>
          </Alert>
        </Center>
      ) : !content ? (
        <Center flex={1}>
          <Icon
            as={MaterialIcons}
            name="description"
            size={16}
            color="gray.300"
          />
          <Text mt={4} color="gray.500" fontSize="md">
            This file is empty
          </Text>
        </Center>
      ) : (
        <ScrollView flex={1} bg="gray.900">
          <VStack p={4} space={0}>
            {/* Line Numbers and Content */}
            {content.split('\n').map((line, index) => (
              <HStack key={index} alignItems="flex-start" py={1}>
                {/* Line Number */}
                <Text
                  w={12}
                  textAlign="right"
                  mr={4}
                  fontSize="xs"
                  color="gray.500"
                  fontFamily="monospace"
                >
                  {index + 1}
                </Text>
                {/* Line Content */}
                <Text
                  flex={1}
                  fontSize="sm"
                  color="gray.100"
                  fontFamily="monospace"
                  selectable
                >
                  {line === '' ? ' ' : line}
                </Text>
              </HStack>
            ))}
          </VStack>
        </ScrollView>
      )}

      {/* Footer */}
      {!isLoading && !error && content && (
        <Box bg="gray.100" p={3} safeAreaBottom>
          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={4} alignItems="center">
              <HStack space={2} alignItems="center">
                <Icon
                  as={MaterialIcons}
                  name="description"
                  size={4}
                  color="gray.600"
                />
                <Text fontSize="xs" color="gray.600">
                  {content.split('\n').length} lines
                </Text>
              </HStack>
              <HStack space={2} alignItems="center">
                <Icon
                  as={MaterialIcons}
                  name="text-fields"
                  size={4}
                  color="gray.600"
                />
                <Text fontSize="xs" color="gray.600">
                  {content.length} characters
                </Text>
              </HStack>
            </HStack>
            <Pressable
              bg="primary.500"
              px={4}
              py={2}
              rounded="md"
              onPress={() => {
                // Copy to clipboard
                // TODO: Implement clipboard functionality
              }}
            >
              <HStack space={2} alignItems="center">
                <Icon
                  as={MaterialIcons}
                  name="content-copy"
                  size={4}
                  color="white"
                />
                <Text fontSize="xs" fontWeight="bold" color="white">
                  Copy
                </Text>
              </HStack>
            </Pressable>
          </HStack>
        </Box>
      )}
    </Box>
  );
};
