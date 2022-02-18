import styled from "styled-components";

export const SideDivForAllComponents = styled.div`
._side_component_{
    margin:auto;
    border-radius:10px;
    padding:20px;
    margin-top:10px;
    background: white;
    width:85%;
    margin-left:100px;
    // margin-right:100px;
    box-shadow: 1px 4px 9px 7px #888888;
}
.div_photo_and_trending{
    display: flex;
    flex-wrap: wrap;
}
.div_photo_and_trending > div {
    background-color: #f1f1f1;
    margin: 10px;
    // text-align: center;
  }
  ._mobile_view{
      width:45%;
  }
  @media only screen and (max-width: 935px) {
    ._mobile_view{
        width:100%;
      }
  }
`;

