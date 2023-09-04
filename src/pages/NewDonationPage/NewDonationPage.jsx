import { useState, useEffect, useRef } from 'react';
import * as DonationItemsAPI from '../../utilities/donation-items-api';
import * as donationsAPI from '../../utilities/donations-api';
import './NewDonationPage.css';
import { Link, useNavigate } from 'react-router-dom';
import MenuList from '../../components/DonationList/DonationList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/DonationDetail/DonationDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(function() {
    async function getItems() {
      const items = await DonationItemsAPI.getAll();
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
    async function getCart() {
      const cart = await donationsAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  async function handleAddToOrder(itemId) {
    const updatedCart = await donationsAPI.addItemToCart(itemId);
    setCart(updatedCart);
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await donationsAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await donationsAPI.checkout();
    navigate('/orders');
  }


  return (
    <main className="NewOrderPage">
      <header>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          />
        </header>
      <MenuList
        menuItems={menuItems.filter(item => item.category.name === activeCat)}
        handleAddToOrder={handleAddToOrder}
      />
      <OrderDetail
        order={cart}
        handleChangeQty={handleChangeQty}
        handleCheckout={handleCheckout}
      />
    </main>
  );
}