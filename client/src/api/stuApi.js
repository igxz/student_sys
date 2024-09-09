import request from './request';

const getSudentApi = () => {
  return request({
    url: '/students',
    method: 'GET',
  });
};

export { getSudentApi };
