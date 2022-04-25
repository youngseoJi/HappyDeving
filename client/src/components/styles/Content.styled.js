import styled from "styled-components";

const Content = styled.div`
  background-color: ${(props) => props.theme.contents.bg};
  margin-bottom: ${(props) => props.theme.contents.marginBottom};
  border-radius: ${(props) => props.theme.contents.borderRadius};
  box-shadow: ${(props) => props.theme.contents.boxShadow};
`;

export default Content;