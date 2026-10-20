import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet,Text,View,TextInput,Button,Image,ScrollView,ViewStyle,TouchableOpacity,Alert,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import { RadioButton } from 'react-native-paper';

// Course Interface Definition
interface Course {
  id: string;
  name: string;
  type: '6-Month' | '6-Week';
  fee: number;
  duration: string;
}

// Data source derived from Pawsitive Pet Academy syllabus
const COURSES_DATA: Course[] = [
  { id: '1', name: 'Canine Obedience Training', type: '6-Month', fee: 1500, duration: '12 weeks' },
  { id: '2', name: 'Pet Grooming', type: '6-Month', fee: 1500, duration: '12 weeks' },
  { id: '3', name: 'Animal Behaviour', type: '6-Month', fee: 1500, duration: '12 weeks' },
  { id: '4', name: 'Pet Business Management', type: '6-Month', fee: 1500, duration: '12 weeks' },
  { id: '5', name: 'Puppy Care', type: '6-Week', fee: 750, duration: '6 weeks' },
  { id: '6', name: 'Pet First Aid', type: '6-Week', fee: 750, duration: '6 weeks' },
  { id: '7', name: 'Basic Dog Walking', type: '6-Week', fee: 750, duration: '6 weeks' },
];

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Pawsitive Pet Academy' }}
        />
        <Stack.Screen
          name="SelectCourses"
          component={SelectCoursesScreen}
          options={{ title: 'Select Courses & Quote' }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ title: 'Contact & Feedback' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Helper validation function from baseline
function isEmpty(value: string) {
  return (
    value == null ||
    (value.hasOwnProperty('length') && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}

// SCREEN 1: User Profile & Contact Registration
function HomeScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <FadeInView>
            <View style={styles.mainPicture}>
              <Image
                style={styles.imageSize}
                source={require('./images/logo.png')}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.welcomeText}>Pawsitive Pet Academy</Text>
            <Text style={styles.subHeadingText}>
              Caring, Trustworthy & Professional Pet Training
            </Text>

            {error !== '' && <Text style={styles.redError}>{error}</Text>}

            <View style={styles.inputFlex}>
              <Text style={styles.headingText}>First Name:</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="e.g. Sarah"
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>

            <View style={styles.inputFlex}>
              <Text style={styles.headingText}>Surname:</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="e.g. Smith"
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setSurname(text)}
                value={surname}
              />
            </View>

            <View style={styles.inputFlex}>
              <Text style={styles.headingText}>Email:</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="e.g. sarah@example.com"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>

            <View style={styles.inputFlex}>
              <Text style={styles.headingText}>Phone / Contact:</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="e.g. 0821234567"
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                onChangeText={(text) => setPhone(text)}
                value={phone}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Proceed to Course Selection"
                color="#2E7D32"
                onPress={() => {
                  if (!isEmpty(name) && !isEmpty(surname) && !isEmpty(email) && !isEmpty(phone)) {
                    setError('');
                    navigation.navigate('SelectCourses', {
                      userName: name,
                      userSurname: surname,
                      userEmail: email,
                      userPhone: phone,
                    });
                  } else {
                    setError('Please complete all fields to continue');
                  }
                }}
              />
            </View>
          </FadeInView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// SCREEN 2: Course Selection & Discount Calculation
function SelectCoursesScreen({ navigation, route }: { navigation: any; route: any }) {
  const { userName, userSurname, userEmail, userPhone } = route.params;
  const [selectedCourseId, setSelectedCourseId] = useState<string>('1');
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

  // Add course to user selected batch
  const handleAddCourse = () => {
    const courseToAdd = COURSES_DATA.find((c) => c.id === selectedCourseId);
    if (courseToAdd && !selectedCourses.some((c) => c.id === courseToAdd.id)) {
      setSelectedCourses([...selectedCourses, courseToAdd]);
    }
  };

  // Remove course from batch
  const handleRemoveCourse = (id: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  };

  // Calculate pricing discounts based on business rules
  const calculateTotal = () => {
    const count = selectedCourses.length;
    const rawTotal = selectedCourses.reduce((sum, item) => sum + item.fee, 0);

    let discountPercentage = 0;
    if (count === 2) discountPercentage = 0.05;
    else if (count === 3) discountPercentage = 0.1;
    else if (count > 3) discountPercentage = 0.15;

    const discountAmount = rawTotal * discountPercentage;
    const finalTotal = rawTotal - discountAmount;

    return {
      rawTotal,
      discountPercentage: discountPercentage * 100,
      discountAmount,
      finalTotal,
    };
  };

  const totals = calculateTotal();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'rgb(75, 35, 18)', padding: 16 }}>
      <Text style={styles.detailsHeader}>
        Client: {userName} {userSurname} ({userPhone})
      </Text>

      <Text style={styles.sectionTitle}>Select a Course to Add:</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioGroup}>
          {COURSES_DATA.map((course) => (
            <View key={course.id} style={styles.radioButtonRow}>
              <RadioButton.Android
                value={course.id}
                status={selectedCourseId === course.id ? 'checked' : 'unchecked'}
                onPress={() => setSelectedCourseId(course.id)}
                color="#2E7D32"
              />
              <Text style={styles.radioLabel}>
                {course.name} ({course.type}) - R{course.fee}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ marginVertical: 12 }}>
        <Button title="Add Selected Course" color="#2E7D32" onPress={handleAddCourse} />
      </View>

      <Text style={styles.sectionTitle}>
        Your Selected Courses ({selectedCourses.length}):
      </Text>
      {selectedCourses.map((item) => (
        <View key={item.id} style={styles.courseCard}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333333' }}>
              {item.name}
            </Text>
            <Text style={{ color: '#666666' }}>
              {item.type} Programme | R{item.fee}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleRemoveCourse(item.id)}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Quote Summary Box */}
      <View style={styles.quoteBox}>
        <Text style={styles.quoteTitle}>Fee Breakdown</Text>
        <Text style={styles.quoteText}>Subtotal: R{totals.rawTotal.toFixed(2)}</Text>
        <Text style={styles.quoteText}>
          Discount Tier: {totals.discountPercentage}% (-R{totals.discountAmount.toFixed(2)})
        </Text>
        <Text style={styles.quoteTotal}>Total Due: R{totals.finalTotal.toFixed(2)}</Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Button
          title="Leave Feedback & Contact Info"
          color="#2E7D32"
          onPress={() => navigation.navigate('Feedback')}
        />
      </View>
    </ScrollView>
  );
}

// SCREEN 3: Contact Information & Feedback Section
function FeedbackScreen() {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    if (!isEmpty(feedback)) {
      Alert.alert('Thank You!', 'Feedback submitted successfully.');
      setFeedback('');
    } else {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
    }
  };

  return (
    <View style={styles.appContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Contact Information Section */}
          <Text style={styles.feedbackHeading}>Contact information</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletText}>• Company Number: +277 698 7742</Text>
            <Text style={styles.bulletText}>• Email: pawsitivepetacademy@gmail.com</Text>
            <Text style={styles.bulletText}>• Location: 17 Ridge St, Durban</Text>
          </View>

          {/* Leave Feedback Section */}
          <Text style={styles.feedbackHeading}>Leave Feedback</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={5}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Type your feedback here..."
            placeholderTextColor="#A0A0A0"
          />
          <View style={styles.alignStart}>
            <TouchableOpacity style={styles.greenButton} onPress={handleFeedbackSubmit}>
              <Text style={styles.greenButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              ©2026 Pawsitive Pet Academy. All rights reserved.
            </Text>
            <Text style={styles.footerText}>
              Located in Durban | Providing Quality Pet Care Education Since 2023.
            </Text>
            <Text style={styles.footerText}>
              You can find us on the social platforms:{' '}
              <Text style={styles.linkText}>Call Us Now!</Text>{' '}
              <Text style={styles.linkText}>X</Text>{' '}
              <Text style={styles.linkText}>Instagram</Text>{' '}
              <Text style={styles.linkText}>Facebook</Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// STYLESHEET
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(75, 35, 18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  welcomeText: {
    paddingTop: 10,
    color: '#81C784',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  subHeadingText: {
    fontSize: 14,
    color: '#b8b8b8',
    textAlign: 'center',
    marginBottom: 20,
  },
  mainPicture: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#2E7D32',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginVertical: 15,
  },
  imageSize: {
    width: 700,
    height: 500,
  },
  inputFlex: {
    flexDirection: 'row',
    marginTop: 15,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
    width: '35%',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    padding: 8,
    width: '60%',
    color: '#fffcfc',
  },
  redError: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B6B',
    paddingTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 25,
    width: '85%',
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#81C784',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    color: '#81C784',
  },
  radioContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  radioGroup: {
    flexDirection: 'column',
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  radioLabel: {
    fontSize: 14,
    color: '#2E7D32',
  },
  courseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quoteBox: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 14,
    color: '#2E7D32',
    marginVertical: 2,
  },
  quoteTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 8,
  },
  appContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgb(75, 35, 18)', // Brown background matching the app
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  /* Feedback Screen Styles */
  feedbackHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#81C784', // Bright green heading
    marginTop: 16,
    marginBottom: 8,
  },
  bulletList: {
    marginBottom: 10,
    paddingLeft: 4,
  },
  bulletText: {
    fontSize: 14,
    color: '#FFFFFF', // White bullet text
    marginVertical: 2,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    padding: 10,
    textAlignVertical: 'top',
    height: 120,
    width: '100%',
    marginBottom: 12,
  },
  alignStart: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  greenButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  greenButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  footerContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#5D2E14',
    paddingTop: 15,
  },
  footerText: {
    fontSize: 13,
    color: '#E0E0E0',
    marginVertical: 3,
  },
  linkText: {
    color: '#81C784', // Green links for social platforms
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

// ANIMATION HELPER
type FadeInViewProp = {
  children: ReactNode;
  style?: ViewStyle;
};

const FadeInView = ({ children, style }: FadeInViewProp) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return <Animated.View style={{ ...style, opacity: fadeAnim }}>{children}</Animated.View>;
};