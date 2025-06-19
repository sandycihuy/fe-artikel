import api from '@/lib/axios'
import { mockLoginResponse } from '@/mock/login'
// import config from '@/config';
// import { isMockEnabled } from '@/lib/isMockEnabled';
export async function loginUser(data: { username: string; password: string }) {
     const useMock = typeof window !== 'undefined' && localStorage.getItem('useMock') === 'true'
      console.log('usemock',useMock,'|username:',data.username)
    if (useMock) {
         console.log('LOGIN MOCK ACTIVE')
        if(data.username === 'dummyuser' && data.password === 'dummy123'){
            return await mockLoginResponse();
        }else{
            throw new Error('Username atau password salah')
        }
    }
      console.log('LOGIN MOCK ACTIVE testing');
    const resp = await fetch('/auth/login',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-type':'application/json'},
    });
    if(!resp.ok){ throw new Error('login gagal nih')}
    return await resp.json()
}