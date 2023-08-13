import * as yup from 'yup';

export const messageValidationSchema = yup.object().shape({
  content: yup.string().required(),
  chat_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
