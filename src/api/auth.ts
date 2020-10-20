import { signinSuccess } from './fakeData';
import { signinInfo } from '@base/types/auth';

export const signin = async (signinInfo: signinInfo) => {
    //axios로 로그인 api 요청
    console.log('signin:', signinInfo);
    return signinSuccess;
}