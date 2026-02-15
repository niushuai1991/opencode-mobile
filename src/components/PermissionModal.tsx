/**
 * Permission Modal component
 * Displays permission requests and allows user to respond
 */

import React from 'react';
import {
  Modal,
  VStack,
  HStack,
  Text,
  Icon,
  Button,
  Heading,
  Alert,
  ScrollView,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { PermissionRequest } from '@/services/opencode/permission';
import {
  formatPermissionMessage,
  getPermissionIcon,
  getPermissionColor,
} from '@/services/opencode/permission';

interface Props {
  isOpen: boolean;
  permission: PermissionRequest | null;
  onApproveOnce: () => void;
  onApproveAlways: () => void;
  onDeny: () => void;
  isResponding: boolean;
}

export const PermissionModal: React.FC<Props> = ({
  isOpen,
  permission,
  onApproveOnce,
  onApproveAlways,
  onDeny,
  isResponding,
}) => {
  if (!permission) {
    return null;
  }

  const iconName = getPermissionIcon(permission.type);
  const iconColor = getPermissionColor(permission.type);
  const message = formatPermissionMessage(permission);

  return (
    <Modal isOpen={isOpen} onClose={onDeny} size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>
          <HStack space={3} alignItems="center">
            <Icon
              as={MaterialIcons}
              name="security"
              size={6}
              color="orange.500"
            />
            <VStack flex={1}>
              <Heading size="md">Permission Request</Heading>
              <Text fontSize="xs" color="gray.500">
                OpenCode requires your permission
              </Text>
            </VStack>
          </HStack>
        </Modal.Header>

        <Modal.Body>
          <VStack space={4}>
            {/* Permission Type Badge */}
            <HStack
              bg="gray.100"
              p={3}
              rounded="md"
              alignItems="center"
              space={3}
            >
              <Icon
                as={MaterialIcons}
                name={iconName}
                size={8}
                color={iconColor}
              />
              <VStack flex={1}>
                <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
                  {permission.type}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Permission Type
                </Text>
              </VStack>
            </HStack>

            {/* Permission Message */}
            <Alert status="info" variant="subtle">
              <VStack space={2} alignItems="flex-start" w="100%">
                <HStack space={2} alignItems="center">
                  <Icon
                    as={MaterialIcons}
                    name="info"
                    size={4}
                    color="info.600"
                  />
                  <Text fontSize="md" fontWeight="bold" color="info.800">
                    Request Details
                  </Text>
                </HStack>
                <Text color="info.700">{message}</Text>
              </VStack>
            </Alert>

            {/* Additional Details */}
            {permission.data && (
              <ScrollView maxH={32} bg="gray.50" p={3} rounded="md">
                <VStack space={2}>
                  <Text fontSize="xs" fontWeight="bold" color="gray.600">
                    Additional Information
                  </Text>
                  {Object.entries(permission.data).map(([key, value]) => (
                    <HStack key={key} space={2}>
                      <Text fontSize="xs" color="gray.600" w={24}>
                        {key}:
                      </Text>
                      <Text fontSize="xs" color="gray.800" flex={1}>
                        {String(value)}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </ScrollView>
            )}

            {/* Warning Message */}
            <Alert status="warning" variant="subtle">
              <HStack space={2} alignItems="flex-start">
                <Icon
                  as={MaterialIcons}
                  name="warning"
                  size={4}
                  color="warning.600"
                  mt={0.5}
                />
                <Text fontSize="xs" color="warning.700">
                  Only approve permissions if you trust the action being
                  performed.
                </Text>
              </HStack>
            </Alert>
          </VStack>
        </Modal.Body>

        <Modal.Footer>
          <VStack space={2} w="100%">
            {/* Action Buttons */}
            <VStack space={2}>
              <Button
                size="md"
                colorScheme="primary"
                onPress={onApproveAlways}
                isDisabled={isResponding}
                isLoading={isResponding}
                leftIcon={
                  <Icon as={MaterialIcons} name="check-circle" size={5} />
                }
              >
                Approve & Remember
              </Button>
              <Button
                size="md"
                variant="outline"
                colorScheme="primary"
                onPress={onApproveOnce}
                isDisabled={isResponding}
                isLoading={isResponding}
                leftIcon={<Icon as={MaterialIcons} name="check" size={5} />}
              >
                Approve Once
              </Button>
              <Button
                size="md"
                variant="outline"
                colorScheme="danger"
                onPress={onDeny}
                isDisabled={isResponding}
                isLoading={isResponding}
                leftIcon={<Icon as={MaterialIcons} name="cancel" size={5} />}
              >
                Deny
              </Button>
            </VStack>
          </VStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
