import React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { getSudentApi } from '../api/stuApi';
import Alert from './Alert';
import { useLocation, NavLink } from 'react-router-dom';

const Home = () => {
  const [stuList, setStuList] = useState([]);
  const [fullStuList, setFullStuList] = useState([]); // Full original student list

  const [searchItem, setSearchItem] = useState([]);
  const [alert, setAlert] = useState(null);

  const location = useLocation();

  useEffect(() => {
    getSudentApi().then(({ data }) => {
      // console.log(res);
      setStuList(data);
      setFullStuList(data); // Store original data separately
    });
  }, []);

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

      // If the search item is empty, reset to the full list
      if (!searchItem.trim()) {
        setStuList(fullStuList);
      } else {
        // Filter the original list based on the search input
        const filteredStudents = fullStuList.filter((s) =>
          s.name.toLowerCase().includes(searchItem.toLowerCase())
        );
        setStuList(filteredStudents);
      }
    },
    [fullStuList]
  );

  const trData = useMemo(() => {
    return stuList.map((s, index) => (
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
  }, [stuList]);

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
