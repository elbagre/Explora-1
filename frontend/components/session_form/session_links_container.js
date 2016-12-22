import { connect } from 'react-redux';
import { clearErrors } from '../../actions/session_actions.js';
import SessionLinks from './session_links.jsx';

const mapStateToProps = (state) => ({
  errors: state.errors
});

const mapDispatchToProps = (dispatch) => ({
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionLinks);
