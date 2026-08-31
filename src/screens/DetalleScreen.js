import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function DetalleScreen({ route }) {
  const { id } = route.params;
  const [contacto, setContacto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDetalle = async () => {
      try {
        const docRef = doc(db, 'contactos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContacto(docSnap.data());
        }
      } catch (error) {
        console.error('Error al obtener detalle:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDetalle();
  }, [id]);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (!contacto) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTexto}>El contacto no fue encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>Nombre completo:</Text>
        <Text style={styles.valor}>{contacto.nombre}</Text>

        <Text style={styles.etiqueta}>Teléfono:</Text>
        <Text style={styles.valor}>{contacto.telefono}</Text>

        <Text style={styles.etiqueta}>Ciudad:</Text>
        <Text style={styles.valor}>{contacto.ciudad}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tarjeta: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  etiqueta: { fontSize: 13, color: '#888', marginTop: 12, textTransform: 'uppercase' },
  valor: { fontSize: 18, color: '#222', fontWeight: '500', marginTop: 2 },
  errorTexto: { fontSize: 16, color: '#c00' },
});