import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const Lock = () => {
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const navigation = useNavigation();
  // const offset = useSharedValue(0);

  const offSET = 20;
  const time = 80;

  useEffect(() => {
    if (code.length === 6) {
      if (code.join('') === '111111') {
        navigation.replace('Home');
        setCode([]);
      } else {
        // offset.value = withSequence(
        //   withTiming(-offSET, {duration: time / 2}),
        //   withRepeat(withTiming(offSET, {duration: time}), 4, true),
        //   withTiming(0, {duration: time / 2}),
        // );
        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    setCode([...code, number]);
  };

  const numberBackPress = () => {
    setCode(code.slice(0, -1));
  };

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>{'Welcome Back, Emilye'}</Text>
      <View style={styles.codeView}>
        {codeLength?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.codeEmpty,
              {
                backgroundColor: code[index] ? '#3D38ED' : '#D8DCE2',
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.numbersView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {[1, 2, 3].map(number => (
            <Text
              key={number}
              style={styles.number}
              onPress={() => onNumberPress(number)}>
              {number}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.numbersView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {[4, 5, 6].map(number => (
            <Text
              key={number}
              style={styles.number}
              onPress={() => onNumberPress(number)}>
              {number}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.numbersView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {[7, 8, 9].map(number => (
            <Text
              key={number}
              style={styles.number}
              onPress={() => onNumberPress(number)}>
              {number}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginVertical: 100,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numbersView: {
    marginHorizontal: 80,
    gap: 60,
  },
  number: {
    fontSize: 32,
  },
});

export default Lock;
