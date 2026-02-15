/**
 * Main App component with NativeBase configuration
 */

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { AppNavigator } from './src/navigation/AppNavigator';
import { theme } from './src/constants/themes';

const App: React.FC = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
