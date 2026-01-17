import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage/HomePage'
import ShopPage from './pages/ShopPage/ShopPage'
import ProductPage from './pages/ProductPage/ProductPage'
import CartPage from './pages/CartPage/CartPage'
import ContactPage from './pages/ContactPage/ContactPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import TrackOrderPage from './pages/TrackOrderPage/TrackOrderPage'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/boutique" element={<ShopPage />} />
              <Route path="/produit/:id" element={<ProductPage />} />
              <Route path="/panier" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/commande" element={<CheckoutPage />} />
              <Route path="/suivi-commande" element={<TrackOrderPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </OrderProvider>
    </CartProvider>
  )
}

export default App
