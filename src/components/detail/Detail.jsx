import React from 'react'
import "./detail.css"
import { auth, db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'


const Detail = () => {
  const { chatId,user,isCurrentUserBlocked,isReceiverBlocked,changeBlock } = useChatStore()
  const { currentUser } = useUserStore();

  const handleBlock = async()=>{
    if(!user) return;


    const userDocRef = doc(db,"users",currentUser.id)

    try {
      await updateDoc(userDocRef,{
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://m.media-amazon.com/images/I/61AbHD-RGtL._AC_UF1000,1000_QL80_.jpg" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" className='icon' alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>{
          isCurrentUserBlocked ? "You are Bocked!" : isReceiverBlocked ? "User Blocked" : "Block user"
        }</button>
        <button className='logout' onClick={()=>{
          auth.signOut()
        }}>Logout</button>
      </div>
    </div>
  )
}

export default Detail