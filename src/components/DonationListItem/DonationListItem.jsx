import './DonationListItem.css';

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className="MenuListItem">
      <div className="name">{menuItem.name}</div>
      <div className="buy">
        <span>£{menuItem.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}