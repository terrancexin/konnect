import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearNotices } from '../../actions';

class Notice extends React.Component {
  componentDidMount() {
    this.clearNoticesTimeout(this.props.notice);
  }

  componentWillReceiveProps(nextProps) {
    this.clearNoticesTimeout(nextProps);
  }

  clearNoticesTimeout(notice) {
    if (!notice) return;
    setTimeout(() => {
      this.props.clearNotices();
    }, 3000);
  }

  render() {
    if (!this.props.notice) return null;

    return <div className="notice">{this.props.notice}</div>;
  }
}

const mapStateToProps = state => ({
  notice: state.notice,
});

Notice.propTypes = {
  notice: PropTypes.string.isRequired,
  clearNotices: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { clearNotices })(Notice);
