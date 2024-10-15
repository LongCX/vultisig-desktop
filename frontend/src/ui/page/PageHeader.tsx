import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';

import { centerContent } from '../../lib/ui/css/centerContent';
import { horizontalPadding } from '../../lib/ui/css/horizontalPadding';
import { TakeWholeSpace } from '../../lib/ui/css/takeWholeSpace';
import { getColor } from '../../lib/ui/theme/getters';
import { pageConfig } from './config';

const Container = styled.header<{ hasBorder?: boolean }>`
  ${centerContent};
  width: 100%;
  height: 60px;
  ${horizontalPadding(pageConfig.horizontalPadding)};
  border-bottom: ${({ hasBorder, theme }) =>
    hasBorder ? `1px solid ${getColor('mistExtra')({ theme })}` : 'none'};
`;

const Content = styled(TakeWholeSpace)`
  position: relative;
  ${centerContent};
`;

type PageHeaderProps = Omit<ComponentProps<typeof Container>, 'title'> & {
  title?: ReactNode;
  primaryControls?: ReactNode;
  secondaryControls?: ReactNode;
  hasBorder?: boolean;
};

const ControlsContainer = styled.div`
  position: absolute;
`;

export const PageHeader = ({
  title,
  primaryControls,
  secondaryControls,
  hasBorder = false,
  ...rest
}: PageHeaderProps) => {
  return (
    <Container hasBorder={hasBorder} {...rest}>
      <Content>
        <ControlsContainer style={{ left: 0 }}>
          {primaryControls}
        </ControlsContainer>
        {title}
        <ControlsContainer style={{ right: 0 }}>
          {secondaryControls}
        </ControlsContainer>
      </Content>
    </Container>
  );
};