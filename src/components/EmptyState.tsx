/**
 * Empty state component
 * Displays empty states with optional actions
 */

import React from 'react';
import {
  Center,
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
  Button,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title?: string;
  message: string;
  icon?: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<Props> = ({
  title,
  message,
  icon = 'inbox',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  return (
    <Center flex={1} bg="warmGray.50" px={8} py={12}>
      <VStack space={4} alignItems="center" maxWidth="400">
        <Icon as={MaterialIcons} name={icon} size={20} color="gray.300" />
        {title && (
          <Heading size="md" color="gray.700" textAlign="center">
            {title}
          </Heading>
        )}
        <Text fontSize="md" color="gray.500" textAlign="center">
          {message}
        </Text>
        {(onAction || onSecondaryAction) && (
          <HStack space={3} mt={2}>
            {onSecondaryAction && secondaryActionLabel && (
              <Button
                variant="outline"
                colorScheme="primary"
                onPress={onSecondaryAction}
                size="sm"
              >
                {secondaryActionLabel}
              </Button>
            )}
            {onAction && actionLabel && (
              <Button
                colorScheme="primary"
                onPress={onAction}
                size="sm"
                leftIcon={<MaterialIcons name="add" size={16} color="white" />}
              >
                {actionLabel}
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </Center>
  );
};
