/**
 * Error Boundary component
 * Catches JavaScript errors anywhere in the child component tree
 */

import React from 'react';
import { Box, VStack, Heading, Text, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.handleReset}
          />
        );
      }

      return (
        <Box
          flex={1}
          bg="warmGray.50"
          justifyContent="center"
          alignItems="center"
          p={8}
          safeArea
        >
          <VStack space={4} alignItems="center" maxWidth="400">
            <MaterialIcons name="bug-report" size={80} color="#ef4444" />
            <Heading size="lg" color="error.500" textAlign="center">
              Something went wrong
            </Heading>
            <Text fontSize="md" color="gray.600" textAlign="center">
              {this.state.error.message}
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              An unexpected error occurred. Please try again or contact support
              if the problem persists.
            </Text>
            <Button
              leftIcon={
                <MaterialIcons name="refresh" size={20} color="white" />
              }
              colorScheme="primary"
              size="lg"
              onPress={this.handleReset}
              mt={2}
            >
              Try Again
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
