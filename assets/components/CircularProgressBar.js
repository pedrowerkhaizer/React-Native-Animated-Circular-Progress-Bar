import {StyleSheet, View} from 'react-native';
import {useRef, useState, useEffect} from "react";
import {Canvas, Path, SkFont, Skia, Text} from '@shopify/react-native-skia';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';

const CircularProgressBar = ({
  radius,
  strokeWidth,
  percentage,
  end,
  font,
}) => {
  const innerRadius = radius - strokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `${Math.round(percentage.value)}%`,
    [],
  );

  return (
    <View style={{width: radius * 2, height: radius * 2}}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          strokeWidth={strokeWidth}
          color="#333438"
          style="stroke"
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={1}
        />
        <Path
          path={path}
          strokeWidth={strokeWidth}
          color="#5E47EA"
          style="stroke"
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={end}
        />
        <Text
          x={radius - 36}
          y={radius + 36/2}
          text={targetText}
          font={font}
          color="white"
        />
      </Canvas>
    </View>
  );
};

export default CircularProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});