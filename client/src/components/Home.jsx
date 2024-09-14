import React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Alert from './Alert';
import { fetchStuListAsync } from '../redux/stuSlice';
import { useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const { stuList } = useSelector((state) => state.stu);
  const [searchItem, setSearchItem] = useState('');
  const [alert, setAlert] = useState(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // get the state from redux store
    if (!stuList.length) {
      // if no data from the store, get the data from backend by dispatching a action to the store
      dispatch(fetchStuListAsync());
    }
  }, [stuList, dispatch]);

  useEffect(() => {
    if (location.state) {
      setAlert(location.state);
    }
  }, [location]);

  const showAlert = alert ? <Alert {...alert} /> : null;

  // Search and filter logic
  const handleSearch = useCallback(
    (searchItem) => {
      setSearchItem(searchItem);
    },
    []
  );

  const trData = useMemo(() => {
    const data = (!searchItem.trim())
      ? stuList
      : stuList.filter((s) =>
          s.name.toLowerCase().includes(searchItem.toLowerCase())
        );
    return data.map((s, index) => (
      <tr key={index}>
        <td>
          <NavLink to={`/detail/${s.id}`} className='navigation'>
            {s.id}
          </NavLink>
        </td>
        <td>{s.name}</td>
        <td>{s.age}</td>
        <td>{s.phone}</td>
        <td>{s.email}</td>
      </tr>
    ));
  }, [stuList, searchItem]);

  return (
    <div>
      {showAlert}
      <h1>Student List</h1>
      {/* search by keywords */}
      <input
        type='text'
        className='form-control'
        placeholder='search term'
        value={searchItem}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{trData}</tbody>
      </table>
      {/* <div>{JSON.stringify(stuList)}</div> */}
    </div>
  );
};

export default Home;
