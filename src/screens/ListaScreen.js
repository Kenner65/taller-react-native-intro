import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export default function ListaScreen({ navigation }) {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'contactos'), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContactos(docs);
      setCargando(false);
    });

    return () => unsub();
  }, []);

  if (cargando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.cargandoTexto}>Cargando contactos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.vacioTexto}>No hay contactos registrados.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalle', { id: item.id, nombre: item.nombre })}
          >
            <Text style={styles.cardTitulo}>{item.nombre}</Text>
            <Text style={styles.cardSubtitulo}>{item.telefono}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Nuevo')}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  cargandoTexto: { marginTop: 10, color: '#666' },
  vacioTexto: { color: '#888', fontSize: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSubtitulo: { fontSize: 14, color: '#666', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0066cc',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabTexto: { color: '#fff', fontSize: 32, lineHeight: 34, fontWeight: 'bold' },
});