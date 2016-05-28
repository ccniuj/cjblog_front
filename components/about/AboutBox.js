export default React.createClass({
  render() {
    return (
      <div className="container" style={{marginTop: '20px'}}>
        <div className="row">
          <div className="col-md-3 col-xs-4">
            <div className="avatar-box text-center">
              <div className='avatar-image img-responsive center-block'></div>
              <div className="avatar-description">
                <div className="avatar-about">
                  <h4>Juin Chiu</h4>
                  <p>Programmer</p>
                  <p>做一個堅持不懈的學徒</p>
                </div> {/* end of /.avatar-about */}
                <div className="avatar-social">
                  <a href="https://www.facebook.com/juin.chiu" title="facebook">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="https://github.com/davidjuin0519" title="github">
                    <i className="fa fa-github" />
                  </a>
                  <a href="/Juin_Chiu_CV.pdf" title="CV">
                    <i className="fa fa-file-pdf-o" />
                  </a>
                </div> {/* end of /.avatar-social */}
              </div> {/* end of /.avatar-description */}
            </div> {/* end of /.avatar-box */}
          </div>
          <div className="col-md-9 col-xs-8 text-center">
            <p className="story-description" style={{fontSize: 15}}>
              技術樂觀主義者。<br />
              23歲始自學，立志成為頂尖的軟體工程師。<br />
              期望人類能夠很快迎向人工智慧的奇點。<br />
              我遊走於各種極端之間。<br />
              時而衣冠楚楚，時而不修邊幅；<br />
              可以花三個月奔波創辦組織，也可以花三個月閉關鑽研技術；<br />
              曾經因掌聲而自滿，也曾經因迷失而自卑。<br />
              但從來不曾放棄，<br />
              只為做一個堅持不懈的學徒。
            </p> {/* /.story-description */}
          </div>
        </div>
      </div>
    );
  }
});