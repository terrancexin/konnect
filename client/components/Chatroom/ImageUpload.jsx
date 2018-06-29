import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setFileName, setImgSrc } from '../../actions/image';

class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setRef = this.setRef.bind(this);
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
    this.props.setFileName('');
    this.props.setImgSrc('');
  }

  render() {
    const { imgFileName, imgSrc } = this.props;

    return (
      <div className="imageUpload">
        <input
          accept="image/*"
          className="imageUpload__input"
          id="imageUploadInput"
          onChange={this.handleChange}
          ref={this.setRef}
          type="file"
        />
        {imgFileName && (
          <button
            className="imageUpload__btn--cancel"
            onClick={this.handleCancelUpload}
          >
            cancel
          </button>
        )}
        <span className="imageUpload__fileName">
          {imgFileName.slice(0, 50)}
          {imgFileName && <img alt="preview" src={imgSrc} />}
        </span>
        <span className="imageUpload__fileName--mobile">
          {imgFileName.slice(0, 20)}
          {imgFileName && <img alt="preview" src={imgSrc} />}
        </span>
        <button onClick={this.handleClick} className="imageUpload__btn">
          <i className="far fa-image" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  imgFileName: state.imgFileName,
  imgSrc: state.imgSrc,
});

ImageUpload.propTypes = {
  imgFileName: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
  setImgSrc: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setFileName,
  setImgSrc,
})(ImageUpload);
