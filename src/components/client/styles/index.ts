import { styled } from 'styled-components';
import { NavLink } from "react-router-dom";

const Content = styled.div<{$position:string}>`
width: 100%;
position: relative;
top: ${props => props.$position };
`
const ContentDialog = styled.div`
  width: 100%;
  height: 100%;

  .header-contentDialog{
      width: 100%;
      background-color: #23272f;
  }
  .body-contentDialog{
      background-color: #F6F1F1;
  }
`

const StyledLink = styled(NavLink)<{$margin:string}>`

display: inline-flex;
align-items: center;
justify-content: center;
position: relative;
box-sizing: border-box;
-webkit-tap-highlight-color: transparent;
background-color: transparent;
outline: 0;
border: 0;
margin: 0;
border-radius: 0;
padding: 0;
cursor: pointer;
user-select: none;
vertical-align: middle;
text-decoration: none;
color: inherit;
font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.875rem;
line-height: 1.75;
letter-spacing: 0.02857em;
text-transform: uppercase;
min-width: 64px;
padding: 6px 16px;
border-radius: 4px;
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
color: #fff;
background-color: ${props=> props.color};
margin: ${props => props.$margin};
box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
`

export { Content, ContentDialog,StyledLink  }