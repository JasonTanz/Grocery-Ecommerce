import React from 'react';
import { getIn } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { formField as Props } from '../../../types/fieldTypes';
const GETextFilledForm = ({
  field,
  form,
  label,
  customLabel,
  type = 'text',
  ...props
}: Props) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <FormControl w="100%" id="email" isInvalid={errorText ? true : false}>
      <FormLabel>{customLabel || label}</FormLabel>
      <Input
        w="100%"
        size="md"
        paddingY="15px"
        paddingLeft="15px"
        type={type}
        {...field}
        {...props}
      />
      <FormErrorMessage fontSize="sm">{errorText}</FormErrorMessage>
    </FormControl>
  );
};

GETextFilledForm.propTypes = {
  field: PropTypes.any,
  form: PropTypes.any,
  props: PropTypes.any,
  label: PropTypes.string,
};

export default GETextFilledForm;
