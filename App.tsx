
import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet,Text,View,TextInput,Button,Image,ScrollView,ViewStyle,TouchableOpacity,} from 'react-native';
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
          name="ManageEnrollments"
          component={ManageEnrollmentsScreen}
          options={{ title: 'Manage Course Wishlist' }}
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
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>

            <View style={styles.inputFlex}>
              <Text style={styles.headingText}>Surname:</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="e.g. Smith"
                onChangeText={(text) => setSurname(text)}
                value={surname}
              />
            </View>

            <View style={styles.inputFlex}>
              <Text style={styles.headingText}>Phone / Contact:</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="e.g. 0821234567"
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
                  if (!isEmpty(name) && !isEmpty(surname) && !isEmpty(phone)) {
                    setError('');
                    navigation.navigate('SelectCourses', {
                      userName: name,
                      userSurname: surname,
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

// --- SCREEN 2: Course Selection & Discount Calculation ---
function SelectCoursesScreen({ navigation, route }: { navigation: any; route: any }) {
  const { userName, userSurname, userPhone } = route.params;
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
    <ScrollView style={{ flex: 1, backgroundColor: '#F9F9F9', padding: 16 }}>
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

      <Text style={styles.sectionTitle}>Your Selected Courses ({selectedCourses.length}):</Text>
      {selectedCourses.map((item) => (
        <View key={item.id} style={styles.courseCard}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ color: '#666' }}>
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
          title="Manage Custom Wishlist"
          onPress={() => navigation.navigate('ManageEnrollments')}
        />
      </View>
    </ScrollView>
  );
}

// --- SCREEN 3: Interactive Dynamic Wishlist Manager ---
function ManageEnrollmentsScreen() {
  const [customNotes, setCustomNotes] = useState<string[]>([]);
  const [txtInput, setTxtInput] = useState<string>('');

  const removeNoteHandler = (index: number) => {
    setCustomNotes((currentNotes) => currentNotes.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.appContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.mainPicture}>
            <Image
              style={styles.bannerImage}
              source={require('./images/hero.png')} // Replace with local image asset
              resizeMode="contain"
            />
          </View>
          <Text style={styles.welcomeText}>Special Requests & Goals</Text>
          <Text style={{ textAlign: 'center', color: '#555', marginBottom: 15 }}>
            Add custom notes or specific pet goals for your instructor:
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. House training advice for puppy"
              onChangeText={(text) => setTxtInput(text)}
              value={txtInput}
            />
            <Button
              title="Add Note"
              color="#2E7D32"
              onPress={() => {
                if (!isEmpty(txtInput)) {
                  setCustomNotes([...customNotes, txtInput]);
                  setTxtInput('');
                }
              }}
            />
          </View>

          <View style={styles.skillsContainer}>
            {customNotes.map((note, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={styles.skillText}>{note}</Text>
                <TouchableOpacity
                  onPress={() => removeNoteHandler(index)}
                  style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  welcomeText: {
    paddingTop: 10,
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  subHeadingText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  mainPicture: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSize: {
    width: 250,
    height: 180,
  },
  bannerImage: {
    width: 300,
    height: 120,
    alignSelf: 'center',
  },
  inputFlex: {
    flexDirection: 'row',
    marginTop: 15,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    color: '#333333',
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
    color: '#333333',
  },
  redError: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
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
    color: '#2E7D32',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    color: '#333',
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
    color: '#333',
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
    backgroundColor: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    width: '70%',
    padding: 8,
  },
  skillsContainer: {
    marginTop: 10,
  },
  skillText: {
    fontSize: 14,
    color: '#333',
    width: '75%',
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