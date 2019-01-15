import React from 'react'
import FormSlide from '../../components/FormSlide/index'
import UserProducts from './UserProducts/index'
import {  BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

const UserConfiguration = props => {

  return (
    <div className="overlay ">
      <div className="flex__row">
        <Link to="/users/profile/edit">Profile</Link>
        <Link to="/users/products/edit">Products</Link>
      </div>
      <Route render={({location}) => (
        <React.Fragment>
          <TransitionGroup>
            <CSSTransition
                key={location.key}
                timeout={3000}
                classNames='test'
            >
              <Switch>
                <Route path='/users/profile/edit' component={FormSlide} />
                <Route path='/users/products/edit' component={UserProducts} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </React.Fragment>
        )}>
      </Route>
    </div>
  )
}
 export default withRouter(UserConfiguration)
