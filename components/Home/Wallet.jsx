import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, StatusBar, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import BottomNavbar from '../shared/BottomNavbar';

const Wallet = ({ navigation }) => {
  const [walletBalance, setWalletBalance] = useState(500);
  const [totalExpend, setTotalExpend] = useState(200);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [paymentMethods] = useState([
    { id: 1, type: 'Visa', number: '**** **** **** 1234', icon: 'credit-card' },
    { id: 2, type: 'Mastercard', number: '**** **** **** 5678', icon: 'credit-card' },
    { id: 3, type: 'PayPal', number: 'user@email.com', icon: 'paypal' },
    { id: 4, type: 'Cash', number: 'Cash Payment', icon: 'cash' }
  ]);

  const [transactions] = useState([
    { id: 1, name: 'Ride to Downtown', time: '2 hours ago', amount: -50, type: 'expense' },
    { id: 2, name: 'Wallet Top-up', time: '1 day ago', amount: +200, type: 'income' },
    { id: 3, name: 'Ride to Airport', time: '2 days ago', amount: -120, type: 'expense' },
    { id: 4, name: 'Refund', time: '3 days ago', amount: +75, type: 'income' }
  ]);

  const handleAddMoney = () => {
    if (addAmount && parseFloat(addAmount) > 0) {
      const amount = parseFloat(addAmount);
      setWalletBalance(prev => prev + amount);
      setShowAddMoneyModal(false);
      setShowSuccessModal(true);
      setAddAmount('');
    } else {
      Alert.alert('Error', 'Please enter a valid amount');
    }
  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Wallet</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        bounces={true}
        alwaysBounceVertical={true}
        decelerationRate="normal"
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Balance Overview */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>₹{walletBalance}</Text>
          </View>
          <View style={styles.expendCard}>
            <Text style={styles.expendLabel}>Total Expend</Text>
            <Text style={styles.expendAmount}>₹{totalExpend}</Text>
          </View>
        </View>

        {/* Add Money Button */}
        <TouchableOpacity style={styles.addMoneyButton} onPress={() => setShowAddMoneyModal(true)}>
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addMoneyText}>Add Money</Text>
        </TouchableOpacity>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethodCard}>
              <MaterialIcons name={method.icon} size={24} color="#DB2899" />
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodType}>{method.type}</Text>
                <Text style={styles.paymentMethodNumber}>{method.number}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addPaymentButton} onPress={() => setShowPaymentMethodModal(true)}>
            <Ionicons name="add" size={20} color="#DB2899" />
            <Text style={styles.addPaymentText}>Add payment method</Text>
          </TouchableOpacity>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={[styles.transactionIcon, transaction.type === 'income' ? styles.incomeIcon : styles.expenseIcon]}>
                <Ionicons 
                  name={transaction.type === 'income' ? 'arrow-down' : 'arrow-up'} 
                  size={16} 
                  color={transaction.type === 'income' ? '#4CAF50' : '#F44336'} 
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
              <Text style={[styles.transactionAmount, transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount]}>
                {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Add Money Modal */}
      <Modal visible={showAddMoneyModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Money</Text>
            
            <Text style={styles.inputLabel}>Select Payment Method</Text>
            <View style={styles.paymentMethodSelector}>
              {['card', 'paypal', 'cash'].map((method) => (
                <TouchableOpacity 
                  key={method}
                  style={[styles.methodOption, selectedPaymentMethod === method && styles.selectedMethod]}
                  onPress={() => setSelectedPaymentMethod(method)}
                >
                  <Text style={[styles.methodText, selectedPaymentMethod === method && styles.selectedMethodText]}>
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Amount</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Enter amount"
              value={addAmount}
              onChangeText={setAddAmount}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddMoneyModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleAddMoney}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContent}>
            <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            <Text style={styles.successTitle}>Add Success</Text>
            <Text style={styles.successMessage}>Your money has been added successfully.</Text>
            <Text style={styles.successAmount}>Amount: ₹{addAmount}</Text>
            <TouchableOpacity style={styles.successButton} onPress={() => setShowSuccessModal(false)}>
              <Text style={styles.successButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Payment Method Modal */}
      <Modal visible={showPaymentMethodModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Payment Method</Text>
            
            <Text style={styles.inputLabel}>Method Type</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Visa, Mastercard"
            />

            <Text style={styles.inputLabel}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account details"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPaymentMethodModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={() => setShowPaymentMethodModal(false)}>
                <Text style={styles.confirmButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNavbar activeTab="Wallet" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 44,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 90,
  },
  balanceSection: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    marginBottom: 25,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DB2899',
  },
  expendCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expendLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  expendAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
  },
  addMoneyButton: {
    backgroundColor: '#DB2899',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#DB2899',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addMoneyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentMethodCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  paymentMethodInfo: {
    marginLeft: 15,
    flex: 1,
  },
  paymentMethodType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addPaymentButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DB2899',
    borderStyle: 'dashed',
  },
  addPaymentText: {
    color: '#DB2899',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  incomeIcon: {
    backgroundColor: '#E8F5E8',
  },
  expenseIcon: {
    backgroundColor: '#FFEBEE',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  transactionTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#4CAF50',
  },
  expenseAmount: {
    color: '#F44336',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  paymentMethodSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  methodOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedMethod: {
    backgroundColor: '#DB2899',
    borderColor: '#DB2899',
  },
  methodText: {
    fontSize: 14,
    color: '#666',
  },
  selectedMethodText: {
    color: '#fff',
  },
  amountInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#DB2899',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  successModalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '80%',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  successAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DB2899',
    marginBottom: 20,
  },
  successButton: {
    backgroundColor: '#DB2899',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  successButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default Wallet;