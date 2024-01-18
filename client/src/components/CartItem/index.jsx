import { stateActions } from "../../utils/stateSlice";

const CartItem = ({ item }) => {

  const removeFromCart = item => {
    // new redux
    dispatch(stateActions.removeFromCart(item._id));

    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      // new redux
      dispatch(stateActions.removeFromCart(item._id));
      idbPromise('cart', 'delete', { ...item });

    } else {
      // new Redux
      dispatch(stateActions.updateCartQuantity({ _id: item._id, purchaseQuantity: parseInt(value) }));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
