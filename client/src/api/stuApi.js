import request from './request';

const getSudentApi = () => {
  return request({
    url: '/students',
    method: 'GET',
  });
};

const getSudentByIdApi = (id) => {
  return request({
    url: `/students/${id}`,
    method: 'GET',
  });
};

const addSudentApi = (data) => {
  return request({
    url: '/students',
    method: 'POST',
    data,
  });
};

const deleteSudentByIdApi = (id) => {
  return request({
    url: `/students/${id}`,
    method: 'DELETE',
  });
};

const editSudentByIdApi = (id, data) => {
  return request({
    url: `/students/${id}`,
    method: 'PATCH',
    data,
  });
};

export {
  getSudentApi,
  getSudentByIdApi,
  addSudentApi,
  deleteSudentByIdApi,
  editSudentByIdApi,
};
