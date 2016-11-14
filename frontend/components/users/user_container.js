import { connect } from 'react-redux';
import { requestSingleUser } from '../../actions/user_actions.js';
import UserHome from './user_home.jsx';

const mapStateToProps = (state, ownProps) => ({
  id: parseInt(ownProps.params.id),
  user: state.users.detail
});

const mapDispatchToProps = (dispatch) => ({
  requestSingleUser: (id) => dispatch(requestSingleUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
