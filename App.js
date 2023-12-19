import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import LoginFormat from "./screens/LogInForm/LoginFormat";
import CreateJournalV2 from "./screens/JournalForm/CreateJournalV2";
import EditJournalV2 from "./screens/JournalForm/EditJournalV2";
import JournalList from "./screens/JournalForm/JournalList";
import HomePage from "./screens/HomePage";
import SignupForm from "./screens/SignUpForm/SignUpForm";
import ViewProfile from "./screens/ViewProfile/ViewProfile";
import MakeAppointment from "./screens/AppointmentForm/MakeAppointment";
import ViewRequests from './screens/Guidance/ViewRequests';
import EditAppointment from './screens/Guidance/EditAppointment';
import { FontAwesome } from '@expo/vector-icons';
import SetAppointment from './screens/AppointmentForm/SetAppointment';
import Notifications from './screens/Notifications';
import Splash from './screens/Splash';
import MindAndBodyGym from './screens/MindAndBodyGym/MindAndBodyGym';
import AboutUs from './screens/AboutUs';
import ProgressReport from './screens/ProgressReport';
import Reminder from './screens/Reminder';
import ScheduledMeetings from './screens/ScheduledMeetings';
import EditProfile from './screens/ViewProfile/EditProfile';
import ForgotPassword from './screens/LogInForm/ForgotPassword';
import ResetPasswordConfirmation from "./screens/LogInForm/ResetPasswordConfirmation"
import * as Updates from 'expo-updates';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  function ProfileStack({ route }) {
    const { userid, firstName } = route.params;
  async function onFetchUpdateAsync(){
    try{
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable){
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }catch (error){
      alert("error")
    }
  }

  useEffect(() => {
    onFetchUpdateAsync
  }, [])
      return (
      <Stack.Navigator>
        <Stack.Screen
          name="ViewProfile"
          component={() => <ViewProfile userid={userid} firstName={firstName} />}
          options={{
            title: 'Profile',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#ffffff', // Set the desired font color here
            },
            headerTintColor: '#ffffff',
            headerStyle: { backgroundColor: '#30d5c8' },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={() => <EditProfile userid={userid} firstName={firstName} />}
          options={{
            title: 'Edit Profile',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#ffffff', // Set the desired font color here
            },
            headerTintColor: '#ffffff',
            headerStyle: { backgroundColor: '#30d5c8' },
          }}
        />
      </Stack.Navigator>
    );
  }

  function AppointStack({ route }) {  
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SetAppointment"
          options={{
            title: "Appointment",
            headerTitleStyle: {
              color: 'white',
            fontWeight: 'bold',
            fontSize: 25 // Set the font color to white
            },
            headerStyle: {
            backgroundColor: '#30d5c8', // Set the background color to #30d5c8
          },
          headerTintColor:'white',
          headerLeft: null, // Remove the back button
          headerShown: true,
          }}>
          {(props) => (
            <SetAppointment
            {...props}
              userid={route.params.userid}
              firstName={route.params.firstName}
            />
          )}
          
          </Stack.Screen>
        <Stack.Screen
          name="MakeAppointment"
          options={{ headerShown: false }}>
          {(props) => (
            <MakeAppointment
            {...props}
              userid={route.params.userid}
              firstName={route.params.firstName}
            />
          )}
         
          </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function JournalStack({ route }) {

    return (
      <Stack.Navigator>
        <Stack.Screen
        name="JournalList"
        options={{
          headerTitle: 'Journal',
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25 // Set the font color to white
          },
          headerStyle: {
            backgroundColor: '#30d5c8', // Set the background color to #30d5c8
          },
          headerLeft: null, // Remove the back button
          headerShown: true,
        }}>
        {(props) => (
          <JournalList
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
          />
        )}
       
        </Stack.Screen>
        <Stack.Screen
          name="EditJournalV2"
          options={{
            title: "Edit Journal",
            headerTitleStyle: {
              color: 'white',
            fontWeight: 'bold',
            fontSize: 25 // Set the font color to white
            },
            headerStyle: {
            backgroundColor: '#30d5c8', // Set the background color to #30d5c8
          },
          headerTintColor:'white'
          }}>
          {(props) => (
          <EditJournalV2
          {...props}
          userid={route.params.userid}
          />
          
          )}
</Stack.Screen>
        <Stack.Screen
          name="CreateJournalV2"
          options={{
            title: "Create a Journal",
            headerTitleStyle: {
              color: 'white',
            fontWeight: 'bold',
            fontSize: 25 // Set the font color to white
            },
            headerStyle: {
            backgroundColor: '#30d5c8', // Set the background color to #30d5c8
          },
          headerTintColor:'white'
          }}>
          {(props) => (
          <CreateJournalV2
          {...props}
            userid={route.params.userid}
          />
        )}
          
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  function HomePageStack({route}){

    return (
      <Stack.Navigator>
        <Stack.Screen
        name="HomePage"
        options={{ headerShown: false }}>
        {(props) => (
          <HomePage
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
            studentID={route.params.studentID}

          />
        )}
       
</Stack.Screen>
        <Stack.Screen
          name="Notifications"
          options={{ title: "Notifications", headerTitleAlign: 'center', headerTitleStyle: {
      color: "#ffffff" // Set the desired font color here
    }, headerTintColor: '#ffffff',
    headerStyle:{ backgroundColor: '#30d5c8'}}}>
          {(props) => (
          <Notifications
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}

          />
          
        )}
        
        </Stack.Screen>
 <Stack.Screen
        name="ViewProfile"
        options={{ title: "Profile", headerTitleAlign: 'center', headerTitleStyle: {
      color: "#ffffff" // Set the desired font color here
    }, headerTintColor: '#ffffff',
    headerStyle:{ backgroundColor: '#30d5c8'}}}>
        {(props) => (
          <ViewProfile
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
          />
        )}
        
        </Stack.Screen>
    <Stack.Screen
        name="EditProfile"
        options={{ title: "Edit Profile", headerTitleAlign: 'center', headerTitleStyle: {
      color: "#ffffff" // Set the desired font color here
    }, headerTintColor: '#ffffff',
    headerStyle:{ backgroundColor: '#30d5c8'}}}>
        {(props) => (
          <EditProfile
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
          />
        )}
       
</Stack.Screen>    
 <Stack.Screen
        name="AboutUs"
        options={{ title: "About Us", headerTitleAlign: 'center', headerTitleStyle: {
      color: "#ffffff" // Set the desired font color here
    }, headerTintColor: '#ffffff',
    headerStyle:{ backgroundColor: '#30d5c8'}}}>
        {(props) => (
          <AboutUs
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
          />
        )}
       
        </Stack.Screen>
        <Stack.Screen
        name="ProgressReport"
        options={{ title: "Progress Report", headerTitleAlign: 'center', headerTitleStyle: {
      color: "#ffffff" // Set the desired font color here
    }, headerTintColor: '#ffffff',
    headerStyle:{ backgroundColor: '#30d5c8'}}}>
        {(props) => (
          <ProgressReport
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
          />
        )}
        
</Stack.Screen>
        <Stack.Screen
          name="Reminder"
          options={{ title: "Reminders", headerTitleAlign: 'center', headerTitleStyle: {
      color: "#ffffff" // Set the desired font color here
    }, headerTintColor: '#ffffff',
    headerStyle:{ backgroundColor: '#30d5c8'}}}>
          {(props) => (
          <Reminder
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
            studentID={route.params.studentID}

          />
        )}
        
        </Stack.Screen>
        <Stack.Screen
          name="ScheduledMeetings"
          options={{ title: "Scheduled Meetings", headerTitleAlign: 'center', headerTitleStyle: {
      color: "#ffffff" // Set the desired font color here
    }, headerTintColor: '#ffffff',
    headerStyle:{ backgroundColor: '#30d5c8'}}}>
          {(props) => (
          <ScheduledMeetings
          {...props}
            userid={route.params.userid}
            firstName={route.params.firstName}
            studentID={route.params.studentID}

          />
          
        )}
       
        </Stack.Screen>
      
      
      </Stack.Navigator>

    )
  }
  function MainStack({ route }) {
    const { studentID, userid, firstName } = route.params;

    return (
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="HomePageStack"
          component={HomePageStack}       
          initialParams={{ userid, firstName, studentID}}
   
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={30}
                color={focused ? "#30d5c8" : "gray"}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Journal"
          component={JournalStack}
          initialParams={{ userid, firstName }}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="notebook-plus"
                size={30}
                color={focused ? "#30d5c8" : "gray"}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
         name="AppointStack"
          component={AppointStack}
          initialParams={{ userid,firstName }} // Pass the initial parameters here
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
               name="circle-with-plus"
              size={30}
              color={focused ? "#30d5c8" : "gray"}
              />
            ),
           headerShown: false,
          }}
        />
        <Tab.Screen
          name="MindAndBodyGym"
          component={MindAndBodyGym}
          initialParams={{ userid }}
          options={{ 
            tabBarIcon: ({ focused }) => (
              <FontAwesome name="gamepad" size={30} color={focused ? "#30d5c8" : "gray"} />
            ),
       
            title: "Mind & Body Gym",
            headerTitleStyle: {
              color: 'white',
            fontWeight: 'bold',
            fontSize: 25 // Set the font color to white
            },
            headerStyle: {
            backgroundColor: '#30d5c8', // Set the background color to #30d5c8
          },
          headerTintColor:'white'
        
 }}
        />
      </Tab.Navigator>

      
    );
  }

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
          component={Splash}
          options={{ headerShown: false }}
      />
        <Stack.Screen
          name="Login"
          component={LoginFormat}
          options={{ headerShown: false }}
        /> 
         <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="ResetPasswordConfirmation"
          component={ResetPasswordConfirmation}
          options={{ headerShown: false }}
        /> 
        

        <Stack.Screen
        name="SignupForm"
        component={SignupForm}
        options={{ headerShown: false }}/>
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{ headerShown: false }}
        />  
      
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

export default App;

