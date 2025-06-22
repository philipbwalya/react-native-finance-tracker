import { useCallback, useState } from "react";
import { Alert } from "react-native";

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  type: string;
}


const API_URL = "http://localhost:3000/api/"
export const useTransactions = (userId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const[summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading,setIsLoading] = useState(false);
  // fetch transactions
  const fetchTransactions = useCallback(async () => {
    try {
    const response = await fetch(`${API_URL}/transactions/${userId}`);
    const data = await response.json();
    setTransactions(data);
    } catch (error) {
      console.log("Error fetching transactions",error);
    }
  },[userId]);

  // fetch summary
    const fetchSummary = useCallback(async () => {
    try {
    const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
    const data = await response.json();
    setSummary(data);
    } catch (error) {
      console.log("Error fetching summary",error);
    }  
  },[userId]);
  
  // load data
  const loadData = useCallback(async () => {
    if(!userId) return;
    try {
      setIsLoading(true);
      await Promise.all([fetchTransactions(),fetchSummary()]);
    } catch (error) {
      console.log("Error loading data",error);
    }finally{
      setIsLoading(false);
    }
  },[userId,fetchTransactions,fetchSummary]);

// delete transaction
  const deleteTransaction = async (id: string) => {
    try {
    const response = await fetch(`${API_URL}/transactions/${id},{method: "DELETE"}`);
    if(!response.ok){
      throw new Error("Failed to delete transaction");
    }
    // refresh data after deleting
    await loadData();
    Alert.alert("Success","Transaction deleted successfully");
    } catch (error) {
      console.log("Error fetching summary",error);
      const errorMessage = (error as any)?.message
      Alert.alert("Error",errorMessage || "Something went wrong");
    }  
  };

  return { transactions, summary, isLoading, loadData, deleteTransaction };  
};