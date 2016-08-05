import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import DashboardNavbar from './DashboardNavbar'

class Dashboard extends Component {
  render() {
    const { children } = this.props
    const style = {
      paddingTop: '50px'
    }
    return (
      <div>
        <DashboardNavbar />
        <div style={style}>
          <div className='col-md-3 col-xs-3' style={{padding: '30px'}}>
            <div className="list-group">
              <Link to="/dashboard/articles" className="list-group-item">文章</Link>
              <Link to="/dashboard/tags" className="list-group-item">標籤</Link>
            </div>
          </div>
          <div className='col-md-9 col-xs-9'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  {}
)(Dashboard)
