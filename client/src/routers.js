import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/body/auth/Login'
import Register from './components/body/auth/Register'
import ActivationEmail from './components/body/auth/ActivationEmail'
import NotFound from './components/utils/NotFound/NotFound'
import BrowseHomepage from'./components/Userebrowsercomponent/BrowseHomepage'
import ForgotPass from './components/body/auth/ForgotPassword'
import ResetPass from './components/body/auth/ResetPassword'

import Profile from './components/body/profile/Profile'
import EditUser from './components/body/profile/EditUser'

import Home from './components/body/home/Home'

import {useSelector} from 'react-redux'

function Routers() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/brows"  component={isLogged ? BrowseHomepage : NotFound} exact />
                
                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

            </Switch>
        </section>
    )
}

export default Routers
