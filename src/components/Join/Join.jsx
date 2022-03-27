import React from 'react';
import "./index.css";
import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Join() {
    const nicknames = useSelector(state => state.config.service.nicknames)
    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [nickname, setNickname] = useState(undefined)
    const [isNicknameExist, setIsNicknameExist] = useState(false)
    const history = useHistory();

    const createUser = useCallback(
        () => {
            if(email && nickname && !isNicknameExist && password && password.length >= 8){
                let url = "/user/new";
                fetch(url, {
                    method: 'POST',
                    headers:{
                        'Content-type': 'application/json',
                        'Allow-Control-Access-Origin':'*',
                    },
                    body: JSON.stringify({
                        email, nickname, password
                    })
                })
                .then(res => res.json())
                .then(({msg}) => {
                    console.log(msg);
                    history.push('/')
                })
                .catch((err) => {console.log(err)})
            } else {
                alert("입력 조건에 부합하지 않습니다.")
            }
        }, [email, password, nickname, isNicknameExist, history] //이 변수에 변화가 있을 때만 콜백 함수 호출
    )

    useEffect( () => {
        if(nicknames.indexOf(nickname) !== -1) {
            console.log('닉네임이 존재합니다.')
            setIsNicknameExist(true)
        } else {
            console.log('닉네임이 존재하지 않습니다.')
            setIsNicknameExist(false)
        }
        return () => {};
    }, [nicknames, nickname])

    return (
        <div className='join'>
            <div className="wrapper">
                <h1 className='logo'>instagram</h1>
                <form className='join-contents' onSubmit = { (e) => {
                    e.preventDefault(); /* onSubmit 될때 새로고침 막아줌 */
                    createUser();
                }}>
                    <div className="email-input custom-input">
                        <div className="top">
                            <div className='title txt-bold'>이메일</div>
                            <div className='warning'></div>
                        </div>
                        <div className="input">
                            <input type="email" placeholder='이메일을 입력하세요' onBlur={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div> {/* 이메일 입력 */}
                    <div className="password-input custom-input">
                        <div className="top">
                            <div className='title txt-bold'>비밀번호</div>
                            <div className="warning">{password && password.length<8 && "비밀번호는 8자리 이상 지정하셔야 합니다."}</div>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='비밀번호를 8자리 이상으로 지정하세요' onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div> {/* 패스워드 입력 */}
                    <div className="nickname-input custom-input">
                        <div className="top">
                            <div className='title txt-bold'>닉네임</div>
                            <div className="warning">{isNicknameExist && "이미 사용 중인 닉네임 입니다"}</div>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='닉네임을 입력하세요' onChange={(e) => setNickname(e.target.value)} required />
                        </div>
                    </div> {/* 닉네임 입력 */}
                    <button type='submit' className='join-btn'>회원가입</button>
                </form> {/* 상단폼 */}
            </div> {/* wrapper */}
        </div>
    )
}

export default Join;
