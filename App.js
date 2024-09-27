import React, { useRef, useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Animated, Image, ScrollView } from 'react-native';
import { useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/564x/f6/c2/ed/f6c2edb46ad8800cec20218e6062f68c.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Text style={styles.title}>LifeStyle Fit</Text>
            <Text style={styles.subtitle}>
              Seu espaço de bem-estar, do seu jeito. Movimente-se com a gente.
            </Text>
          </Animated.View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Junte-se a nós</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Entrar')}>
            <Text style={styles.linkText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigation.navigate('Feed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.centeredContent}>
        <Text style={styles.formTitle}>Cadastro</Text>
        <TextInput style={styles.input} placeholder="Nome de perfil" />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        <TouchableOpacity style={styles.buttonForm} onPress={handleLogin}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const EntrarScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigation.navigate('Feed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.centeredContent}>
        <Text style={styles.formTitle}>Entrar</Text>
        <TextInput style={styles.input} placeholder="Email / Nome de perfil" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        <TouchableOpacity style={styles.buttonForm} onPress={handleLogin}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const FeedScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
    } else {
      console.error('Location permission not granted');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.feedContainer}>
      <View style={styles.header}>
        <Text style={styles.feedTitle}></Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.feedContent}>
        {location ? (
          <Text style={styles.locationText}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        ) : (
          <Text style={styles.locationText}>Obtendo localização...</Text>
        )}
        <Image source={{ uri: 'https://i.pinimg.com/564x/1f/7c/fb/1f7cfb6f8f905482867194ec9daea2b0.jpg' }} style={styles.feedImage} />
<Text>Veja os Beneficios de Aveia com morango, banana e granola </Text>

        <Image source={{ uri: 'https://i.pinimg.com/564x/1f/64/87/1f6487f8caac682b4a086c455c5ff3a2.jpg' }} style={styles.feedImage} />
<Text>Uma boa flexibilidade é essencial para a vida fitness</Text>

        <Image source={{ uri: 'https://i.pinimg.com/564x/1a/df/9a/1adf9a05ce0f1fd335b763250d9f0755.jpg' }} style={styles.feedImage} />
<Text>Água e todo sua importancia...</Text>

        <Image source={{ uri: 'https://i.pinimg.com/564x/e0/75/fb/e075fb2d4ab4691c12c7958dd8b7c2d6.jpg' }} style={styles.feedImage} />
<Text>Dieta equilibrada = corpo e físico em dia.</Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const AddVideoScreen = () => {
  const navigation = useNavigation();
  const [recording, setRecording] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.formTitle}>Adicionar Vídeo</Text>
      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.galleryButton} onPress={() => {/* lógica para abrir galeria */}}>
            <Ionicons name="image-outline" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.recordButton}
            onPress={() => setRecording(!recording)}
          >
            <View style={styles.recordCircle} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const SettingsScreen = () => {
  const handleNotification = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        console.log('Permissão de notificação não concedida');
        return;
      }
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Vamos Treinar?",
        body: "Aproveite para se movimentar e cuidar do seu bem-estar!",
        sound: true,
      },
      trigger: null,
    });
  };

  return (
    <SafeAreaView style={styles.settingsContainer}>
      <Text style={styles.settingsTitle}>Configurações</Text>
      <TouchableOpacity onPress={handleNotification} style={styles.notificationButton}>
        <Ionicons name="notifications-outline" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://i.pinimg.com/564x/fd/c7/17/fdc7179feacde8b2454243f12151c06b.jpg' }} 
          style={styles.profilePic}
        />
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>300</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>180</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.postsContainer}>
        <View style={styles.post}>
          <Image 
            source={{ uri: 'https://example.com/post1.jpg' }} 
            style={styles.postImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
        <Ionicons name="home-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AddVideo')}>
        <Ionicons name="add-circle-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  const routeNameRef = useRef();
  const navigationRef = useNavigationContainerRef();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };

    checkPermissions();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Entrar">
          {props => <EntrarScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="AddVideo" component={AddVideoScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>

      {isLoggedIn && (
        <BottomTabNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
  },
  textContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 75,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 0,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 90,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
  },
  linkText: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    marginBottom: 20,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonForm: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  feedContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedTitle: {
    fontSize: 24,
  },
  feedContent: {
    alignItems: 'center',
  },
  feedImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsTitle: {
    fontSize: 24,
  },
  profileContainer: {
    flex: 1,
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
  },
  statLabel: {
    fontSize: 14,
  },
  postsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  post: {
    width: '48%',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 100,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerContainer: {
    justifyContent: 'flex-end',
  },
  galleryButton: {
    marginRight: 20,
  },
  recordButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordCircle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: 'gray',
  },
  locationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationButton: {
    marginTop: 20,
  },
});