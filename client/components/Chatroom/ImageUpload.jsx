/* global document FileReader */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setImgSrc, setFileName } from '../../actions';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.setRef = this.setRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
  }

  setRef(node) {
    this.fileInput = node;
  }

  handleClick(e) {
    e.preventDefault();

    this.fileInput.click();
  }

  handleChange(e) {
    const { files } = e.target;

    if (files) {
      const fileSelected = files[0] || null;
      this.reader = new FileReader();

      this.reader.onload = () => {
        this.props.setImgSrc(this.reader.result);
      };

      if (fileSelected) {
        this.reader.readAsDataURL(fileSelected);
        this.props.setFileName(fileSelected.name);
      }
    }
  }

  handleCancelUpload(e) {
    e.preventDefault();

    // clear file input event listener
    document.getElementById('imageUploadInput').value = '';
    this.props.setImgSrc('');
    this.props.setFileName('');
  }

  render() {
    const { imgFileName } = this.props;

    return (
      <div className="imageUpload">
        <input
          onChange={this.handleChange}
          type="file"
          ref={this.setRef}
          className="imageUpload__input"
          id="imageUploadInput"
        />
        {imgFileName && (
          <button
            onClick={this.handleCancelUpload}
            className="imageUpload__btn--cancel"
          >
            cancel
          </button>
        )}
        <span className="imageUpload__fileName">{imgFileName.slice(0, 50)}</span>
        <button onClick={this.handleClick} className="imageUpload__btn">
          <i className="far fa-image" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imgFileName: state.imgFileName,
});

ImageUpload.propTypes = {
  setImgSrc: PropTypes.func.isRequired,
  setFileName: PropTypes.func.isRequired,
  imgFileName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  setImgSrc,
  setFileName,
})(ImageUpload);
