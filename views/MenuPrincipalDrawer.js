import React, {useContext, useEffect, Fragment} from 'react';
import {StyleSheet, ScrollView, View, FlatList, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';
import globalStyles from '../styles/global';

import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const {height, width} = Dimensions.get('window');

const MenuPrincipalDrawer = () => {
  // Context de Firebase
  const {menu, obtenerProductos} = useContext(FirebaseContext);
  const {trabajadores, obtenerTrabajadores} = useContext(FirebaseContext);

  // Context de pedido
  const {seleccionarProducto, seleccionarTrabajador} = useContext(
    PedidoContext,
  );

  // Hook para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
    obtenerTrabajadores();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator>
            <Text style={styles.separadorTexto}> {categoria} </Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator>
          <Text style={styles.separadorTexto}> {categoria} </Text>
        </Separator>
      );
    }
  };

  const mostrarHeading2 = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = trabajadores[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <Separator>
            <Text style={styles.separadorTexto}> {categoria} </Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator>
          <Text style={styles.separadorTexto}> {categoria} </Text>
        </Separator>
      );
    }
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 10}}>
      <View style={styles.contenedor2}>
        <Text
          style={{
            textAlign: 'center',
            color: '#303B5E',
            fontSize: 25,
            textDecorationLine: 'underline',
            fontWeight: 'bold',
          }}>
          Productos
        </Text>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled>
          {menu.map((produc, i) => {
            const {imagen, nombre, descripcion, categoria, precio, id} = produc;
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  margin: 10,
                  flex: 1,
                }}
                key={id}>
                {mostrarHeading(categoria, i)}
                <ListItem
                  onPress={() => {
                    // Eliminar algunas propiedades del producto
                    const {existencia, ...produc2} = produc;

                    seleccionarProducto(produc2);
                    navigation.navigate('DetallePlatillo');
                  }}>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Text>{nombre} </Text>
                      <Thumbnail
                        style={{
                          height: 120,
                          margin: 5,
                        }}
                        large
                        square
                        source={{uri: imagen}}
                      />
                    </View>
                    <View>
                      <Body>
                        <Text>Precio: S/ {precio} </Text>
                      </Body>
                    </View>
                  </View>
                </ListItem>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.contenedor}>
        <Text
          style={{
            textAlign: 'center',
            color: '#303B5E',
            fontSize: 25,
            textDecorationLine: 'underline',
            fontWeight: 'bold',
          }}>
          Personal
        </Text>
        <ScrollView
          Vertical={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled>
          <View>
            <List>
              {trabajadores.map((trab, i) => {
                const {
                  imagen,
                  nombre,
                  apellido,
                  especialidad,
                  categoria,
                  fechaculminacionSeguroSCTR,
                  fechaculminacionSeguroMedico,
                  id,
                } = trab;
                return (
                  <View
                    style={{
                      backgroundColor: 'white',
                      marginBottom: 5,
                    }}
                    key={id}>
                    {mostrarHeading2(categoria, i)}
                    <ListItem
                      onPress={() => {
                        // Eliminar algunas propiedades del producto
                        const {existencia, ...produc3} = trab;
                      }}>
                      <Thumbnail large square source={{uri: imagen}} />
                      <Body>
                        <Text style={{textAlign: 'center'}}>
                          {nombre} {apellido}{' '}
                        </Text>
                        <Text
                          style={{textAlign: 'center'}}
                          note
                          numberOfLines={2}>
                          {especialidad}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}>
                          F.V. Seguro SCTR:{' '}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                          }}>
                          {fechaculminacionSeguroSCTR}{' '}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                          }}>
                          F.V Seguro Médico{' '}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                          }}>
                          {fechaculminacionSeguroMedico}{' '}
                        </Text>
                      </Body>
                    </ListItem>
                  </View>
                );
              })}
            </List>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
  },
  contenedor2: {
    flex: 3 / 4,
    paddingVertical: 5,
    marginTop: 5,
  },
  separador: {
    backgroundColor: '#FFFFFF',
  },
  separadorTexto: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default MenuPrincipalDrawer;
