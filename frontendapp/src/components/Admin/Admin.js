import * as React from 'react';
import Header from '../../Header';
import SideBar from './SideBar'

export default function Admin({AUTHORIZATION_TOKEN}) {
  // console.log(AUTHORIZATION_TOKEN)
  return (
    <>
      <Header ADMIN_PANEL="Admin Panel" AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
      <SideBar AUTHORIZATION_TOKEN={AUTHORIZATION_TOKEN}/>
    </>
  );
}