import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function NuevoScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async () => {
    if (!nombre.trim() || !telefono.trim() || !ciudad.trim()) {
      Alert.alert('Campos requeridos', 'Todos los campos son obligatorios para guardar el contacto.');
      return;
    }

    try {
      setGuardando(true);
      await addDoc(collection(db, 'contactos'), {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        ciudad: ciudad.trim(),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el contacto.');
      console.error(error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Juan Pérez"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 3001234567"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <Text style={styles.label}>Ciudad:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Medellín"
        value={ciudad}
        onChangeText={setCiudad}
      />

      <TouchableOpacity 
        style={[styles.boton, guardando && styles.botonDeshabilitado]} 
        onPress={handleGuardar}
        disabled={guardando}
      >
        {guardando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>Guardar Contacto</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  boton: {
    backgroundColor: '#0066cc',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 28,
  },
  botonDeshabilitado: { backgroundColor: '#80b3e6' },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});