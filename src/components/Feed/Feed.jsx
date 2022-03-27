import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Feed({feed: {context,image}, profile: {uid}, timestamp}) {
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
    
    useEffect(() => {
        getUserProfileImageFromServer();
    }, [getUserProfileImageFromServer])

    return (
        <div className='feed'>
            <div className='top'>
                <div className='profile-image'> </div>
                <div className='profile-desc'>
                    <div className='nickname txt-bold'>HONGGIDONG </div>
                    <div className='timestamp'>08:15 pm ,yesterday </div>
                </div>
            </div>
            <div className='contents'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quo ab ullam nostrum corrupti corporis laudantium nihil commodi reiciendis. Magnam similique natus voluptates dolore magni, blanditiis necessitatibus eum sequi modi!
                        <div className='image'></div>
            </div>
            <div className='bottom'>
                <div className='like'>
                    <div className='asset'>
                        <img src="/assets/feed/like-dac.svg" alt="좋아요" />
                    </div>
                    <div className='count txt-bold'>25k</div>
                </div>{/*like*/}
                <div className='comment'>
                    <div className='asset'>
                        <img src="/assets/feed/comment.svg" alt="댓글" />
                    </div>
                    <div className='count'>25k</div>
                </div>{/*comment*/}
            </div>    
            
        </div>
    )
}


