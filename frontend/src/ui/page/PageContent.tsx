import styled from 'styled-components';

import { horizontalPadding } from '../../lib/ui/css/horizontalPadding';
import { verticalPadding } from '../../lib/ui/css/verticalPadding';
import { VStack } from '../../lib/ui/layout/Stack';
import { pageConfig } from './config';

export const PageContent = styled(VStack)`
  ${horizontalPadding(pageConfig.horizontalPadding)};
  ${verticalPadding(pageConfig.verticalPadding)};
  flex: 1;
`;