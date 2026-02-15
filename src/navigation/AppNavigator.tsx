/**
 * React Navigation configuration
 */

import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackParamList, MainTabParamList } from '../types';
import { ROUTES } from '../constants/config';

// Import screen components
import { SessionsScreen } from '../screens/SessionsScreen';
import { MessagesScreen } from '../screens/MessagesScreen';
import { FilesScreen } from '../screens/FilesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { SessionDetailScreen } from '../screens/SessionDetailScreen';
import { MessageListScreen } from '../screens/MessageListScreen';
import { FileBrowserScreen } from '../screens/FileBrowserScreen';
import { FileViewerScreen } from '../screens/FileViewerScreen';
import { ServerConfigScreen } from '../screens/ServerConfigScreen';
import { AppSettingsScreen } from '../screens/AppSettingsScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

/**
 * Main tab navigator
 */
const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2196f3',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ focused }) => {
          let iconName = 'help';
          switch (route.name) {
            case ROUTES.SESSIONS:
              iconName = 'chat-bubble-outline';
              break;
            case ROUTES.MESSAGES:
              iconName = 'message';
              break;
            case ROUTES.FILES:
              iconName = 'folder';
              break;
            case ROUTES.SETTINGS:
              iconName = 'settings';
              break;
          }
          return (
            <MaterialIcons
              name={iconName as any}
              size={24}
              color={focused ? '#2196f3' : '#999'}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.SESSIONS}
        component={SessionsScreen}
        options={{ title: 'Sessions' }}
      />
      <Tab.Screen
        name={ROUTES.MESSAGES}
        component={MessagesScreen}
        options={{ title: 'Messages' }}
      />
      <Tab.Screen
        name={ROUTES.FILES}
        component={FilesScreen}
        options={{ title: 'Files' }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root stack navigator
 */
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.SESSION_DETAIL}
          component={SessionDetailScreen}
          options={{ title: 'Session Details' }}
        />
        <Stack.Screen
          name={ROUTES.MESSAGE_LIST}
          component={MessageListScreen}
          options={{ title: 'Messages' }}
        />
        <Stack.Screen
          name={ROUTES.FILE_BROWSER}
          component={FileBrowserScreen}
          options={{ title: 'File Browser' }}
        />
        <Stack.Screen
          name="FileViewer"
          component={FileViewerScreen}
          options={{ title: 'File Viewer' }}
        />
        <Stack.Screen
          name="ServerConfig"
          component={ServerConfigScreen}
          options={{ title: 'Server Configuration' }}
        />
        <Stack.Screen
          name="AppSettings"
          component={AppSettingsScreen}
          options={{ title: 'App Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
