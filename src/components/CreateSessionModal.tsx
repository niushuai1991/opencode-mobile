/**
 * Create session modal component
 */

import React, { useState } from 'react';
import {
  Modal,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  useToast,
} from 'native-base';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => Promise<void>;
}

export const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.show({
        description: 'Please enter a session title',
        placement: 'top',
      });
      return;
    }

    try {
      setLoading(true);
      await onCreate(title.trim());
      setTitle('');
      onClose();
      toast.show({
        description: 'Session created successfully',
        placement: 'top',
      });
    } catch (error) {
      toast.show({
        description:
          error instanceof Error ? error.message : 'Failed to create session',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <Modal.Content maxWidth="400">
        <Modal.CloseButton />
        <Modal.Header>
          <Heading size="md">Create New Session</Heading>
        </Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            <Text>Create a new development session</Text>
            <Input
              placeholder="Session title"
              value={title}
              onChangeText={setTitle}
              autoFocus
              maxLength={100}
            />
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              onPress={handleCreate}
              isLoading={loading}
              isDisabled={!title.trim()}
            >
              Create
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
