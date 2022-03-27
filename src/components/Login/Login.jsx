import React, { useEffect, useState, useCallback } from 'react';
import "./index.css";
import { useHistory } from 'react-router-dom';
import firebaseApp from '@config/firebaseApp';
import { useDispatch } from 'react-redux';

const Fauth = firebaseApp.auth();

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const history = useHistory();

    const doLogin = (e) => {
        e.preventDefault();
        Fauth.signInWithEmailAndPassword(email, password)
        .then(credential => {
            history.push('/feed')
        })
        .catch(err => {
            console.log(err)
        });
    }
    const goJoin = useCallback(
        () => {
            history.push('/join')
        },
        [history, email, dispatch, password],
    )
    
    //헤더 부분

    return (
        <div className='login'>
            <div className="wrapper">
                <h1 className='logo'>instagram</h1>
                <form className='login-contents' onSubmit={doLogin}>
                    <div className="email-input common-input">
                        <div className='title txt-bold'>이메일</div>
                        <div className="input">
                            <input type="email" placeholder='이메일을 입력하세요' onBlur={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div> {/* 이메일 입력 */}
                    <div className="password-input common-input">
                        <div className='title txt-bold'>비밀번호</div>
                        <div className="input">
                            <input type="password" placeholder='비밀번호를 입력하세요' onBlur={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div> {/* 패스워드 입력 */}
                    <button className='login-btn'>로그인</button>
                </form> {/* 상단폼 */}
                <div className="go-join">
                    <div className="title txt-bold">회원가입</div>
                    <div className="asset">
                        <img src="/assets/welcome/arrow.svg" alt="회원가입하기" onClick={goJoin} />
                    </div>
                </div> {/* 하단 조인 */}
            </div> {/* wrapper */}
        </div>
    )
}

export default Login;
