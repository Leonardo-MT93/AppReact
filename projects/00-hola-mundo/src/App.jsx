import React from 'react'
import './App.css'
import TwitterFollowCard from './TwitterFollowCard'
const App = () => {
  return (
    <>
    <TwitterFollowCard userName="lion" name="leonino" isFollowing/>
    <TwitterFollowCard userName="lion" name="leonino" isFollowing={false}/>
    <TwitterFollowCard userName="lion" name="leonino" isFollowing/>
    <TwitterFollowCard userName="lion" name="leonino" isFollowing={false}/>
    </>
    
  )
}

export default App