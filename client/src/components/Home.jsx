import React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { getSudentApi } from '../api/stuApi';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [stuList, setStuList] = useState([]);
  const [searchItem, setSearchItem] = useState([]);

  useEffect(() => {
    getSudentApi().then(({ data }) => {
      // console.log(res);
      setStuList(data);
    });
  }, []);

  const handleSearch = useCallback((searchItem) => {
    console.log(searchItem);
    setSearchItem(searchItem);
  }, []);

  const trData = useMemo(() => {
    return stuList.map((s, index) => (
      <tr key={index}>
        <td>
          <NavLink to={`/edit/${s.id}`} className='navigation'>
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
    <>
      <div>Home Page</div>
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
    </>
  );
};

export default Home;
