import { Link, Outlet, useNavigate } from 'react-router-dom';
import { auth, signOut } from '../config';

export default function Items() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Items</h1>
      {/* list of items */}
      <ul>
        {['fruits', 'books', 'cars', 'furnitures'].map((item) => (
          <li>
            <Link to={`/items/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();

          signOut(auth)
            .then(() => {
              navigate('/');
              // redirect('/');
            })
            .catch((err) => {
              console.log(err.message);
            });
        }}
      >
        Log Out
      </button>
      {/* will be replaced with <NewItem /> or <Item /> depending on the route we go to */}
      <Outlet />
    </div>
  );
}
