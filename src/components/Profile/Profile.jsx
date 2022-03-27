import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './css/index.css';
import Feed from '../Feed/Feed';
import firebaseApp from '@config/firebaseApp';

const Fstorage = firebaseApp.storage();
const Fdatabase = firebaseApp.database();

function Profile() {
    const [feeds, SetFeeds] = useState([]);
    const [userImage, setUserImage] = useState(undefined);
    const session = useSelector ((state) => state.auth.session)

    //현재 유저의 피드를 받아오는 요청
    const getUserFeed = useCallback(() => {
        if(session) {
            const {uid} = session
            let url = 'user/feed';
            fetch(url, {
                method:'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Allow-Control-Access-Origin': '*',
                },
                body: JSON.stringify({
                    uid
                })
            }).then((res) => res.json())
            .then(({feed, msg}) => {
                console.log(feed)
                SetFeeds(feed)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },[session])

    //서버에 프로필 이미지 정보를 달라고 요청
    const getUserProfileImageFromServer = useCallback(
        () => {
            if(session) {
                const {uid} = session
                let url = 'user/profile/image';
                fetch(url, {
                    method:'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Allow-Control-Access-Origin': '*',
                    },
                    body: JSON.stringify({
                        uid
                    })
                }).then((res) => res.json())
                .then(({image}) => {setUserImage(image)})
                .catch(err => {
                    console.log(err)
                })
            }
        },[session]
    )

    //
    useEffect(() => {
        getUserProfileImageFromServer();
        getUserFeed();
    }, [getUserProfileImageFromServer, getUserFeed])

    //스토리지의 이미지 데이터베이스에 저장
    const uploadImageToDatabase = useCallback((uid, url) => {
        Fdatabase.ref(`user/${uid}/profile/image`).set(url).then(() => {
            alert('데이터베이스에 사진을 저장했습니다.')
        }).catch(err => {
            console.log(err)
        })
    },[])

    //스토리지에 업로드
    const uploadImageToStorage = useCallback( (data) => {
        if(session) {
            const {uid} = session;
            Fstorage.ref(`user/${uid}/profile.jpg`).putString(data.split(",")[1], 'base64', {contentType:'image/jpg'}).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    uploadImageToDatabase(uid, url)
                    alert('프로필 사진을 업로드 했습니다.')
                    console.log(url)
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        } //if
    },[session])

    //이미지 가져오기
    const getImage = useCallback( (e) => {
        const filelist = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            setUserImage(e.target.result)
            uploadImageToStorage(e.target.result)
        }
        reader.readAsDataURL(filelist)
    }, [uploadImageToStorage])

    return (
    <div className='profile'>
        <div className='wrapper'>
            <div className='info'>
                <div className='profile-image' style={userImage && {backgroundImage : `url(${userImage})`}}>
                    <input type="file" onChange={getImage} />
                </div>
                <div className='profile-desc'>
                    <div className='nickname txt-bold'>{session ? session.displayName : 'userName'}HONGGIDONG</div>

                </div>
            </div>{/* info */}

            <div className='profile-contents'>
                <div className='feed-list'>
                    <div className='title txt-bold'>작성한 글</div>
                    <div className='feeds'>
                        {
                            feeds.map(item,idx) => {
                                return <Feed key={idx} {} />
                            }
                        }
                        
                    </div>{/* feeds */}
                </div>{/* feed-list */}
                <div className='profile-info-desc'>
                    <div className='desc'>
                        <div className='title txt-bold'>
                            좋아요
                        </div>
                        <div className='count'>
                            250,12
                        </div>
                    </div>{/*desc  */}
                    <div className='desc'>
                        <div className='title txt-bold'>
                            팔로워
                        </div>
                        <div className='count'>
                            246,00
                        </div>
                    </div>{/*desc  */}
                    <div className='desc'>
                        <div className='title txt-bold'>
                            포스트
                        </div>
                        <div className='count'>
                            120
                        </div>
                    </div>{/*desc  */}
                    <div className='desc'>
                        <div className='title txt-bold'>
                            친구
                        </div>
                        <div className='count'>
                            236
                        </div>
                    </div>{/*desc  */}
                </div>  {/* profile-info-desc */}    
            </div>{/* profile-contents */}
        </div>
    </div>
  )
}

export default Profile
