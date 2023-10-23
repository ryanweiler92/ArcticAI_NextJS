'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Button,
  Text,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login, register as registerRequest } from '@handlers/authHandlers';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<FormData>();
  const password = watch('password', ''); // Watch the password field

  const router = useRouter();

  const [loginOrRegister, setLoginOrRegister] = useState('register');
  const setRegister = () => setLoginOrRegister('register');
  const setLogin = () => setLoginOrRegister('login');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    reset();
    if (loginError) setLoginError(false);
  }, [loginOrRegister]);

  const handleRegister = async (data: FormData) => {
    const { email, firstName, lastName, password } = data;
    if (!isValid) {
      console.log('Form is not valid');
      setLoading(false);
      return;
    }

    const newUser = { email, firstName, lastName, password };

    try {
      const response = await registerRequest(newUser);
      if (response.success) {
        router.push('/mapping');
      } else {
        setLoginError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Register error:', error);
      setLoginError(true);
      setLoading(false);
    }
  };

  const handleLogin = async (data: FormData) => {
    const { email, password } = data;
    try {
      const response = await login({ email: email, password: password });
      if (response.success) {
        router.push('/mapping');
      } else {
        setLoginError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(true);
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    if (loginOrRegister === 'register') {
      handleRegister(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width="600px" maxW={'xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Link href="/">
            <Image
              src={'/logo.png'}
              height={'200'}
              width={'200'}
              alt={'Arctic AI Logo'}
            />
          </Link>
          {loginOrRegister === 'register' ? (
            <>
              <Text fontSize={'lg'} color="tan.200">
                Sign up for an account
              </Text>
            </>
          ) : (
            <>
              <Text fontSize={'lg'} color="tan.200">
                Log into your account
              </Text>
            </>
          )}
        </Stack>
        <Box rounded={'lg'} bg="brand.600" boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email field */}
              {/** @ts-ignore */}
              <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor="email" color="tan.200" textAlign="center">
                  Email address
                </FormLabel>
                <Input
                  type="email"
                  id="email"
                  color="tan.200"
                  textAlign="center"
                  {...register('email', {
                    required: 'This is required',
                  })}
                  isDisabled={loading}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              {/* First name field */}
              {/** @ts-ignore */}
              {loginOrRegister === 'register' && (
                <FormControl isInvalid={!!errors.firstName}>
                  <FormLabel
                    htmlFor="firstName"
                    color="tan.200"
                    textAlign="center"
                    mt={2}
                  >
                    First Name
                  </FormLabel>
                  <Input
                    id="firstName"
                    color="tan.200"
                    textAlign="center"
                    {...register('firstName', {
                      required: 'This is required',
                    })}
                    isDisabled={loading}
                  />
                  <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                  </FormErrorMessage>
                </FormControl>
              )}

              {/* Last name field */}
              {/** @ts-ignore */}
              {loginOrRegister === 'register' && (
                <FormControl isInvalid={!!errors.lastName}>
                  <FormLabel
                    htmlFor="lastName"
                    color="tan.200"
                    textAlign="center"
                    mt={2}
                  >
                    Last Name
                  </FormLabel>
                  <Input
                    id="lastName"
                    color="tan.200"
                    textAlign="center"
                    {...register('lastName', {
                      required: 'This is required',
                    })}
                    isDisabled={loading}
                  />
                  <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                  </FormErrorMessage>
                </FormControl>
              )}

              {/* Password field */}
              {/** @ts-ignore */}
              <FormControl isInvalid={errors.password}>
                <FormLabel
                  htmlFor="password"
                  color="tan.200"
                  textAlign="center"
                  mt={2}
                >
                  Password
                </FormLabel>
                <Input
                  type="password"
                  id="password"
                  color="tan.200"
                  textAlign="center"
                  {...register('password', {
                    required: 'A password is required',
                    ...(loginOrRegister === 'register'
                      ? {
                          minLength: {
                            value: 8,
                            message:
                              'Password should have at least 8 characters',
                          },
                        }
                      : {}),
                  })}
                  isDisabled={loading}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              {/* Confirm password field */}
              {/** @ts-ignore */}
              {loginOrRegister === 'register' && (
                <FormControl isInvalid={!!errors.confirmPassword}>
                  <FormLabel
                    htmlFor="confirmPassword"
                    color="tan.200"
                    textAlign="center"
                    mt={2}
                  >
                    Confirm Password
                  </FormLabel>
                  <Input
                    type="password"
                    id="confirmPassword"
                    color="tan.200"
                    textAlign="center"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'The passwords do not match',
                    })}
                    isDisabled={loading}
                  />
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
                </FormControl>
              )}

              {loginError && (
                <Text color="red.500" textAlign="center">
                  {loginOrRegister === 'login'
                    ? 'Incorrect credentials'
                    : 'An error occurred during registration'}
                </Text>
              )}

              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  variant="primary"
                  bg={'tan.200'}
                  color={'black'}
                  _hover={{
                    bg: 'white',
                  }}
                  isDisabled={loading}
                >
                  {loading ? (
                    <Spinner mr={2} />
                  ) : loginOrRegister === 'register' ? (
                    <Text>Sign up</Text>
                  ) : (
                    <Text>Login</Text>
                  )}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} color="tan.200">
                  {loginOrRegister === 'register' ? (
                    <>
                      <span>Already a user?</span>
                      <Button
                        onClick={setLogin}
                        bg="tan.200"
                        color="brand.800"
                        fontWeight={'600'}
                        ml="2"
                      >
                        Login
                      </Button>
                    </>
                  ) : (
                    <>
                      <span>Need an account?</span>
                      <Button
                        onClick={setRegister}
                        bg="tan.200"
                        color="brand.800"
                        fontWeight={'600'}
                        ml="2"
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
