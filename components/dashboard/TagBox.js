import { Link } from 'react-router'
import config from 'Config'

export default class TagBox extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.load = this.load.bind(this);
  }
  load() {
    $.ajax({
      url: config.domain + '/dashboard/tags.json',
      dataType: 'json',
      xhrFields: { withCredentials: true }
    }).
    done(function(data) {
      this.setState({ data: data })
    }.bind(this))
  }
  componentDidMount() {
    this.load();
  }
  render() {
    return (
      <div>
        <h2>標籤總覽</h2>
        <Link to='/dashboard/tags/new'>New tag</Link>
        <table className='table table-hover'>
          <tbody>
            <tr>
              <td>#</td>
              <td>title</td>
            </tr>
            {this.state.data.map(function(data) {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td><Link to={ window.location.pathname + '/edit/' + data.id }>{data.name}</Link></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}