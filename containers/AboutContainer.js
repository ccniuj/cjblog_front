import React, { Component } from 'react'
import { connect } from 'react-redux'

class AboutContainer extends Component{
  render() {
    return (
      <div className="row">
        <div className='col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1 about-box'>
          <div className="col-md-3 col-xs-4">
            <div className="avatar-box text-center">
              <img className='avatar-image' src='/images/icon.png' />
              {console.log('about')}
              <div className="avatar-about">
                <h4>Juin Chiu</h4>
                <p>Software Craftsman</p>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-xs-8 text-center about-description">
            <p>
              23歲始自學，立志成為頂尖的軟體工程師。<br />
              期望人類能夠很快迎向人工智慧的奇點。<br />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AboutContainer)