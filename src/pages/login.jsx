import React from "react"
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import "react-phone-number-input/style.css"

import { fetchLogin, selectIsAuth } from "../redux/slices/user.js"
import { FormInput } from '../components/index.js'

const Login = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: ""
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
   
      const data = await dispatch(
        fetchLogin({
          login: values.login,
          password: values.password,
        })
      );

      setErrorMessage(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <Container >
      <Row>
        <Col className="sign-card d-flex row align-items-center ">
          <div>
            <h4>Login</h4>

            {errorMessage && errorMessage && (
              <Alert
                variant={errorMessage && errorMessage ? "danger" : "primary"}
                style={
                  errorMessage && errorMessage
                    ? { borderColor: "red" }
                    : { borderRadius: "6px" }}>
                {
                  <div className="text-center" style={{ margin: "-12px" }}>
                    {errorMessage && <span>{errorMessage}</span>}
                  </div>
                }
              </Alert>)}

              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Row>

                  <Col lg={12} xs={12}>
                    <FormInput 
                    errors={errors && errors.login} 
                    content={'Пошта немесе телефон'} 
                    attributes={{...register("login", {required: "Поштаңызды немесе телефонды енгізіңіз"})}}
                    type={'text'} />
                  </Col>

                  <Col lg={12} xs={12}>
                  <FormInput 
                  errors={errors && errors.password} 
                  content={'Құпия сөз'} 
                  attributes={{...register("password", {
                    required: "Құпия сөзді енгізіңіз",
                    minLength: {
                      value: 6,
                      message:
                        "Құпия сөз 6 және 16 символ арасында болуы керек",
                    },
                    maxLength: {
                      value: 16,
                      message:
                        "Атыңыз 6 және 16 символ арасында болуы керек",
                    },
                    })}}  type={'password'} />
                  
                  </Col>
                </Row>

                <Col className="col-12 d-flex column justify-content-end align-items-center">
                  <Link to="/registration">
                    <Button variant="link">
                      Registration
                    </Button>
                  </Link>

                  <Button
                     disabled={!isValid}
                    variant="primary"
                    className="btn-signup"
                    type="submit"
                  >
                    Signin
                  </Button>
                </Col>
              </Form>

          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
