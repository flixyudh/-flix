import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import useTheme from '../Hook/useTheme';
import { Text } from '../index';

/**
 * @typedef {Object} ButtonProps
 * @prop {String} [ButtonProps.label] - Label of Button
 * @prop {('outlined'|'filledTonal'|'filled')} [ButtonProps.variant=filled] - Whether to show the child components or not
 * @prop {import('react-native').ViewProps} ButtonProps.style - Button style container
 * @prop {Boolean} [ButtonProps.borderless=false] - enable or disable Button borderRadius
 * @prop {import('react').ReactElement} [ButtonProps.children] - Render custom JSX inside Button
 */
/**
 * @author [Yudi Iswandi (Flix)](https://github.com/zxccvvv)
 * @param {ButtonProps & import('react-native').PressableProps} props
 */
const Button = ({ label, variant, style, borderless, children, ...rest }) => {
  const { colors } = useTheme();

  const buttonStyles = useMemo(() => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: rest.disabled ? colors.onSurface + '1F' : colors.outline,
          borderRadius: 20,
        };
      case 'filledTonal':
        return {
          backgroundColor: rest.disabled
            ? colors.onSurface + '1F'
            : colors.secondaryContainer,
        };

      case 'filled':
      default:
        return {
          backgroundColor: rest.disabled
            ? colors.onSurface + '1F'
            : colors.primary,
        };
    }
  }, [variant, colors]);

  const textStyles = useMemo(() => {
    switch (variant) {
      case 'outlined':
        return {
          color: rest.disabled ? colors.onSurface + '61' : colors.primary,
        };
      case 'filledTonal':
        return {
          color: rest.disabled
            ? colors.onSurface + '61'
            : colors.onSecondaryContainer,
        };

      default:
        return {
          color: rest.disabled ? colors.onSurface + '61' : colors.onPrimary,
        };
    }
  }, [variant, colors]);

  const RenderChidren = useCallback(() => {
    if (children) return children;
    return (
      <Text style={[textStyles, { fontWeight: '500' }]}>{title || label}</Text>
    );
  }, [title]);

  return (
    <View style={[style, !borderless && styles.border]}>
      <Pressable
        style={[styles.buttonStyle, buttonStyles]}
        android_ripple={{ color: textStyles.color + '1A' }}
        {...rest}
      >
        <RenderChidren />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingLeft: 24,
    paddingRight: 24,
  },
  border: { overflow: 'hidden', borderRadius: 20 },
});

export default Button;
