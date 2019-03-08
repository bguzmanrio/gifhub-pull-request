import { css } from '@emotion/core';
import styled from '@emotion/styled';

const baseTitle = css`
  color: white;
  font-weight: 400;
  margin: 0px 0px 8px 0px;
  text-align: center;
`;

export const MainTitle = styled('h1')`${baseTitle}`;
export const SecondaryTitle = styled('h2')`${baseTitle}`;

export default {
  MainTitle,
  SecondaryTitle
};