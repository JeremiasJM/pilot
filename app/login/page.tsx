import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import FormLogin from "./LoginForm";

const Login = () => {
  return (
    <Container>
      <FormWrap>
        <FormLogin />
      </FormWrap>
    </Container>
  );
};
export default Login;
