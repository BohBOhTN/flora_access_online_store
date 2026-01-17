import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ORDER_STATUSES, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../constants';

const OrderContext = createContext();

export function useOrder() {
  return useContext(OrderContext);
}

// Generate unique order number: FL-YYYYMMDD-XXXXX
const generateOrderNumber = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `FL-${dateStr}-${random}`;
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    // Load orders from localStorage on initial render
    const savedOrders = localStorage.getItem('flora-orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flora-orders', JSON.stringify(orders));
  }, [orders]);

  // Create a new order
  const createOrder = useCallback((orderData) => {
    const { cartItems, customerInfo, shippingAddress } = orderData;
    
    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + shipping;

    const newOrder = {
      id: generateOrderNumber(),
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        image: item.image,
      })),
      customerInfo: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
      },
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.postalCode,
        notes: shippingAddress.notes || '',
      },
      paymentMethod: 'cash_on_delivery',
      subtotal,
      shipping,
      total,
      status: ORDER_STATUSES.PENDING.value,
      statusHistory: [
        {
          status: ORDER_STATUSES.PENDING.value,
          timestamp: new Date().toISOString(),
          note: 'Commande créée',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    
    return newOrder;
  }, []);

  // Get order by ID
  const getOrderById = useCallback((orderId) => {
    return orders.find((order) => order.id === orderId);
  }, [orders]);

  // Track order by order number and customer name
  const trackOrder = useCallback((orderNumber, firstName, lastName) => {
    const order = orders.find(
      (o) =>
        o.id.toLowerCase() === orderNumber.toLowerCase() &&
        o.customerInfo.firstName.toLowerCase() === firstName.toLowerCase() &&
        o.customerInfo.lastName.toLowerCase() === lastName.toLowerCase()
    );
    return order || null;
  }, [orders]);

  // Update order status (for admin use - can be extended)
  const updateOrderStatus = useCallback((orderId, newStatus, note = '') => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const statusEntry = {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note,
          };
          return {
            ...order,
            status: newStatus,
            statusHistory: [...order.statusHistory, statusEntry],
            updatedAt: new Date().toISOString(),
          };
        }
        return order;
      })
    );
  }, []);

  // Get all orders (for admin)
  const getAllOrders = useCallback(() => {
    return orders;
  }, [orders]);

  // Get order status details
  const getStatusDetails = useCallback((statusValue) => {
    return Object.values(ORDER_STATUSES).find((s) => s.value === statusValue);
  }, []);

  // Cancel order (only if pending)
  const cancelOrder = useCallback((orderId) => {
    const order = getOrderById(orderId);
    if (order && order.status === ORDER_STATUSES.PENDING.value) {
      updateOrderStatus(orderId, ORDER_STATUSES.CANCELLED.value, 'Annulée par le client');
      return true;
    }
    return false;
  }, [getOrderById, updateOrderStatus]);

  const value = {
    orders,
    createOrder,
    getOrderById,
    trackOrder,
    updateOrderStatus,
    getAllOrders,
    getStatusDetails,
    cancelOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}
