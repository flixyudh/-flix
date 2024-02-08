import React, { useCallback, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';

/**
 * @author [Yudi Iswandi (Flix)](https://github.com/zxccvvv)
 *
 * @param {Object} props
 * @param {import('react').ReactElement} [props.renderTitle] - Custom Layout of item in data
 * @param {Boolean} [props.expanded=false] - Whether to show the child components or not
 * @param {Number} [props.animatedDuration] - Duration of animated transition in milliseconds
 * @param {import('react-native').ViewProps} [props.style] - Set custom style of root view Picker
 * @param {import('react-native').ViewProps} [props.titleStyle] - Set custom style of Title Section
 * @param {import('react-native').EasingStatic} [props.easing] - Function from [Easing](https://reactnative.dev/docs/easing)
 * @param {import('react').ReactElement} [props.renderIcon] - Render Icon next to Title Section
 */
const Accordion = ({
  children,
  renderTitle,
  expanded,
  animatedDuration = 300,
  style,
  titleStyle,
  easing,
  renderIcon,
}) => {
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(200);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `-${Math.PI}rad`],
  });

  const startAnimation = React.useCallback(() => {
    Animated.timing(animatedController, {
      duration: animatedDuration,
      useNativeDriver: false,
      toValue: !expanded ? 0 : 1,
      easing: easing || Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start();
  }, [expanded]);

  React.useEffect(() => {
    startAnimation();
  }, [expanded, startAnimation]);

  const RenderTitle = useCallback(() => {
    if (renderIcon && renderTitle)
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, ...titleStyle }}>{renderTitle}</View>
          <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
            {renderIcon}
          </Animated.View>
        </View>
      );
    else if (renderTitle)
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, ...titleStyle }}>{renderTitle}</View>
        </View>
      );
    else null;
  });

  return (
    <View style={style}>
      <RenderTitle />
      <Animated.View style={{ overflow: 'hidden', height: bodyHeight }}>
        <View
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
          onLayout={(event) =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
