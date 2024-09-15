import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addSudentApi } from '../api/stuApi';
import { editStuByIdAsync } from '../redux/stuSlice';

const AddEditStu = () => {
  const navigate = useNavigate();

  // determine whether edit or edit by checking if the id parameter is present
  const { id } = useParams();

  const { stuList } = useSelector((state) => state.stu);
  const dispatch = useDispatch();

  // create the state object
  const [stu, setStu] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    education: '',
    profession: '',
    profile: '',
  });

  // get student details
  useEffect(() => {
    const stu = stuList.filter((s) => s.id === id);
    setStu(stu[0]);
  }, [id, stuList]);

  function updateStuInfo(newInfo, key) {
    // 根据对应的 key 来更新信息
    if (key === 'age' && isNaN(newInfo)) {
      return;
    }

    const newStuInfo = { ...stu };
    newStuInfo[key] = newInfo.trim();
    setStu(newStuInfo);
  }

  const submitStuInfo = useCallback(
    async (e) => {
      e.preventDefault();

      for (const key in stu) {
        if (!stu[key]) {
          alert('insufficient data');
          return;
        }
      }

      if (id) {
        // Edit
        dispatch(editStuByIdAsync({id, stu}));
        navigate('/home', {
          state: {
            alert: `Student '${stu.name}' updated successfully!`,
            type: 'info',
          },
        });
      } else {
        // Add
        await addSudentApi(stu);
        navigate('/home', {
          state: {
            alert: `Student '${stu.name}' added successfully!`,
            type: 'success',
          },
        });
      }
    },
    [navigate, id, stu]
  );

  const handleCancel = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div className='container'>
      {/* 标题 */}
      <h1 className='page-header'>{id ? 'Edit Student' : 'Add Student'}</h1>
      <form id='myForm' onSubmit={submitStuInfo}>
        <div className='well'>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='please enter a name'
              value={stu.name}
              onChange={(e) => updateStuInfo(e.target.value, 'name')}
            />
          </div>
          <div className='form-group'>
            <label>Age</label>
            <input
              type='text'
              className='form-control'
              placeholder='please enter age'
              value={stu.age}
              onChange={(e) => updateStuInfo(e.target.value, 'age')}
            />
          </div>
          <div className='form-group'>
            <label>Phone</label>
            <input
              type='text'
              className='form-control'
              placeholder='please enter a phone number'
              value={stu.phone}
              onChange={(e) => updateStuInfo(e.target.value, 'phone')}
            />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='text'
              className='form-control'
              placeholder='please enter your email address'
              value={stu.email}
              onChange={(e) => updateStuInfo(e.target.value, 'email')}
            />
          </div>
          <div className='form-group'>
            <label>Education</label>
            <select
              className='form-control'
              value={stu.education}
              onChange={(e) => updateStuInfo(e.target.value, 'education')}
            >
              <option>High School</option>
              <option>Bachelor</option>
              <option>Master</option>
              <option>PhD</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Profession</label>
            <input
              type='text'
              className='form-control'
              placeholder='please enter your profession'
              value={stu.profession}
              onChange={(e) => updateStuInfo(e.target.value, 'profession')}
            />
          </div>
          <div className='form-group'>
            <label>Self Description</label>
            <textarea
              className='form-control'
              rows='10'
              placeholder='please enter description about yourself'
              value={stu.profile}
              onChange={(e) => updateStuInfo(e.target.value, 'profile')}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            {id ? 'Confirm update' : 'Confirm add'}
          </button>
          <button
            type='button'
            style={{ marginLeft: '1 em' }}
            className='btn btn-danger'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditStu;
