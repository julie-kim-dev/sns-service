import React, { useCallback, useState, useRef }  from "react";
import { useSelector } from 'react-redux';
import firebaseApp from "@config/firebaseApp";
import "./index.css";

const Fstorage = firebaseApp.storage();

function uploadImageToStorage(data, timestamp) {
    return new Promise((resolve,reject) => {
        Fstorage.ref(`feed/${timestamp}/feed.jpg`).putString(
            data.split(",")[1],'base64',{
                contentType: 'image/jpg'
            }
        ).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
                console.log('이미지 업로드 완료')
                resolve(url)
            })
        }).catch(err => {
            reject(err)
        })
    })
} //uploadImageToStorage

function MainFeed() {
    const contextRef = useRef(null)
    const [context, setContext] = useState(undefined);
    const [feed_image, setFeed_image] = useState(undefined);
    const session = useSelector(state => state.auth.session)

    const makeFeed = useCallback(
        async(e) => {
            e.preventDefault();
            if(session && (context || feed_image)) {
                const nowTime = Date.now()
                let downloadUrl;
                if(feed_image) {
                    //파이어베이스 스토리지에 업로드 후 업로드 된 url을 받아서 fetch로 값을 넘겨준다
                    downloadUrl=await uploadImageToStorage(feed_image, nowTime)
                    .catch((err) => {
                        console.log(err)
                    });
                }

                const {uid} = session;
                let url="/feed/new";
                fetch(url, {
                    method: 'POST',
                    header: {
                        'Context-type' : 'application/json',
                        'Allow-Control-Access-Origin' : '*',
                    },
                    body: JSON.stringify({
                        feed: {
                            context,
                            image: downloadUrl
                        },
                        profile: {
                            uid
                        },
                        timestamp: nowTime
                    })
                    }).then((res) => res.json())
                    .then(({msg})=>{
                        contextRef.current.value=''
                        console.log(msg)
                        alert(msg)
                    }).catch(err => {
                        console.log(err)
                    })
            } // if
        },
        [context, session, feed_image],
    );

    const getDataFromImage = useCallback((e) => {
        const filelist = e.target.files[0];
        const reader = new FileReader()
        reader.onload = (e) => {
            console.log(e.target.result)
            setFeed_image(e.target.result)
        }
        reader.readAsDataURL(filelist)
    }, [])

    return (
        <div className="mainfeed">
            <div className="wrapper">
                <div className="feed-list">
                    <form className="write-feed" onSubmit={makeFeed}>
                        <div className="profile-image"></div>
                        <div className="input">
                            <input type="text" ref={contextRef} placeholder="내용을 입력하세요" onChange={(e) => setContext(e.target.value)}/>
                        </div>
                        <div className="get-image">
                            <label htmlFor="get-image-input">
                                <img src="/assets/main/add-image.svg" alt="이미지 추가하기" />
                            </label>
                            <input type="file" id="get-image-input" onChange={getDataFromImage}/>
                        </div>
                    </form> {/* 쓰기 */}
                    <div className="feed">
                        <div className="top">
                            <div className="profile-image"></div>
                            <div className="profile-desc">
                                <div className="nickname txt-bold">라라</div>
                                <div className="timestamp">08:15 pm ,yesterday</div>
                            </div>
                        </div>
                        <div className="contents">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus delectus quas minima consequatur voluptatem voluptas quo nesciunt sint, veritatis doloremque illum facilis, sit iste deleniti at in magnam, labore molestias!
                        </div>
                        <div className="bottom">
                            <div className="like">
                                <div className="asset">
                                    <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                                </div>
                                <div className="count txt-bold">25k</div>
                            </div>
                            <div className="comment">
                                <div className="asset">
                                    <img src="/assets/feed/comment.svg" alt="댓글" />
                                </div>
                                <div className="count txt-bold">250</div>
                            </div>
                        </div> {/* bottom */}
                    </div> {/* feed-txt */}

                    <div className="feed">
                        <div className="top">
                            <div className="profile-image"></div>
                            <div className="profile-desc">
                                <div className="nickname txt-bold">라라</div>
                                <div className="timestamp">08:15 pm ,yesterday</div>
                            </div>
                        </div>
                        <div className="contents">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus delectus quas minima consequatur voluptatem voluptas quo nesciunt sint, veritatis doloremque illum facilis, sit iste deleniti at in magnam, labore molestias!
                            <div className="image"></div>
                        </div>
                        <div className="bottom">
                            <div className="like">
                                <div className="asset">
                                    <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                                </div>
                                <div className="count txt-bold">25k</div>
                            </div>
                            <div className="comment">
                                <div className="asset">
                                    <img src="/assets/feed/comment.svg" alt="좋아요" />
                                </div>
                                <div className="count txt-bold">250</div>
                            </div>
                        </div> {/* bottom */}
                    </div> {/* feed-img */}
                    <div className="feed">
                        <div className="top">
                            <div className="profile-image"></div>
                            <div className="profile-desc">
                                <div className="nickname txt-bold">라라</div>
                                <div className="timestamp">08:15 pm ,yesterday</div>
                            </div>
                        </div>
                        <div className="contents">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus delectus quas minima consequatur voluptatem voluptas quo nesciunt sint, veritatis doloremque illum facilis, sit iste deleniti at in magnam, labore molestias!
                        </div>
                        <div className="bottom">
                            <div className="like">
                                <div className="asset">
                                    <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                                </div>
                                <div className="count txt-bold">25k</div>
                            </div>
                            <div className="comment">
                                <div className="asset">
                                    <img src="/assets/feed/comment.svg" alt="좋아요" />
                                </div>
                                <div className="count txt-bold">250</div>
                            </div>
                        </div> {/* bottom */}
                    </div> {/* feed-txt */}
                    <div className="feed">
                        <div className="top">
                            <div className="profile-image"></div>
                            <div className="profile-desc">
                                <div className="nickname txt-bold">라라</div>
                                <div className="timestamp">08:15 pm ,yesterday</div>
                            </div>
                        </div>
                        <div className="contents">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus delectus quas minima consequatur voluptatem voluptas quo nesciunt sint, veritatis doloremque illum facilis, sit iste deleniti at in magnam, labore molestias!
                            <div className="image"></div>
                        </div>
                        <div className="bottom">
                            <div className="like">
                                <div className="asset">
                                    <img src="/assets/feed/like-ac.svg" alt="좋아요" />
                                </div>
                                <div className="count txt-bold">25k</div>
                            </div>
                            <div className="comment">
                                <div className="asset">
                                    <img src="/assets/feed/comment.svg" alt="좋아요" />
                                </div>
                                <div className="count txt-bold">250</div>
                            </div>
                        </div> {/* bottom */}
                    </div> {/* feed-img */}

                </div> {/* feed-list */}
                <div className="friend-list">
                    <div className="my-profile">
                        <div className="profile-image"></div>
                        <div className="nickname">라라</div>
                    </div> {/* 마이프로필 */}
                    <div className="my-friends">
                        <div className="title txt-bold">친구 리스트</div>
                        <ul className="friend-list-wrapper">
                            <li className="friend">
                                <div className="profile-image"></div>
                                <div className="nickname">리리</div>
                            </li>
                            <li className="friend">
                                <div className="profile-image"></div>
                                <div className="nickname">루루</div>
                            </li>
                            <li className="friend">
                                <div className="profile-image"></div>
                                <div className="nickname">레레</div>
                            </li>
                            <li className="friend">
                                <div className="profile-image"></div>
                                <div className="nickname">로로</div>
                            </li>
                        </ul>
                    </div> {/* 마이프렌드 */}
                </div> {/* friend-list */}
            </div> {/* wrapper */}
        </div>
    )
}

export default MainFeed;