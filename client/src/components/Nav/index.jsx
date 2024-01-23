import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { stateActions } from '../../utils/stateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { idbPromise } from '../../utils/helpers';

function Nav() {
  const state = useSelector((state) => state.globalState);
  const dispatch = useDispatch();

  function logout() {
    dispatch(stateActions.clearCart(state));
    idbPromise('cart', 'clear');
    Auth.logout();
  }

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            <a href="/" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          -Shop-Shop
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
