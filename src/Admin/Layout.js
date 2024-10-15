import styled from "styled-components";
import Footer from "../Footer";
import Header from "./Header";

export const Layout = ({ isFreeVersion, children, hideFooter = false }) => {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
      {hideFooter ? null : <Footer />}
    </>
  );
};

const MainContainer = styled.div`
  padding: 10px 80px;
  background: #fafafa;
  min-height: 83vh;
  margin-top: 8vh;

  @media only screen and (max-width: 899px) {
    padding: 16px 4%;
    font-size: 12px;
  }
`;