import { combineReducers } from 'redux';
import signup, { signupSaga } from './signup';
import signin, { signinSaga } from './signin';
import { all, fork, take, takeEvery } from 'redux-saga/effects';

const rootReducer = combineReducers({
  signin,
  signup,
});

export function* rootSaga() {
  yield all([signinSaga(), signupSaga()]); // all은 배열 안의 여러 사가를 동시에 실행시켜준다.
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;



function* testSaga(){
  yield all([signinSaga(), signupSaga(), authCheckSaga()]);
}

const actions = [
  'TEST1',
  'TEST2',
  'TEST3',
  'TEST4',
  'TEST5',
  'TEST6',
  'TEST7',
  'TEST8',
  'TEST9'
];

return function* authChekSaga(){
            
  while(true){
      const action = yield take(actions);
      console.log('saga action: ', action);

      const isTokenValid = yield call(checkToken);
      if(isTokenValid && ){
          for(let i = 0; i < sagas.length; i++){
              //사가에서 api요청 보낼 때 헤더에 access token 추가
              yield fork(sagas[i], action);  
          }
      }
  }
};

function* resourceApi1Saga(action: any){
  switch(action.type){
    case 'TEST1':
      return yield fork( function* test1(){ });
    case 'TEST2':
      return yield fork( function* test2(){ });
    case 'TEST3':
      return yield fork( function* test3(){ });  
  }
}

function* resourceApi2Saga(){
  yield takeEvery('TEST4', function* test1(){ });
  yield takeEvery('TEST5', function* test2(){ });
  yield takeEvery('TEST6', function* test3(){ });
}

//function* resourceApi3Saga(){
//  yield takeEvery('TEST7', function* test1(){ });
//  yield takeEvery('TEST8', function* test2(){ });
//  yield takeEvery('TEST9', function* test3(){ });
//}