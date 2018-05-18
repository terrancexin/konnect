import React from 'react';
import { connect } from 'react-redux';
import { clearNotices } from '../../actions';

class Notice extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.clearNoticesTimeout(nextProps);
  }

  componentDidMount() {
    this.clearNoticesTimeout(this.props);
  }

  clearNoticesTimeout(props) {
    if (!props.notice) return;
    setTimeout(() => {
      props.clearNotices();
    }, 3000);
  }

  render() {
    if (!this.props.notice) return null;

    return (
      <div className="notice">
        { this.props.notice}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notice: state.notice
});

export default connect(
  mapStateToProps,
  { clearNotices }
)(Notice);
