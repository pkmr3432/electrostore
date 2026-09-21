import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '../../../theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryContainer,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 56 + insets.bottom,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.surfaceContainerHigh,
          elevation: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          padding: 0,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          ...typography.labelTechnical,
          textTransform: 'uppercase',
          marginTop: 2, // Space between icon and label
        },
        tabBarBackground: () => (
          <BlurView
            intensity={90}
            tint="light"
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.8)' }]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarLabel: 'WISHLIST',
          tabBarIcon: ({ color }) => <MaterialIcons name="favorite-border" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarLabel: 'CART',
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialIcons name="shopping-bag" size={24} color={color} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarLabel: 'ACCOUNT',
          tabBarIcon: ({ color }) => <MaterialIcons name="person-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.primaryContainer,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    ...typography.labelTechnical,
    color: colors.onPrimary,
    fontSize: 8,
    lineHeight: 10,
    fontWeight: 'bold',
  },
});
