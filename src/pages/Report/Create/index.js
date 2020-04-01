import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { compose, prop } from 'ramda';
import { Form, Field, FormSpy } from 'react-final-form';
import {
  AdaptField,
  AdaptImageUploader,
  AdaptPlaceAutoComplete,
  AdaptTextarea,
  AdaptToggle,
  AdaptRadio
} from 'components/Field';
import Button from 'components/Button';
import useFirebaseAuthen from 'components/useFirebaseAuthen';
import { createReport } from 'services/report';
import { required, isUrlValid, composeValidators } from 'utils/form/validators';
import { notification } from 'antd';
import { CancelHeader } from 'components/BarNavigation/navigation';
import eventTracker from 'utils/eventTracker';
import useResponsive from 'utils/useResponsive';
import newsPreview from './assets/news.png';
import riskPreview from './assets/risk.png';

const Wrapper = styled.div`
  padding: 26px 24px;
  max-width: 680px;
  margin: auto !important;
  position: relative;

  @media only screen and (max-width: 1100px) {
    margin-top: 56px !important;
  }
`;

const FieldRow = styled.div`
  margin-bottom: 40px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ isPlaceFixed, theme }) =>
    isPlaceFixed
      ? `
        position: sticky;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 8px 16px;
        background-color: ${theme.color.white};
      `
      : null}
`;

const Notice = styled.p`
  margin: 0;
  margin-right: 24px;
  ${({ theme }) => theme.typography.bodySmall()}
  color: ${({ theme }) => theme.color.logicColor.warning};
`;

const PublicUser = styled.div`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typography.content()}
  p {
    display: none;
  }

  > label {
    ${({ theme }) => theme.typography.content()}
  }

  && {
    div {
      margin: 0px;
      label {
        display: none;
      }
    }
  }
`;

const CreateReport = () => {
  const { authentication } = useFirebaseAuthen();
  const history = useHistory();
  const [initialValues] = useState({
    type: 'news'
  });
  const [typeValue, setTypeValue] = useState(null);

  const onSubmit = values => {
    if (authentication()) {
      return createReport({
        content: values.content,
        linkUrl: values.link,
        imageFile: values.image,
        position: values.address,
        anonymous: values.publicUser || false,
        type: values.type
      })
        .then(res => {
          eventTracker({ type: 'submitReport', id: 'submitReportSuccess' });
          notification.success({
            message: 'รายงานข่าวสำเร็จแล้ว',
            description:
              'ขอบคุณที่เป็นส่วนหนึ่งในการรายงาน COVID-19 ในเชียงใหม่'
          });
          history.push('/report');
        })
        .catch(() => {
          eventTracker({ type: 'submitReport', id: 'submitReportFailed' });
          notification.error({
            message: 'รายงานข่าวไม่สำเร็จ',
            description: 'กรุณาลองใหม่อีกครั้งในภายหลัง'
          });
        });
    }
  };

  const { isDesktop } = useResponsive();

  return (
    <>
      <CancelHeader
        label="รายงานข่าว"
        mxwidth="680px"
        link={'/'}
        isPlaceFixed={isDesktop}
      />
      <Wrapper>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <FieldRow>
                <Field
                  name="type"
                  label="รายงานประเภท"
                  component={AdaptRadio}
                  items={[
                    {
                      value: 'news',
                      label: 'แหล่งข่าว',
                      preview: newsPreview
                    },
                    {
                      value: 'risk',
                      label: 'พื้นที่เสี่ยง',
                      preview: riskPreview
                    }
                  ]}
                />
                <FormSpy
                  subscription={{
                    values: true
                  }}
                  onChange={props => {
                    const getType = compose(
                      prop('type'),
                      prop('values')
                    );
                    setTypeValue(getType(props));
                  }}
                />
              </FieldRow>
              <FieldRow>
                <Field
                  name="link"
                  label="Link อ้างอิงที่มาของข่าว"
                  component={AdaptField}
                  validate={isUrlValid}
                  validate={composeValidators(
                    isUrlValid,
                    required(' Link อ้างอิงที่มาของข่าว')
                  )}
                />
              </FieldRow>
              <FieldRow>
                <Field
                  name="address"
                  label={
                    typeValue === 'news' ? 'สถานที่ตั้ง' : 'ระบุพื้นที่เสี่ยง'
                  }
                  component={AdaptPlaceAutoComplete}
                  validate={required('สถานที่ตั้ง')}
                />
              </FieldRow>
              <FieldRow>
                <Field
                  name="content"
                  label="คำบรรยาย"
                  component={AdaptTextarea}
                  validate={required('คำบรรยาย')}
                />
              </FieldRow>
              <FieldRow>
                <Field
                  name="image"
                  component={AdaptImageUploader}
                  validate={image => {
                    if (!image) {
                      return null;
                    }

                    if (image.size / Math.pow(1024, 2) > 10) {
                      return 'ขนาดไฟล์ใหณ่เกินไป';
                    }
                  }}
                  maxSize={null}
                  label="รูปภาพ"
                />
              </FieldRow>

              <Footer isPlaceFixed={isDesktop}>
                <PublicUser>
                  <label style={{ margin: '0px 16px 0px 0px' }}>
                    {'Anonymous'}
                  </label>
                  <Field name="publicUser" component={AdaptToggle} />
                </PublicUser>
                <Button htmlType="submit" loading={submitting}>
                  ยืนยัน
                </Button>
              </Footer>
            </form>
          )}
        ></Form>
      </Wrapper>
    </>
  );
};

export default CreateReport;
