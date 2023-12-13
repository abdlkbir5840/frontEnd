import React from 'react'
import  Cookie from 'cookie-universal' 
import { Navigate, Outlet } from 'react-router-dom';
export default function RequireAuth() {
    const cookie = Cookie();
    const token = cookie.get("laravel")
  return token ? <Outlet/> : <Navigate to={"/login"} replace={true}/>
}
