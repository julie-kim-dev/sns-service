import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/core.css';
import Login from './Login/Login';
import Join from './Join/Join';
import Header from './Header/Header';
import MainFeed from './MainFeed/MainFeed';
import Profile from './Profile/Profile';
import { useSelector, useDispatch } from 'react-redux';
import firebaseApp from "@config/firebaseApp";
import {_NICKNAME_SERVICE_UPDATE_} from '@dispatchers/config';
import { _UPDATE_SESSION_ } from '@dispatchers/auth';
import { _UPDATE_HEADER_STATE_ } from '@dispatchers/layouts';

const Fdatabase = firebaseApp.database() //데이터 베이스 사용
const Fauth = firebaseApp.auth();

function App() {
  const isHeaderOpen = useSelector(state => state.layouts.isHeaderOpen);
  const dispatch = useDispatch();
  const getNickNames = useCallback(() => {
    var nicknameRef = Fdatabase.ref('statics/nicknames');
    nicknameRef.on('value', (snapshot) => {
      if(snapshot.exists()) {
        // console.log(Object.values(snapshot.val()))
        dispatch({
          type : _NICKNAME_SERVICE_UPDATE_,
          payload : Object.values(snapshot.val()) // 데이터 값을 페이로드로 넘겨준다
        })
      } else {
        dispatch({
          type : _NICKNAME_SERVICE_UPDATE_,
          payload : [] // 데이터가 없을 때는 빈 배열을 업데이트
        })
      } //if else
    });
    return nicknameRef;
  }, [dispatch]); //useCallback

  useEffect(() => {
    getNickNames();
    return () => {}
  }, [getNickNames])

  useEffect(() => {
    Fauth.onAuthStateChanged(users => {
      if(users){
        const {uid, displayName,email} = users;
        dispatch({
          type:_UPDATE_HEADER_STATE_,
          payload: true,
        })
        dispatch({
          type: _UPDATE_SESSION_,
          payload:{
            uid,
            displayName,
            email
          }
        })
      } else {
        dispatch({
          type: _UPDATE_SESSION_,
          payload: undefined
        })
      }
    }) //onAuthStateChanged
  }, [dispatch])

  return (
    <Router>
      { isHeaderOpen && <Header />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/join" exact component={Join} />
        <Route path="/feed" exact component={MainFeed} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
