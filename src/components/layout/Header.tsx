import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../../theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BlurView
        intensity={90}
        tint="light"
        style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.8)' }]}
      />
      <View style={styles.content}>
        <View style={styles.left}>
          <Image 
            source={require('../../../assets/images/logo.svg')} 
            style={styles.logo} 
            contentFit="contain" 
          />
        </View>
        <View style={styles.right}>
          <Pressable style={styles.iconButton}>
            <MaterialIcons name="search" size={24} color={colors.onSurface} />
          </Pressable>
          <View style={styles.profileContainer}>
            <Image 
              source={require('../../../assets/images/profile.jpg')} 
              style={styles.profileImage} 
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceContainerHigh,
  },
  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 32,
    width: 128,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: spacing.space2xs,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
