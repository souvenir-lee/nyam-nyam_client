import { signinSuccess } from './fakeData';
import { signinInfoType } from '@base/types/auth';

export const signin = async (signinInfo: signinInfoType) => {
    //axios로 로그인 api 요청
    console.log('signin:', signinInfo);
    return signinSuccess;
}