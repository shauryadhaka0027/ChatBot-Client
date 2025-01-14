import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Page/Login/Login'
import Signup from '../Page/signup/Signup'
import LayoutPage from '../Page/Layout/LayoutPage'
import PrivateRoute from './PrivateRoute'

const MainRoute = () => {
    return (
        <div>
            <Routes>
                <Route path='/login' Component={Login} />
                <Route path='/signup' Component={Signup} />
                <Route element={<PrivateRoute />}>
                    <Route path='/' Component={LayoutPage} />
                </Route>

            </Routes>
        </div>
    )
}

export default MainRoute
