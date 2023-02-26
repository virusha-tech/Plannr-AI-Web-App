import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header3";

export const Layout = (props) => {
  return (
    <>
      <Header />
      <MainContainer>{props.children}</MainContainer>
      <Footer />
    </>
  );
};

const MainContainer = styled.div`
  padding: 10px 120px;
  background: #fafafa;
  min-height: 83vh;

  @media only screen and (max-width: 1200px) {
    padding: 10px 40px;
    font-size: 12px;
  }
`;
