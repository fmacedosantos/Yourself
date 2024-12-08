import { ScrollView, View, Text, RefreshControl } from "react-native";
import { styles } from "./styles";
import { useCallback, useEffect, useState } from "react";
import { SummaryStats } from "@/src/components/summaryStats";
import LoadingScreen from "@/src/components/loadindScreen";
import { 
  buyItem, 
  carregarResumoEstatisticas, 
  getAllItems, 
  getItems
} from "@/src/services/api/user";
import { Title } from "@/src/components/title";
import { Item } from "@/src/components/item";
import { MessageAlert } from "@/src/components/messageAlert";
import { useFocusEffect } from "expo-router";
import { LoadFont } from "@/src/utils/loadFont";

interface ResumoEstatisticas {
  ofensiva: number;
  pontos: number;
}

interface ItemLoja {
  id: string;
  icone: string;
  nome: string;
  preco: number;
}

export default function Shop() {
  const [resumoEstatisticas, setResumoEstatisticas] = useState<ResumoEstatisticas>({
    ofensiva: 0,
    pontos: 0,
  });

  const [itens, setItens] = useState<ItemLoja[]>([]); 
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<1 | 2>(2);
  const [itemIdToBuy, setItemIdToBuy] = useState<string | null>(null);
  const [itemPriceToBuy, setitemPriceToBuy] = useState<number | null>(null);

    const carregarDados = useCallback(async (isRefresh: boolean = false) => {
      try {
        if (isRefresh) setRefreshing(true);
        setLoading(true);
        const {success, message} = await carregarResumoEstatisticas(setResumoEstatisticas);
        if (!success) {
          setMessage(message);
          setVisible(true);
          return;
        }
        const allItemsResponse = await getAllItems((allItems) => {
          getItems((userItems) => {
            const userItemIds = userItems.map(item => item.id);
            const availableItems = allItems.filter(
              (item) => !userItemIds.includes(item.id)
            );
            setItens(availableItems);
          });
        });
      } catch {
          setMessage('Erro ao carregar informações.');
          setVisible(true);
      } finally {
          setLoading(false);
          if (isRefresh) setRefreshing(false);
      }
    
  }, []);

  useEffect(() => {
    carregarDados(); 
  }, []); 

  const fontsLoaded = LoadFont();

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  async function handleTouchItem(name: string, id:string, price: number) {
    setType(2);
    setItemIdToBuy(id);
    setitemPriceToBuy(price);
    setVisible(true);
    setMessage(`Deseja comprar \"${name}\" por ${price} pontos?`); 
  }

  async function handleBuyItem() {
    if (itemIdToBuy && itemPriceToBuy) {
      setLoading(true);
      const response = await buyItem(itemIdToBuy, itemPriceToBuy);
      if (response.success) {
        await carregarResumoEstatisticas(setResumoEstatisticas);
        
        const allItemsResponse = await getAllItems((allItems) => {
          getItems((userItems) => {
            const userItemIds = userItems.map(item => item.id);
            const availableItems = allItems.filter(
              (item) => !userItemIds.includes(item.id)
            );
            setItens(availableItems);
            setLoading(false);
          });
        });
  
        setVisible(false);
      } else {
        setLoading(false);
        setType(1);
        setMessage(response.message || "Erro ao comprar o item.");
      }
      setItemIdToBuy(null); 
      setitemPriceToBuy(null); 
    }
  }

  const handleRefresh = () => {
    carregarDados(true); 
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}
      style={styles.scrool}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
        <SummaryStats
          ofensiva={resumoEstatisticas.ofensiva}
          pontos={resumoEstatisticas.pontos}
        />
        <Title
          title="Loja de itens"
        />
        

      <View style={styles.items}>
      {itens.length === 0 ? (
          <Text style={styles.noItemsText}>Nenhum item disponível...</Text>
        ) : (
          itens.map((item) => (
            <Item
              key={item.id}
              icon={item.icone}
              name={item.nome}
              price={item.preco}
              action={() => handleTouchItem(item.nome, item.id, item.preco)}
            />
          ))
        )}
      </View>
        
      </ScrollView>
      <MessageAlert
        type={type}
        message={message}
        visible={visible}
        onConfirm={() => handleBuyItem()}
        onCancel={() => setVisible(false)}
        confirmText="Comprar"
      />
    </View>
  );
}