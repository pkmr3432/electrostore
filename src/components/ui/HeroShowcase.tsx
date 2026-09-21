import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors, spacing, typography, radii } from '../../../theme';

export function HeroShowcase() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={require('../../../assets/images/hero.jpg')}
          style={styles.image}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}
          locations={[0, 0.4, 1]}
          style={styles.gradient}
        />
        
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.focusBadge}>
              <Text style={styles.focusText}>Audio Focus</Text>
            </View>
            <Text style={styles.seriesText}>Series 01</Text>
          </View>
          
          <View style={styles.bottomSection}>
            <View style={styles.textStack}>
              <Text style={styles.categoryText}>Studio Sound</Text>
              <Text style={styles.headline}>Precision wireless over-ear transducers engineered with aerospace aluminum.</Text>
            </View>
            
            <View style={styles.actionRow}>
              <Pressable style={({ pressed }) => [styles.exploreBtn, pressed && styles.pressed]}>
                <Text style={styles.exploreText}>Explore Collection</Text>
                <MaterialIcons name="arrow-forward" size={16} color={colors.surfaceContainerLowest} />
              </Pressable>
              
              <View style={styles.pagination}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.margin,
    paddingBottom: spacing.spaceXl,
  },
  card: {
    width: '100%',
    height: 320,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.inverseSurface,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    padding: spacing.spaceLg,
    justifyContent: 'space-between',
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  focusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // approximate lowest/20
    paddingHorizontal: spacing.spaceXs,
    paddingVertical: spacing.space2xs,
    borderRadius: radii.default,
  },
  focusText: {
    ...typography.labelTechnical,
    color: colors.surfaceContainerLowest,
    textTransform: 'uppercase',
  },
  seriesText: {
    ...typography.labelTechnical,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
  },
  bottomSection: {
    gap: spacing.spaceSm,
    paddingTop: spacing.spaceXl,
  },
  textStack: {
    gap: spacing.space2xs,
  },
  categoryText: {
    ...typography.labelMd,
    color: colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  headline: {
    ...typography.headlineSm,
    color: colors.surfaceContainerLowest, // inverse-on-surface is f2f0f0, let's use white for better contrast as per Stitch
    fontWeight: '500',
    maxWidth: 280,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.spaceXs,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.space2xs,
  },
  exploreText: {
    ...typography.labelLg,
    color: colors.surfaceContainerLowest,
  },
  pressed: {
    opacity: 0.7,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(242, 240, 240, 0.4)',
  },
  dotActive: {
    width: 16,
    backgroundColor: colors.surfaceContainerLowest,
  }
});
