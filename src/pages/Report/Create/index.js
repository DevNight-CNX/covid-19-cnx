import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import {
  AdaptField,
  AdaptImageUploader,
  AdaptPlaceAutoComplete,
  AdaptTextarea
} from 'components/Field';
import Button from 'components/Button';
import useFirebaseAuthen from 'components/useFirebaseAuthen';
import { createReport } from 'services/report';
import { required, isUrlValid } from 'utils/form/validators';
import { notification } from 'antd';
import { CancelHeader } from 'components/BarNavigation/navigation';

const Wrapper = styled.div`
  padding: 26px 24px;
  max-width: 680px;
  margin: auto !important;
`;

const FieldRow = styled.div`
  margin-bottom: 40px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Notice = styled.p`
  margin: 0;
  margin-right: 24px;
  ${({ theme }) => theme.typography.bodySmall()}
  color: ${({ theme }) => theme.color.logicColor.warning};
`;

const CreateReport = () => {
  const { authentication } = useFirebaseAuthen();
  const history = useHistory();

  const onSubmit = values => {
    if (authentication()) {
      return createReport({
        content: values.content,
        linkUrl: values.link,
        imageFile: values.image,
        position: values.address
      })
        .then(() => {
          notification.success({
            message: 'รายงานข่าวสำเร็จแล้ว',
            description:
              'ขอบคุณที่เป็นส่วนหนึ่งในการรายงาน COVID-19 ในเชียงใหม่'
          });
          history.push('/report');
        })
        .catch(() => {
          notification.error({
            message: 'รายงานข่าวไม่สำเร็จ',
            description: 'กรุณาลองใหม่อีกครั้งในภายหลัง'
          });
        });
    }
  };

  return (
    <>
      <CancelHeader
        icon={() => <BackIcon />}
        label="รายงานข่าว"
        mxwidth="680px"
      />
      <Wrapper>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <FieldRow>
                <Field
                  name="content"
                  label="*เนื้อหา"
                  component={AdaptTextarea}
                  validate={required('เนื้อหา')}
                />
              </FieldRow>
              <FieldRow>
                <Field
                  name="link"
                  label="Link อ้างอิงที่มาของข่าว"
                  component={AdaptField}
                  validate={isUrlValid}
                />
              </FieldRow>
              <FieldRow>
                <Field
                  name="address"
                  label="ระบุพื้นที่สุ่มเสี่ยง"
                  component={AdaptPlaceAutoComplete}
                />
              </FieldRow>
              <FieldRow>
                <Field
                  name="image"
                  component={AdaptImageUploader}
                  label="รูปภาพ"
                />
              </FieldRow>
              <Footer>
                <Notice>
                  กรุณาตรวจสอบข้อมูล และที่มาของ แหล่งข่าวก่อนทำการยืนยัน
                </Notice>
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
