import React from "react";
import { Tab, Container, Row, Col, Button, Card} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import { fetchAuthMe, selectIsAuth } from "../redux/slices/user.js";

import axios from "../axios.js";
import {ContentSpinner} from '../components/index.js'
import alt from '../images/alt.png'

const Profile = () => {
  const inputFileRef = React.useRef(null);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const isAuth = useSelector(selectIsAuth)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/avatar", formData);
      alert(JSON.stringify(data))
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  console.log(isAuth)

    return(!userData? 

        <ContentSpinner/>
    :
    <Container>
      <br />
      <Container>
        <Tab.Container defaultActiveKey={"rating"}>
          
          <h4>Profile</h4>
          <Row>
            <Col lg={4} xs={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <img
                      onClick={() => inputFileRef.current.click()}
                      src={ userData && userData.avatar  ? `http://localhost:5000${ userData && userData.avatar } ` : alt
                      }
                       alt="Мына жерде сурет туру керек"/>
                    <input
                      type="file"
                      onChange={handleChangeFile}
                      hidden
                      ref={inputFileRef}
                    />
                    <h5 className="text-center">{userData && userData.fullname}</h5>
                    <Button
                      variant="link"
                      href="/edit-profile">
                      Профильді өңдеу
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
            <h6>Телефон: {userData.phone}</h6>
            <h6>Адрес: {userData.address}</h6>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Container>
  );
};

export default Profile;
