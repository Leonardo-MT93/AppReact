import React, { useState } from 'react'
import './App.css'
const TwitterFollowCard = ({userName, name}) => {

    const [isFollowing, setIsFollowing] = useState(false);
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'
  return (
    <article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img className='tw-followCard-avatar' alt='El avatar de una persona' src='https://unavatar.io/kikobeats'></img>
            <div className='tw-followCard-info'>
                <strong>{name}</strong>
                <span className='tw-followCard-infoUserName'>@{userName}</span>
            </div>
        
        </header>

        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                {text}
                <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
            </button>
        </aside>
    </article>
  )
}

export default TwitterFollowCard