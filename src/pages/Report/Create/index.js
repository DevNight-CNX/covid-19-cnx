import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import {
  AdaptField,
  AdaptImageUploader,
  AdaptPlaceAutoComplete,
  AdaptTextarea
} from 'components/Field';
import Button from 'components/Button';

const Wrapper = styled.div`
  padding: 26px 24px;
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
  const onSubmit = values => {
    console.log('values', values);
  };

  return (
    <Wrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FieldRow>
              <Field
                name="content"
                label="*เนื้อหา"
                component={AdaptTextarea}
              />
            </FieldRow>
            <FieldRow>
              <Field
                name="link"
                label="*Link อ้างอิงที่มาของข่าว"
                component={AdaptField}
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
                name="uploader"
                component={AdaptImageUploader}
                label="รูปภาพ"
              />
            </FieldRow>
            <Footer>
              <Notice>
                กรุณาตรวจสอบข้อมูล และที่มาของ แหล่งข่าวก่อนทำการยืนยัน
              </Notice>
              <Button type="submit">ยืนยัน</Button>
            </Footer>
          </form>
        )}
      ></Form>
    </Wrapper>
  );
};

export default CreateReport;
