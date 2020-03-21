import React, { Component } from 'react';
import loadImage from 'blueimp-load-image';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

const StyledDropzone = styled(Dropzone)`
  border: 0;
  width: 100%;
`;

class UploadImageHandler extends Component {
  static propTypes = {
    uploadService: PropTypes.func,
    maxSize: PropTypes.number,
    onChange: PropTypes.func,
    onUploadServiceFinish: PropTypes.func,
    onUploadServiceSuccess: PropTypes.func,
    onUploadServiceFail: PropTypes.func,
    onUploadServiceStart: PropTypes.func,
    validFiles: PropTypes.array,
    imageDefault: PropTypes.string,
    label: PropTypes.string,
    render: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.any,
    readOnly: PropTypes.bool
  };

  static defaultProps = {
    maxSize: 4,
    onUploadServiceFinish: () => {},
    onUploadServiceSuccess: () => {},
    onUploadServiceFail: () => {},
    onUploadServiceStart: () => {},
    onChange: () => {},
    validFiles: [],
    render: () => {},
    imageDefault: '',
    style: {},
    readOnly: false
  };

  state = {
    previewImage: '',
    errorMessage: '',
    showError: false,
    loading: false
  };

  getPreviewImage = () => {
    const { previewImage, showError } = this.state;
    const { imageDefault, value } = this.props;
    if (showError) {
      return imageDefault;
    } else if (!previewImage) {
      return value || imageDefault;
    }
    return previewImage;
  };

  setPreviewImageFromFile = file => {
    this.setState({
      previewImage: window.URL.createObjectURL(file)
    });
  };

  uploadToService = file => {
    const {
      onChange,
      onUploadServiceStart,
      onUploadServiceFinish,
      onUploadServiceSuccess,
      onUploadServiceFail,
      uploadService
    } = this.props;

    if (!uploadService) {
      onChange(file);
      this.setLoading(false);
      return;
    }

    onUploadServiceStart();

    uploadService(file)
      .then(imageUrl => {
        onChange(imageUrl);
        this.setLoading(false);
        onUploadServiceFinish();
        onUploadServiceSuccess();
      })
      .catch(error => {
        this.setError(error);
        this.setLoading(false);
        onUploadServiceFinish();
        onUploadServiceFail();
      });
  };

  setLoading = isLoading => {
    this.setState({
      loading: isLoading
    });
  };

  setError = errorMessage => {
    const { onChange } = this.props;
    this.setState({
      errorMessage,
      showError: true,
      previewImage: ''
    });
    onChange(undefined);
  };

  clearError = () => {
    this.setState({
      errorMessage: '',
      showError: false
    });
  };

  handleUploadFileSuccess = file => {
    this.setPreviewImageFromFile(file);
    this.uploadToService(file);
    this.clearError();
  };

  handleUploadFileFail = file => {
    const { validFiles } = this.props;
    if (!validFiles.includes(file.type)) {
      this.setError(`Your file's format must be jpeg or png.`);
    } else {
      this.setError(`Your file's size is too large.`);
    }
  };

  fixesOrientation = (rawFile, callback = () => {}) => {
    loadImage(
      rawFile,
      imageCanvas => {
        imageCanvas.toBlob(callback, 'image/jpeg');
      },
      { canvas: true, orientation: true }
    );
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length > 0) {
      this.setLoading(true);
      this.fixesOrientation(acceptedFiles[0], this.handleUploadFileSuccess);
    } else if (rejectedFiles.length > 0) {
      this.handleUploadFileFail(rejectedFiles[0]);
    }
  };

  removeUploadedFile = () => {
    const { onChange } = this.props;
    onChange();
    this.setState({
      previewImage: ''
    });
  };

  getErrorProps = () => {
    const { errorMessage, showError, readOnly } = this.state;
    return {
      showError: showError && !readOnly,
      message: errorMessage
    };
  };

  getCaptionProps = () => {
    const { showError, previewImage } = this.state;
    const { label, value, readOnly } = this.props;

    return {
      showCaption: !showError && !previewImage && !value && !readOnly,
      message: label
    };
  };

  getRemoveProps = () => {
    const { showError, previewImage, loading } = this.state;
    const { value, readOnly } = this.props;
    return {
      showRemove:
        (!!value || !!previewImage) && !loading && !showError && !readOnly,
      onClick: event => {
        this.removeUploadedFile();
        event.stopPropagation();
      }
    };
  };

  getRenderProps = () => {
    const { loading, previewImage } = this.state;
    const { readOnly } = this.props;

    return {
      readOnly,
      getErrorProps: this.getErrorProps,
      getPreviewImage: this.getPreviewImage,
      getIsLoading: () => loading,
      uploadedImage: previewImage,
      removeUploadedImage: this.removeUploadedImage,
      getCaptionProps: this.getCaptionProps,
      getRemoveProps: this.getRemoveProps
    };
  };

  render() {
    const {
      maxSize: maxSizePropInMb,
      validFiles,
      style,
      render,
      readOnly
    } = this.props;
    const maxSize = maxSizePropInMb * 1048576;
    const dataTestidKey = 'data-testid';

    return (
      <StyledDropzone
        disabled={readOnly}
        onDrop={this.onDrop}
        multiple={false}
        accept={validFiles.join(',')}
        maxSize={maxSize}
        inputProps={{ [dataTestidKey]: 'upload-image-field' }}
        style={{
          ...style
        }}
      >
        {render(this.getRenderProps())}
      </StyledDropzone>
    );
  }
}

export default UploadImageHandler;
