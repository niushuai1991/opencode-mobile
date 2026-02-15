/**
 * Pull to refresh wrapper component
 * Provides consistent pull-to-refresh behavior
 */

import React from 'react';
import { ScrollView, RefreshControl, ScrollViewProps } from 'react-native';

interface Props extends ScrollViewProps {
  onRefresh: () => void | Promise<void>;
  refreshing: boolean;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<Props> = ({
  onRefresh,
  refreshing,
  children,
  ...scrollViewProps
}) => {
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  );
};
