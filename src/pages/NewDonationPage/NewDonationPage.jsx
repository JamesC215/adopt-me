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

  // The empty dependency array causes the effect
  // to run ONLY after the FIRST render
  useEffect(function() {
    async function getItems() {
      const items = await DonationItemsAPI.getAll();
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();

    // Load cart (a cart is the unpaid order for the logged in user)
    async function getCart() {
      const cart = await donationsAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  /*--- Event Handlers ---*/
  async function handleAddToOrder(itemId) {
    // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
    const updatedCart = await donationsAPI.addItemToCart(itemId);
    // 2. Update the cart state with the updated cart received from the server
    setCart(updatedCart);
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await donationsAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await donationsAPI.checkout();
    navigate('/');
  }


  return (
    <main className="NewOrderPage">
      <aside>
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
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