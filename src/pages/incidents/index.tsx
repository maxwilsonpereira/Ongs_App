import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
// Navigation:
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
// already installed with Expo:
import { Feather } from '@expo/vector-icons';
// import just the logo and it will be shown the best of the 3 formats on the phone:
import styles from './styles';
import logoImg from '../../assets/logo.png';

interface Incident {
  id: number;
  title: string;
  description: string;
  value: number;
  ong_id: string;
  name: string;
  email: string;
  whatsapp: string;
  city: string;
  uf: string;
}

export default function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToDetail(incident: Incident) {
    // props: incident
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get('incidents', {
      params: { page },
    });
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.incidentList}
        keyExtractor={(incident) => String(incident.id)}
        data={incidents}
        // show / hide verticall scroll:
        showsVerticalScrollIndicator={false}
        // onEndReached will load the next occurrences ("next page")
        onEndReached={loadIncidents}
        // onEndReachedThreshold: vai de 0 à 1. 1 = 100%
        // ponto em que ele vai carregar a próxima lista,
        // aqui, quando estiver a 20% do final da lista corrente:
        onEndReachedThreshold={0.2}
        renderItem={({ item }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{item.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{item.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {/* npm install intl / imported at App.js*/}
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(item)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
