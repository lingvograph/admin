import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { useSaga } from 'hooks';
import { login } from 'saga';

const useField = (name, defval = '') => {
  const [value, setValue] = useState(defval);

  const onChange = e => {
    setValue(e.target.value);
  };

  return {
    name,
    value,
    onChange,
  };
};

const Login = () => {
  const username = useField('username');
  const password = useField('password');
  const [error, setError] = useState('');
  const onError = err => {
    const msg = typeof err === 'string' ? err : err.error || err.error_message || err.message;
    setError(msg);
  };
  const onLogin = useSaga(login, { args: [username.value, password.value, onError] });
  const onSubmit = e => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username.value}
                        onChange={username.onChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password.value}
                        onChange={password.onChange}
                      />
                    </InputGroup>
                    {error ? (
                      <Row>
                        <Col xs="12">
                          <div className="error">{error}</div>
                        </Col>
                      </Row>
                    ) : null}
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={onLogin}>
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lingvo Graph helps to learn your second language</p>
                    <Link to="/register">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
