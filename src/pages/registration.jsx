import React from "react";
import {Container, Row, Col, Button, Form, Alert} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { fetchRegister, selectIsAuth } from "../redux/slices/user.js";
import {FormInput} from '../components/index.js'

const Registration = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [phone, setPhone] = React.useState("+7");

  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      address: "",
      password: "",
      confirmPass: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    if (values.password === values.confirmPass) {
      const data = await dispatch(
        fetchRegister({
          fullname: values.fullname,
          email: values.email,
          phone: phone && phone,
          address: values.address,
          password: values.password,
        })
      )

      setErrorMessage(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
    } 
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <Container>
      <Row>
        <Col className="sign-card d-flex row  align-items-center ">
          <div>
            <h2 >Регистрация</h2>
            <hr />
            {errorMessage && errorMessage && (
              <Alert
                variant={errorMessage && errorMessage ? "danger" : "primary"}
                style={
                  errorMessage && errorMessage
                    ? { borderColor: "red" }
                    : { borderRadius: "6px" }
                }
              >
                {
                  <div className="text-center" style={{ margin: "-12px" }}>
                    {errorMessage && <span>{errorMessage}</span>}
                  </div>
                }
              </Alert>
            )}


              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Row>
                  <h5>Жеке ақпарат</h5>

                  <Col lg={12} xs={12}>
                    <FormInput 
                    errors={errors && errors.fullname}
                    content={'Аты-жөніңіз'}
                    attributes={{...register("fullname", {
                      required: "Аты-жөніңіз енгізіңіз",
                      minLength: {
                        value: 10,
                        message:
                          "Аты-жөніңіз 10 символдан кем болмауы керек",
                      }
                    })}} />
                  </Col>
                </Row>

                <Row>
                  <h5>Байланыс ақпараты</h5>

                  <Col lg={12} xs={12}>
                  <FormInput 
                      errors={errors && errors.email}
                      content={'Пошта'}
                      attributes={{...register("email", {
                        required: "Поштаңызды енгізіңіз",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Дұрыс форматты енгізіңіз",
                        },
                      })}}
                       />
                  </Col>

                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {!phone ? (
                        <Form.Label style={{ color: "red" }}>
                          Телефонды енгізіңіз
                        </Form.Label>
                      ) : (
                        <Form.Label>Телефон</Form.Label>
                      )}
                      <PhoneInput
                        style={
                          !phone
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "" }
                        }
                        className="form-control phone"
                        defaultCountry="KZ"
                        value={phone}
                        onChange={setPhone}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6} xs={12}>
                    <FormInput 
                    errors={errors && errors.address}
                    content={'Мекенжай'}
                    attributes={{...register("address", {
                      required: "Мекенжайды енгізіңіз",
                      minLength: {
                        value: 3,
                        message: "Мекенжай атауы тым қысқа",
                      },
                    })}}
                    type={'text'}
                     />
                  </Col>

                  <Col lg={6} xs={12}>
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
                    })}}
                    type={'password'}/>
                  </Col>

                  <Col lg={6} xs={12}>
                    <FormInput 
                    errors={errors && errors.confirmPass}
                    content={'Құпия сөзді қайталаңыз'}
                    attributes={{...register("confirmPass", {
                      required: "Құпия сөзді қайта енгізіңіз",
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "Құпия сөздер сәйкес келмейді";
                        }
                      },
                    })}}
                    type={'password'}/>

                  </Col>
                </Row>

                <Col className="col-12 d-flex column justify-content-end align-items-center">
                  <Link to="/login">
                    <Button variant="link" >
                      Кіру парақшасы
                    </Button>
                  </Link>

                  <Button
                    variant="primary"
                    type="submit">
                    Тіркелу
                  </Button>
                </Col>
              </Form>
  
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
