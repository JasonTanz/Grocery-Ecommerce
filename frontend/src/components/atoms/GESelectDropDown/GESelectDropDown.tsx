import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Select } from 'chakra-react-select';
import { getIn } from 'formik';
import { formField as Props } from '../../../types/fieldTypes';
import { HStack } from '@chakra-ui/react';
const GESelectDropDown = ({
  field,
  form,
  label,
  customLabel,
  flex = false,
  customclass,

  ...props
}: Props) => {
  const errorText: string =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  const handleSelect = (e: any) => {
    form.setFieldValue(field.name, e.value);
  };

  return (
    <>
      <FormControl isInvalid={errorText ? true : false}>
        <HStack d={flex ? 'flex' : 'block'} w="30%">
          <FormLabel>{customLabel || label}</FormLabel>
          <Select
            className={customclass ? customclass : 'select-dropdown'}
            {...props}
            isOptionSelected={(option: any) => {
              return option.value === field.value;
            }}
            isSearchable={false}
            onChange={(e: any) => handleSelect(e)}
            placeholder={form.values.qty}
          />
          <FormErrorMessage fontSize="sm">{errorText}</FormErrorMessage>
        </HStack>
      </FormControl>
    </>
  );
};

GESelectDropDown.propTypes = {
  props: PropTypes.node,
  customclass: PropTypes.string,
  value: PropTypes.string,
};
export default React.memo(GESelectDropDown);
