import type { InferType } from 'yup';
import { number, object, string } from 'yup';

export type DeliverySchema = InferType<ReturnType<typeof deliverySchema>>;

export const EMAIL_REGX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\\d{1,3}\.\\d{1,3}\.\\d{1,3}\.\\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const REQUIRED_MSG = 'This field is required';
const INVALID_EMAIL_MSG = 'Please input a valid email address';
const INVALID_PHONE_MSG = 'Please input a valid phone number';

export const deliverySchema = () => {
  const schema = object({
    name: string().required(REQUIRED_MSG),
    surname: string().required(REQUIRED_MSG),
    phoneNumber: number().required(REQUIRED_MSG).typeError(INVALID_PHONE_MSG),
    email: string()
      .required(REQUIRED_MSG)
      .matches(EMAIL_REGX, INVALID_EMAIL_MSG),
    dateOfBirth: string().required(REQUIRED_MSG),
    address: string().required(REQUIRED_MSG),
    city: string().required(REQUIRED_MSG),
    state: string().required(REQUIRED_MSG),
    zipcode: string().required(REQUIRED_MSG),
  });

  return schema;
};
