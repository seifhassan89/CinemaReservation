import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import Logo from '../../../assets/Images/cima.png';
import messages from '../../../assets/locales/messages';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import Input from '../../../components/Input';
import { loginRequest } from '../../../store/Auth/slice';
import { toggleLocale } from '../../../store/Locale/slice';
import './Login.scss';

export default function Login() {
  const dispatch = useDispatch();
  const { locale } = useSelector((state) => state.locale);
  const { auth, shared } = messages[locale];

  const navigate = useNavigate();

  const { values, setFieldValue, handleSubmit, touched, errors, dirty, isValid, handleBlur, validateForm } = useFormik({
    initialValues: {
      email: '',
      rememberMe: false,
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      email: Yup.string().email(auth?.validations.emailValid).required(auth?.validations.emailReq),
    }),
    onSubmit: ({ email, rememberMe }) => {
      dispatch(
        loginRequest({
          data: {
            email,
            rememberMe,
          },
          navigate,
        })
      );
    },
  });

  useEffect(() => {
    validateForm();
  }, [auth, validateForm]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
      className={'login-container'}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={Logo} alt="logo" width={'65%'} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'secondary.main',
          borderRadius: '20px',
          p: '3rem',
          width: {
            xs: '100%',
            sm: '80%',
            md: '40%',
          },
          minWidth: {
            md: '30rem',
          },
          maxWidth: '30rem',
        }}>
        <Typography component="h1" variant="h4">
          {auth?.login}
        </Typography>
        <Typography component="p" textAlign={'center'} marginTop={1}>
          {auth?.loginHint}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <Input
            required
            fullWidth
            id={'email'}
            label={auth?.email}
            name={'email'}
            autoComplete={'email'}
            type={'text'}
            onChange={(value) => {
              setFieldValue('email', value);
            }}
            sxWrapper={{ my: 2 }}
            value={values['email']}
            isInputHasErr={!!(touched['email'] && errors['email'])}
            errMsg={errors['email']}
            onBlur={handleBlur}
            placeholder={auth?.emailPlaceholder}
          />
          <Checkbox
            label={auth?.rememberMe}
            name="rememberMe"
            checked={values['rememberMe']}
            onChange={(value) => {
              setFieldValue('rememberMe', value);
            }}
            id={'remember'}
          />
          <Button type="submit" fullWidth label={auth?.login} sx={{ mt: 3, mb: 2 }} disabled={!dirty || !isValid} />
        </Box>
      </Box>
      <Box>
        <Typography
          className={'pointer'}
          onClick={() => {
            dispatch(toggleLocale());
          }}
          data-testid={'toggle-locale'}>
          {shared?.toggleLocale}
        </Typography>
      </Box>
    </Box>
  );
}
