import React from 'react';
import {RefreshControl, ScrollView, StatusBar, StyleSheet} from 'react-native';

interface RootContainer {
  children: React.ReactElement | React.ReactElement[];
  backgroundColor: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  nestedScrollEnabled?: boolean;
}

const RootContainer = ({
  children,
  backgroundColor,
  refreshing,
  onRefresh,
  nestedScrollEnabled,
}: RootContainer) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={nestedScrollEnabled}
        refreshControl={
          refreshing !== undefined && onRefresh !== undefined ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }>
        {children}
      </ScrollView>
    </>
  );
};

export default RootContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
