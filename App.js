import { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { formatNumberWithCommas } from './assets/utils/formatNumberWithCommas';
import { generateRandomNumber } from './assets/utils/generateRandomNumber';
import CircularProgressBar from './assets/components/CircularProgressBar';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { calculatePercentage } from './assets/utils/calculatePercentage';
import {useFont} from '@shopify/react-native-skia';

const GOAL = 100000;
const RADIUS = 120;
const STROKE_WIDTH = 30;

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  const [balance, setBalance] = useState(0);
  const percentage = useSharedValue(0);
  const end = useSharedValue(0);
  const font = useFont(require('./assets/fonts/Roboto-Bold.ttf'), 60);

  const handlePress = () => {
    const generateRandomValue = generateRandomNumber(GOAL);
    const generatePercentage = calculatePercentage(generateRandomValue, GOAL);
    setBalance(generateRandomValue);
    percentage.value = withTiming(generatePercentage, {duration: 500});
    end.value = withTiming(generatePercentage/100, {duration: 500});
  }

  const onLayoutRootView = useCallback( async () => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) {
    return null
  };

  if(!font) return <View />;

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <View style={styles.contentContainer}>
        <View style={styles.circularContainer}>
          <CircularProgressBar 
          radius={RADIUS} 
          strokeWidth={STROKE_WIDTH} 
          font={font} 
          percentage={percentage} 
          end={end} />
          </View>
        <View style={styles.textContainer}>
          <Text style={styles.textSmall}>Balance</Text>
          <Text style={styles.text}>${formatNumberWithCommas(balance)}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textSmall}>Goal</Text>
          <Text style={styles.text}>${formatNumberWithCommas(GOAL)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
        <Text style={styles.buttonText}>Random</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    backgroundColor: '#0c0b10',
  },
  contentContainer: {
    padding: 40,
    backgroundColor: '#19191f',
    margin: 10,
    borderRadius: 34,
    justifyContent: 'center'
  },
  circularContainer:{
    alignItems: 'center'
  },
  textContainer: {
    marginTop: 20,
    gap:10
  },
  textSmall: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Roboto-Light',
  },
  text: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Roboto-Bold',
  },
  button: {
    backgroundColor: '#19191f',
    margin: 10,
    padding: 20,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Roboto-Bold',
  }
});
