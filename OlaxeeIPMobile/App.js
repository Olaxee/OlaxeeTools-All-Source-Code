import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Linking,
  AppState,
} from 'react-native';
import { NetworkInfo } from 'react-native-network-info';

export default function App() {
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');
  const [batteryWarning, setBatteryWarning] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [noWifi, setNoWifi] = useState(false); // ⚡ uniquement Wi-Fi obligatoire
  const appState = useRef(AppState.currentState);

  const fetchIp = async () => {
    setError('');
    setBatteryWarning(false);
    setShowInstruction(false);
    setNoWifi(false);

    try {
      const ssid = await NetworkInfo.getSSID();

      // 🚫 PAS DE WIFI détecté
      if (!ssid || ssid === 'null') {
        setIp('');
        setNoWifi(true);
        return;
      }

      // ✅ WIFI détecté → on cherche l’IP
      const localIp = await NetworkInfo.getIPV4Address();
      if (localIp && localIp !== '0.0.0.0') {
        setIp(localIp);
        setError('');
      } else {
        setIp('');
        setError("Erreur: IP privée non trouvée.");
        setBatteryWarning(true);
      }
    } catch (e) {
      setIp('');
      setError('Erreur de détection.');
      setBatteryWarning(true);
    }
  };

  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      return await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE
      );
    }
    return true;
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const alreadyGranted = await checkPermission();
      if (alreadyGranted) return true;

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_WIFI_STATE,
          {
            title: 'Permission réseau',
            message:
              "L'application a besoin d'accéder à l'état du réseau pour détecter l'IP",
            buttonNeutral: 'Demander plus tard',
            buttonNegative: 'Annuler',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const openBatterySettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    }
  };

  const checkAndFetch = async () => {
    const granted = await requestPermissions();
    if (!granted) {
      setError('Permission réseau refusée.');
    }
  };

  useEffect(() => {
    checkAndFetch();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        checkAndFetch();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.label}>IP :</Text>

        {showInstruction ? (
          <Text style={styles.instruction}>
            Veuillez appuyer sur le bouton "Réessayer" pour détecter votre IP.
          </Text>
        ) : noWifi ? (
          <Text style={styles.noNetworkWarning}>
            🚫 Connexion Wi-Fi requise.{"\n"}
            Veuillez activer votre Wi-Fi pour détecter l’IP.
          </Text>
        ) : (
          <Text style={styles.ip}>{ip || 'Chargement…'}</Text>
        )}

        {!noWifi && error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}

        {!noWifi && batteryWarning && Platform.OS === 'android' && (
          <View style={styles.batteryWarning}>
            <Text style={styles.warningText}>
              ⚠ Veuillez mettre l'application sur "Pas de restriction" dans les
              paramètres batterie.
            </Text>
            <TouchableOpacity style={styles.button} onPress={openBatterySettings}>
              <Text style={styles.buttonText}>Ouvrir les paramètres</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={fetchIp}
          activeOpacity={0.7}
          accessibilityLabel="Réessayer la détection de l’IP"
        >
          <Text style={styles.buttonText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerLeft}>IP détectée côté appareil local</Text>
      <Text style={styles.footerRight}>Powered by Olaxee</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0e',
    justifyContent: 'center',
  },
  wrap: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 24,
    color: '#9aa7b8',
    letterSpacing: 1,
    marginBottom: 8,
  },
  ip: {
    fontWeight: '700',
    fontSize: 56,
    color: '#e6eef8',
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#9aa7b8',
    textAlign: 'center',
    marginVertical: 12,
  },
  error: {
    color: '#ff6b6b',
    marginTop: 12,
  },
  noNetworkWarning: {
    fontSize: 18,
    color: '#ff4444',
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: '600',
  },
  batteryWarning: {
    marginTop: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#442222',
    alignItems: 'center',
  },
  warningText: {
    color: '#ffcc00',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e6eef8',
    backgroundColor: '#0b0b0e',
  },
  buttonText: {
    fontSize: 18,
    color: '#e6eef8',
    fontWeight: '600',
    textAlign: 'center',
  },
  footerLeft: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 14,
    color: '#6c7681',
    fontStyle: 'italic',
  },
  footerRight: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    fontSize: 14,
    color: '#6c7681',
    fontStyle: 'italic',
  },
});
