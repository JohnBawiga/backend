import React, { useState } from 'react';
import axios from 'axios';

class SignupFormTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: '',
      firstName: '',
      lastName: '',
      course: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
    };

    this.state = {
      existingUserData: []
    };
  }

  // Function to send a POST request to the Spring Boot API
  sendSignupRequest = async (userData) => {
    try {
      const response = await axios.post('https://wanted-sweater-production.up.railway.app/signup', userData);

      // Handle the response here
      console.log('Response:', response.data);

      // Check if the response indicates success (you can modify this condition)
      if (response.status === 200) {
        // Do something on success
        console.log('Signup successful');
      } else {
        // Handle other response statuses or errors
        console.log('Signup failed');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    }
  };
  // Function to fetch user data by userid
  fetchUserData = async (userid) => {
    try {
      const response = await axios.get(`http://roundhouse.proxy.rlwy.net:44142/user/${userid}`);

      // Check if user data was found
      if (response.status === 200) {
        const existingUserData = response.data;

        console.log(existingUserData);
        // Populate input fields with existing user data
        // const { firstName, lastName, course, email, phoneNumber } = response.data;
        // this.setState({ firstName, lastName, course, email, phoneNumber });
      } else {
        // Handle case when user data is not found
        console.log('User not found');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error:', error);
    }
  };

  handleSignup = () => {
    // Check if passwords match
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordError: 'Passwords do not match' });
      return;
    }
    this.setState({ passwordError: '' });

    // Create an object with user data
    const userData = {
      userid: this.state.userid,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      course: this.state.course,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    };
    this.sendSignupRequest(userData);
  };

  render() {
    return (
      <div style={styles.container}>
        <img src="./welltalk.png" alt="WellTalk Logo" style={styles.logo} />
        <h1 style={styles.header}>Sign Up</h1>
        <input
          type="text"
          placeholder="User ID"
          onChange={(e) => this.setState({ userid: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => this.setState({ firstName: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => this.setState({ lastName: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Course"
          onChange={(e) => this.setState({ course: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => this.setState({ email: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e) => this.setState({ phoneNumber: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => this.setState({ password: e.target.value })}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => this.setState({ confirmPassword: e.target.value })}
          style={styles.input}
        />
        {this.state.passwordError !== '' && (
          <p style={{ ...styles.errorText, color: 'turquoise' }}>{this.state.passwordError}</p>
        )}
        <button
          onClick={this.handleSignup}
          style={{ color: 'turquoise' }}
        >
          Sign Up
        </button>
        <div style={styles.footer}>
          <p style={styles.footerText}>
            By signing up you consent to "WellTalk"
          </p>
        </div>
      </div>
    );
  }
}

const styles = {
  logo: {
    width: '130px',
    height: '130px',
    objectFit: 'contain',
    marginBottom: '13px',
    marginLeft: '17px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px',
    backgroundColor: 'white',
  },
  header: {
    fontSize: '24px',
    color: 'turquoise',
    marginBottom: '16px',
    textAlign: 'center',
  },
  input: {
    height: '40px',
    borderColor: 'turquoise',
    borderWidth: '1px',
    marginBottom: '16px',
    padding: '8px',
    color: 'turquoise',
  },
  footerText: {
    marginTop: '10px',
    fontSize: '12px',
    textAlign: 'center',
    color: 'turquoise',
  },
  errorText: {
    marginTop: '10px',
    fontSize: '12px',
    textAlign: 'center',
  },
};

export default SignupFormTest;
