import { Link } from 'react-router'
import config from 'Config'

export default class ArticleBox extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.load = this.load.bind(this);
  }
  load() {
    $.ajax({
      url: config.domain + '/dashboard/articles.json',
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
        <h2>文章總覽</h2>
        <Link to='/dashboard/articles/new'>新增文章</Link>
        <table className='table table-hover'>
          <tbody>
            <tr>
              <td>#</td>
              <td>標題</td>
              <td>名稱(網址)</td>
            </tr>
            {this.state.data.map(function(data) {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td><Link to={ window.location.pathname + '/edit/' + data.id }>{data.title}</Link></td>
                  <td>{data.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}