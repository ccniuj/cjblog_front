export default React.createClass({
  render() {
    return (
      <div>
        <div id="main">
          <section className="bg-light-gray designation">
            <div className="container">
              <div className="team-list">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="team-member-box text-center">
                        <img src={require("../../assets/images/avatar.jpg")} className="img-responsive center-block" alt="team-member 3" />
                        <div className="team-member-description">
                          <div className="team-member-about">
                            <h4>Juin Chiu</h4>
                            <p>Programmer</p>
                            <p>做一個堅持不懈的學徒</p>
                          </div> {/* end of /.team-member-about */}
                          <div className="team-member-social">
                            <a href="https://www.facebook.com/juin.chiu" title="facebook">
                              <i className="fa fa-facebook" />
                            </a>
                            <a href="https://github.com/davidjuin0519" title="github">
                              <i className="fa fa-github" />
                            </a>
                            <a href="/Juin_Chiu_CV.pdf" title="CV">
                              <i className="fa fa-file-pdf-o" />
                            </a>
                          </div> {/* end of /.team-member-social */}
                        </div> {/* end of /.team-member-description */}
                      </div> {/* end of /.team-member-box */}
                    </div>
                    <div className="col-md-9 text-center">
                      <p className="story-description" style={{fontSize: 15}}>
                        技術樂觀主義者。<br />
                        23歲時才開始自學，立志成為出色的軟體工程師。<br />期望人類能夠很快迎向人工智慧的奇點。<br />
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
              </div> {/* end of /.team-list */}
            </div>
          </section>
        </div>
        {/* footer-navigation start */}  
        <nav className="hidden-xs hidden-sm navbar footer-nav" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-nav-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              {/* navbar logo */}
              <div className="navbar-brand">
                <span className="sr-only">©CJ</span>
                <a href="index.html">
                  ©CJ
                </a>
              </div>
              {/* navbar logo */}
            </div>{/* /.navbar-header */}
          </div>{/* /.container */}
        </nav>
      </div> 
    );
  }
});