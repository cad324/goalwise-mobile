import { View } from "react-native";
import styles from "../../styles/global.Style";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import api from "../../lib/api.config";
import i18n from "../../locales/i18n";
import { API_ENDPOINT } from "../../lib/constants";
import { login } from "../../app/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { StatusBar } from "expo-status-bar";

type RegistrationFormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  password2?: string;
}

type RegistrationFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
}

const validateForm = (values: RegistrationFormFields): [boolean, RegistrationFormErrors] => {
  const errors: RegistrationFormErrors = {};

  // Validate First Name
  if (!values.firstName.trim()) {
    errors.firstName = i18n.t('errors.fNameRequired');
  }

  // Validate Last Name
  if (!values.lastName.trim()) {
    errors.lastName = i18n.t('errors.lNameRequired');
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim()) {
    errors.email = i18n.t('errors.emailRequired');
  } else if (!emailRegex.test(values.email)) {
    errors.email = i18n.t('errors.invalidEmail');
  }

  // Validate Password
  if (!values.password) {
    errors.password = i18n.t('errors.passwordRequired');
  } else if (values.password.length < 8) {
    errors.password = i18n.t('errors.passwordWeak');
  }

  // Validate Password Confirmation
  if (!values.password2) {
    errors.password2 = i18n.t('errors.password2Required');
  } else if (values.password !== values.password2) {
    errors.password2 = i18n.t('errors.passwordNoMatch');
  }

  const isValid = Object.keys(errors).length === 0;

  return [isValid, errors];
};

function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleChangeName = (text: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const validatedText = text.replace(/[^a-zA-Z]/g, '');
    setter(validatedText);
  }

  const createAccount = async () => {
    const [isValidInputs, errors] = validateForm({
      firstName,
      lastName,
      email,
      password,
      password2
    });

    if (!isValidInputs) {
      return; //TODO: handle errors
    }

    try {
      const response = await api.post('/users/', {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      });

      if (response.status == 201) {
        const tokenResponse = await api.post('/token/', {
          email,
          password
        });

        if (tokenResponse.status === 200) {
          const token = await tokenResponse.data;
          dispatch(login(token));
        }
      }
    } catch (err) {
      console.error('[createAccount]', err);
    }
  }

  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <View id={'formView'} style={{flex: 1, justifyContent: 'center'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={{flexGrow: 1}}>
              <TextInput 
                onChangeText={(val) => handleChangeName(val, setFirstName)} 
                value={firstName}
                label={i18n.t('register.firstName')} 
              />
            </View>
            <View style={{flexGrow: 1}}>
              <TextInput 
                label={i18n.t('register.lastName')}
                onChangeText={(val) => handleChangeName(val, setLastName)} 
                value={lastName}
              />
            </View>
          </View>
          <View style={{marginTop: 25}}>
            <TextInput 
              label={i18n.t('register.email')} 
              onChangeText={setEmail} 
              value={email}
            />
          </View>
          <View style={{marginTop: 25}}>
            <TextInput
              secureTextEntry
              onChangeText={setPassword} 
              value={password}
              label={i18n.t('register.password')} />
            <TextInput 
              secureTextEntry 
              label={i18n.t('register.confirmPassword')} 
              onChangeText={setPassword2} 
              value={password2}
            />
          </View>
          <View style={{marginTop: 30}}>
            <Button mode="contained" onPress={createAccount}>
              Register
            </Button>
          </View>
        </View>
      </View>
    );
}

export default Register;