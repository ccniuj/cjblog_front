import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import config from '../config'

export default class extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { email: '',  password: '' }
  }
  handleInputChange(e) {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: config.domain + '/dashboard/sign_in.json',
      dataType: 'json',
      data: { user: this.state },
      type: 'POST',
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      browserHistory.push('/dashboard')
    }).
    fail(function(xhr) {
      console.log(xhr);
    })
  }
  handleLogout(e) {
    e.preventDefault();
    $.ajax({
      url: config.domain + '/dashboard/sign_out.json',
      dataType: 'json',
      type: 'DELETE',
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      console.log(data);
    }).
    fail(function(xhr) {
      console.log(xhr);
    })
  }
  render() {
    return (
      <div className='row'>
        <div className='col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3 login-box'>
          <form onSubmit={this.handleSubmit}>
            <label for='email'>帳號</label>
            <input type='text' name='email' value={this.state.email} onChange={this.handleInputChange} />
            <br/>
            <br/>
            <label for='password'>密碼</label>
            <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
            <br/>
            <br/>
            <input className='btn btn-success btn-block' type='submit' value='登入' />
          </form>
        </div>
      </div>
    )
  }
}