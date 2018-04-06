import { put, takeEvery, all, call } from 'redux-saga/effects';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.1/mkuyemekhane/',
  timeout: 4000,
});

const watchFetchMenu = function* watchFetchMenu() {
  yield takeEvery('FETCH_MENU', function* (action){
    yield put({type: 'FETCH_MENU_STARTED'});
    try{
      data = {timestamp: action.payload.timestamp}
      const payload = yield call(fetchMenuData, data);
      yield put({ type: 'FETCH_MENU_SUCCESS', payload});
    }catch(error){
      yield put({ type: 'FETCH_MENU_FAILED', payload:{code: 500}});
    }
  });
};

const rootSaga = function* rootSaga() {
  yield all([
    watchFetchMenu(),
  ]);
};

export default rootSaga;

const fetchMenuData = (data = {timestamp: ''}) => {
  return api.get('get_foods.php', {params: data}).then(response => {
    return response.data;
  }).catch( error => {
    return Promise.reject({error: true});
  });
};