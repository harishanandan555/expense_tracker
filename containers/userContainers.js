import { connect } from 'react-redux';
import UserComponent from '../components/UserComponent';
import { fetchUser } from '../actions/userActions';

class UserContainer extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return <UserComponent user={this.props.user} loading={this.props.loading} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
