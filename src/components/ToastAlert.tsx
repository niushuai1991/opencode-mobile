/**
 * Toast alert component
 * Displays toast notifications
 */

import React from 'react';
import { Alert, HStack, VStack, Text, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type { ToastType } from '@/types';

interface Props {
  id?: string;
  type: ToastType;
  title: string;
  description?: string;
  onClose?: () => void;
}

const toastConfig = {
  success: {
    icon: 'check-circle',
    color: 'success',
    bgColor: 'success.600',
  },
  error: {
    icon: 'error',
    color: 'error',
    bgColor: 'error.600',
  },
  warning: {
    icon: 'warning',
    color: 'warning',
    bgColor: 'warning.600',
  },
  info: {
    icon: 'info',
    color: 'info',
    bgColor: 'info.600',
  },
};

export const ToastAlert: React.FC<Props> = ({
  id: _id,
  type,
  title,
  description,
  onClose,
}) => {
  const config = toastConfig[type];

  return (
    <Alert
      maxWidth="95%"
      alignSelf="center"
      flexDirection="row"
      status={config.color}
      variant="solid"
      {...(onClose && { onClose })}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Icon
              as={MaterialIcons}
              name={config.icon}
              size="5"
              color="white"
            />
            <Text fontSize="md" fontWeight="bold" color="white" flexShrink={1}>
              {title}
            </Text>
          </HStack>
        </HStack>
        {description && (
          <Text px="6" fontSize="xs" color="white" flexShrink={1}>
            {description}
          </Text>
        )}
      </VStack>
    </Alert>
  );
};
