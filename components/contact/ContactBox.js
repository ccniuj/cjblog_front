export default React.createClass({
  render() {
    return (
      <div claas="main-content">
        <div className="container">
          {/* google map iframe */}
          <section className="contact-address">
            <div className="row">
              <div className="col-md-5 col-md-offset-1">
                <div className="google-map">
                  <div id="map-canvas" />
                </div>
              </div>
              <div className="col-md-5">
                <div className="col-md-12 col-xs-12">
                  <div className="address-info">
                    <div className="row">
                      <div className="col-md-3 col-xs-3">
                        <div className="address-info-icon text-center center-block bg-light-gray">
                          <i className="fa fa-map-marker" />
                        </div> {/* /.address-info-icon */}
                      </div>
                      <div className="col-md-9 col-xs-9 address-info-desc">
                        <h4>台北市松山區</h4>
                      </div> {/* /.address-info-desc */}
                    </div>
                  </div> {/* /.address-info */}
                </div>
                <div className="col-md-12 col-xs-12">
                  <div className="address-info">
                    <div className="row">
                      <div className="col-md-3 col-xs-3">
                        <div className="address-info-icon text-center center-block bg-light-gray">
                          <i className="fa fa-phone" />
                        </div> {/* /.address-info-icon */}
                      </div>
                      <div className="col-md-9 col-xs-9 address-info-desc">
                        <h4>+886-932-753569</h4>
                      </div> {/* /.address-info-desc */}
                    </div>
                  </div> {/* /.address-info */}
                </div>
                <div className="col-md-12 col-xs-12">
                  <div className="address-info">
                    <div className="row">
                      <div className="col-md-3 col-xs-3">
                        <div className="address-info-icon text-center center-block bg-light-gray">
                          <i className="fa fa-envelope-o" />
                        </div> {/* /.address-info-icon */}
                      </div>
                      <div className="col-md-9 col-xs-9 address-info-desc">
                        <h4>davidjuin0519@gmail.com</h4>
                      </div> {/* /.address-info-desc */}
                    </div>
                  </div> {/* /.address-info */}
                </div>
                <div className="col-md-12 col-xs-12">
                  <div className="address-info">
                    <div className="row">
                      <div className="col-md-3 col-xs-3">
                        <div className="address-info-icon text-center center-block bg-light-gray">
                          <i className="fa fa-github" />
                        </div> {/* /.address-info-icon */}
                      </div>
                      <div className="col-md-9 col-xs-9 address-info-desc">
                        <h4>davidjuin0519</h4>
                      </div> {/* /.address-info-desc */}
                    </div>
                  </div> {/* /.address-info */}
                </div>
              </div>
            </div>
          </section> {/* /.g-map (google-map end) */}
        </div> {/* container */}
      </div>
    );
  }
});