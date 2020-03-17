import React from 'react';
import PropTypes from 'prop-types';

const makeFieldDecorator = Field => {
  const FieldDecorator = ({
    input,
    meta,
    helpMessage,
    optional,
    children,
    ...props
  }) => {
    const getIsShowError = () => {
      if (meta.error) {
        return (meta.visited && !meta.active) || meta.submitFailed;
      } else if (meta.submitError) {
        return meta.submitFailed && !meta.dirtySinceLastSubmit;
      }

      return false;
    };

    const getErrorMessage = () => {
      return meta.error || meta.submitError;
    };

    const getPlaceholder = () => {
      const { label, placeholder } = props;
      return placeholder || label;
    };

    const getLabelProps = () => {
      const { label } = props;
      const { name } = input;

      return {
        optional,
        htmlFor: `field-${name}`,
        isError: getIsShowError(),
        isFocus: meta.active,
        children: label
      };
    };

    const getErrorMessageProps = () => {
      return {
        isShow: getIsShowError(),
        children: getErrorMessage()
      };
    };

    const getHelpMessageProps = () => {
      return {
        isShow: !getIsShowError(),
        children: helpMessage
      };
    };

    const getInputProps = () => {
      const { name } = input;

      return {
        ...input,
        ...props,
        placeholder: getPlaceholder(),
        id: `field-${name}`,
        isError: getIsShowError(),
        isFocus: meta.active
      };
    };

    const getFieldProps = () => ({
      getLabelProps,
      getErrorMessageProps,
      getHelpMessageProps,
      getInputProps,
      ...props
    });

    return <Field {...getFieldProps()} />;
  };

  const FieldDecoratorPropTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    helpMessage: PropTypes.string,
    optional: PropTypes.bool,
    children: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string
  };

  FieldDecorator.propTypes = FieldDecoratorPropTypes;

  return FieldDecorator;
};

export default makeFieldDecorator;
