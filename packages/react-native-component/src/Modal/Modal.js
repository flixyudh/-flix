import React, { useCallback } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import useTheme from '../Hook/useTheme';

const { height } = Dimensions.get('window');

const PressableAnimation = Animated.createAnimatedComponent(Pressable);

/**
 * @typedef {Object} ModalData - The component props.
 * @prop {function} props.hide - Function to hide the modal.
 * @prop {import('react').ReactElement} props.renderItem - Function that renders the modal content.
 * @prop {boolean} [props.disabledBackdrop=false] - Flag to disable the backdrop.
 * @prop {function} [props.onPressBackdrop] - Function triggered when the backdrop is pressed.
 * @prop {number} [props.duration=300] - Animation duration in milliseconds.
 * @prop {string} [props.animationType] - Type of animation to use ('fade' or 'slide').
 * @prop {import('react-native').ViewProps} [props.style] - Additional styles for the modal container.
 */

/**
 * @file Modal.js
 * @brief This is a React Native component used for displaying Modal.
 * @param {ModalData} Props
 * @returns {JSX.Element} The Modal component.
 */
const Modal = ({
  hide,
  renderItem,
  disabledBackdrop = false,
  onPressBackdrop,
  duration = 300,
  animationType,
  style,
}) => {
  const animation = React.useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const interpolateAnimation = (inputRange, outputRange) => {
    return animation.interpolate({
      inputRange,
      outputRange,
    });
  };

  const runAnimated = (toValue) => {
    return Animated.timing(animation, {
      toValue,
      duration,
      easing: Easing.elastic(0.8),
      useNativeDriver: true,
    });
  };

  React.useEffect(() => {
    if (animationType) runAnimated(1).start();
  }, [animationType]);

  const onHide = (cb) => {
    if (!animationType) {
      onPressBackdrop?.();
      hide();
      return;
    }
    runAnimated(0).start(() => {
      onPressBackdrop?.();
      hide();
    });
  };

  const fadeStyle = {
    opacity: animation,
    transform: [{ scale: animation }],
  };

  const slideStyle = {
    transform: [{ translateY: interpolateAnimation([0, 1], [height / 2, 0]) }],
  };

  const animationStyle = () => {
    switch (animationType) {
      case 'fade':
        return fadeStyle;
      case 'slide':
        return slideStyle;
      default:
        return {};
    }
  };

  const RenderComponent = useCallback(
    () => React.createElement(renderItem),
    [renderItem]
  );

  return (
    <PressableAnimation
      onPress={onHide}
      activeOpacity={1}
      disabled={disabledBackdrop}
      style={[
        styles.container,
        {
          backgroundColor: colors.backdrop,
          opacity: animationType ? animation : 1,
        },
        style,
      ]}
    >
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            animationStyle(),
            { backgroundColor: colors.surface },
            styles.content,
          ]}
        >
          <RenderComponent />
        </Animated.View>
      </TouchableWithoutFeedback>
    </PressableAnimation>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    justifyContent: 'center',
  },
  content: {
    padding: 14,
    margin: 14,
    borderRadius: 5,
  },
});

export default Modal;
