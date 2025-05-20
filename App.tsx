import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, TextInput, View, Button, Text } from 'react-native';

export default function App() {
  const [CEP, setCEP] = useState('');
  const [resultado, setResultado] = useState('');

  const getCEP = (cep: string) => {
    const endpoint = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        if (json.erro) {
          throw new Error('CEP inválido');
        }
        setResultado(`CEP: ${json.cep}\nRua: ${json.logradouro}\nCidade: ${json.localidade}`);
      })
      .catch(() => {
        Alert.alert('CEP não encontrado!');
        setResultado('');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite o CEP"
        value={CEP}
        onChangeText={setCEP}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Buscar CEP" onPress={() => getCEP(CEP)} />
      {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultado: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
});
