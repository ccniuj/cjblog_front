import { Link } from 'react-router'
import hljs from 'highlight.js'
import config from 'Config'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.load = () => this._load();
  }
  componentDidMount() {
    // this.load();
  }
  _load() {
    $.ajax({
      url: config.domain + '/projects.json',
      dataType: 'json',
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr) {
      }.bind(this)
    });
  }
  render() {
    return (
      <div>
        <div className="avatar-social">
                  <a href="https://github.com/davidjuin0519" title="github">
                    <i className="fa fa-github" />
                  </a>
                </div>
      </div>
    )
  }
}