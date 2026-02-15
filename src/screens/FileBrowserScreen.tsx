/**
 * File Browser screen
 * Displays file tree and allows navigation
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
  Input,
  Icon,
  Spinner,
  Divider,
  Alert,
  Center,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFiles } from '@/hooks/useFiles';
import {
  getFileIcon,
  isDirectory,
  formatFileSize,
} from '@/services/opencode/file';

interface Props {
  navigation: any;
  route: {
    params?: {
      path?: string;
    };
  };
}

export const FileBrowserScreen: React.FC<Props> = ({ navigation, route }) => {
  const initialPath = route.params?.path || '/';
  const {
    files,
    currentPath,
    isLoading,
    error,
    navigateToPath,
    navigateUp,
    refresh,
  } = useFiles(initialPath);

  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    navigateToPath(initialPath);
  }, [initialPath, navigateToPath]);

  const handleFilePress = async (file: any) => {
    if (isDirectory(file)) {
      await navigateToPath(file.path);
    } else {
      // Navigate to file viewer
      navigation.navigate('FileViewer' as any, { path: file.path });
    }
  };

  const handleNavigateUp = async () => {
    if (currentPath !== '/') {
      await navigateUp();
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const directories = filteredFiles.filter(f => f.type === 'directory');
  const fileItems = filteredFiles.filter(f => f.type === 'file');

  return (
    <Box flex={1} bg="warmGray.50">
      {/* Header */}
      <Box bg="primary.600" p={4} safeArea>
        <VStack space={3}>
          <HStack alignItems="center" space={3}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                as={MaterialIcons}
                name="arrow-back"
                size={6}
                color="white"
              />
            </Pressable>
            <Heading size="md" color="white" flex={1}>
              File Browser
            </Heading>
            <Pressable onPress={refresh} disabled={isLoading}>
              <Icon
                as={MaterialIcons}
                name="refresh"
                size={6}
                color={isLoading ? 'gray.400' : 'white'}
              />
            </Pressable>
          </HStack>

          {/* Current Path */}
          <Pressable onPress={handleNavigateUp} disabled={currentPath === '/'}>
            <HStack
              alignItems="center"
              space={2}
              bg="primary.700"
              p={3}
              rounded="md"
            >
              <Icon as={MaterialIcons} name="folder" size={5} color="white" />
              <Text color="white" fontSize="sm" flex={1} numberOfLines={1}>
                {currentPath || '/'}
              </Text>
              {currentPath !== '/' && (
                <Icon
                  as={MaterialIcons}
                  name="arrow-upward"
                  size={4}
                  color="white"
                />
              )}
            </HStack>
          </Pressable>

          {/* Search */}
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            bg="white"
            borderRadius="md"
            InputLeftElement={
              <Icon
                as={MaterialIcons}
                name="search"
                size={5}
                ml={3}
                color="gray.400"
              />
            }
          />
        </VStack>
      </Box>

      {/* Content */}
      {isLoading && files.length === 0 ? (
        <Center flex={1}>
          <Spinner size="lg" color="primary.500" />
          <Text mt={4} color="gray.500">
            Loading files...
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
                  Failed to load files
                </Text>
              </HStack>
              <Text color="coolGray.600">{error.message}</Text>
            </VStack>
          </Alert>
        </Center>
      ) : filteredFiles.length === 0 ? (
        <Center flex={1}>
          <Icon
            as={MaterialIcons}
            name="folder-open"
            size={16}
            color="gray.300"
          />
          <Text mt={4} color="gray.500" fontSize="md">
            {searchQuery ? 'No files found' : 'This directory is empty'}
          </Text>
        </Center>
      ) : (
        <ScrollView flex={1}>
          <VStack divider={<Divider />} p={2}>
            {/* Directories */}
            {directories.map(file => (
              <Pressable
                key={file.path}
                onPress={() => handleFilePress(file)}
                bg="white"
                p={4}
                my={1}
                rounded="md"
                borderColor="gray.200"
                borderWidth={1}
              >
                <HStack alignItems="center" space={3}>
                  <Icon
                    as={MaterialIcons}
                    name={getFileIcon(file.name)}
                    size={8}
                    color="#FFC107"
                  />
                  <VStack flex={1}>
                    <Text fontSize="md" fontWeight="medium">
                      {file.name}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Directory
                    </Text>
                  </VStack>
                  <Icon
                    as={MaterialIcons}
                    name="chevron-right"
                    size={5}
                    color="gray.400"
                  />
                </HStack>
              </Pressable>
            ))}

            {/* Files */}
            {fileItems.map(file => (
              <Pressable
                key={file.path}
                onPress={() => handleFilePress(file)}
                bg="white"
                p={4}
                my={1}
                rounded="md"
                borderColor="gray.200"
                borderWidth={1}
              >
                <HStack alignItems="center" space={3}>
                  <Icon
                    as={MaterialIcons}
                    name={getFileIcon(file.name)}
                    size={8}
                    color="#2196f3"
                  />
                  <VStack flex={1}>
                    <Text fontSize="md" fontWeight="medium">
                      {file.name}
                    </Text>
                    <HStack space={2} alignItems="center">
                      <Text fontSize="xs" color="gray.500">
                        {formatFileSize(file.size)}
                      </Text>
                      {file.modified && (
                        <>
                          <Text fontSize="xs" color="gray.300">
                            •
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(file.modified).toLocaleDateString()}
                          </Text>
                        </>
                      )}
                    </HStack>
                  </VStack>
                  <Icon
                    as={MaterialIcons}
                    name="chevron-right"
                    size={5}
                    color="gray.400"
                  />
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
      )}
    </Box>
  );
};
