import React from 'react';
import styled from 'styled-components';
import UploadImageHandler from '../../UploadImageHandler';

const validFiles = ['image/jpeg', 'image/png'];

const Uploader = styled.div`
  display: block;
  width: 100%;
  padding: 14px 24px;
  ${({ theme }) => theme.typography.body()}
  border: 1px solid ${({ theme }) => theme.color.neutralColor.lightGray300};
  border-radius: 2px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  margin-bottom: 24px;
`;

const PreviewImage = styled.div`
  width: 100%;
  padding-bottom: 54%;
  background-size: contain;
  background-image: url(${({ src }) => src});
  background-color: ${({ theme }) => theme.color.neutralColor.background};
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageUploader = props => {
  return (
    <UploadImageHandler
      validFiles={validFiles}
      {...props}
      render={({ getErrorProps, getPreviewImage, getIsLoading, readOnly }) => (
        <>
          <Uploader isError={getErrorProps().showError} readOnly={readOnly}>
            Upload Picture
          </Uploader>
          {getPreviewImage() ? (
            <PreviewImage
              src={getPreviewImage()}
              data-testid="upload-preview"
            />
          ) : null}
          {getIsLoading() ? <p>Loadng...</p> : null}
        </>
      )}
    />
  );
};

export default ImageUploader;
