import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

interface CustomDateProps {
  title: string;
  placeholderText?: string;
  onChange?: any;
}

const CustomDate = ({title, onChange, placeholderText}: CustomDateProps) => {
  const handleChange = (text: string) => {
    onChange(text);
  };
  return (
    <View style={[{marginHorizontal: 10}]}>
      <Text style={[styles.dateTitle]}>{title}</Text>
      <TextInput
        style={[styles.dateInput]}
        keyboardType="numeric"
        onChangeText={handleChange}
      />
    </View>
  );
};

interface ShowAgeProps {
  year: string | number;
  month: string | number;
  days: string | number;
}

const ShowAge = ({year, month, days}: ShowAgeProps) => {
  return (
    <View>
      <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
        <Text style={[styles.numericStyle]}>{year}</Text>
        <Text style={[styles.text]}>years</Text>
      </View>
      <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
        <Text style={[styles.numericStyle]}>{month}</Text>
        <Text style={[styles.text]}>Months</Text>
      </View>
      <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
        <Text style={[styles.numericStyle]}>{days}</Text>
        <Text style={[styles.text]}>days</Text>
      </View>
    </View>
  );
};

const isValidDate = (day: any, month: any, year: any) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year &&
    date <= new Date()
  );
};

interface calculateAgeProps {
  years: number;
  months: number;
  days: number;
}
const calculateAge = (birthDate: Date, currentDate: Date) => {
  const diffInMilliseconds = currentDate.getTime() - birthDate.getTime();
  const ageDate = new Date(diffInMilliseconds);
  return {
    years: ageDate.getUTCFullYear() - 1970,
    months: ageDate.getUTCMonth(),
    days: ageDate.getUTCDate() - 1,
  };
};

const AgeCalculatorApp = () => {
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [age, setAge] = useState<calculateAgeProps | null>(null);

  const handleCalculateAge = () => {
    if (!day || !month || !year) {
      setIsValid(false);
      setAge(null);
      return;
    }

    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10);
    const parsedYear = parseInt(year, 10);

    if (
      parsedDay < 1 ||
      parsedDay > 31 ||
      parsedMonth < 1 ||
      parsedMonth > 12 ||
      !isValidDate(parsedDay, parsedMonth, parsedYear)
    ) {
      setIsValid(false); // Invalid date error
      setAge(null);
      return;
    }

    const currentDate = new Date();
    const birthDate = new Date(parsedYear, parsedMonth - 1, parsedDay);
    const calculatedAge = calculateAge(birthDate, currentDate);

    setIsValid(true);
    setAge(calculatedAge);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 13,
          backgroundColor: '#EEEEEE',
          flex: 1,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            height: '70%',
            backgroundColor: 'white',
            borderRadius: 50,
            borderBottomRightRadius: 200,
          }}>
          <View style={{flexDirection: 'row'}}>
            <CustomDate title="DAY" onChange={setDay} />
            <CustomDate title="MONTH" onChange={setMonth} />
            <CustomDate title="YEAR" onChange={setYear} />
          </View>
          <Pressable style={[styles.button]} onPress={handleCalculateAge}>
            <Icons name="arrow-down-outline" size={36} color={'white'} />
          </Pressable>
          {!isValid && (
            <Text style={styles.error}>Please enter a valid date.</Text>
          )}
          {isValid && age !== null && (
            <ShowAge year={age.years} month={age.months} days={age.days} />
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dateTitle: {
    color: 'grey',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 2,
  },
  dateInput: {
    width: 100,
    height: 60,
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 20,
    marginTop: 5,
    fontWeight: '900',
    fontSize: 18,
    color: 'black',
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#834AFE',
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numericStyle: {
    color: '#834AFE',
    fontSize: 86,
    fontWeight: '900',
    marginTop: -30,
  },
  text: {
    color: 'black',
    marginLeft: 15,
    fontSize: 60,
    fontWeight: '900',
    marginTop: -10,
  },
  error: {color: 'red', fontSize: 16},
});

export default AgeCalculatorApp;
