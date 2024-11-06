import { ReactNode } from 'react';
import styled from 'styled-components';

import { match } from '../../../utils/match';
import { interactive } from '../../css/interactive';
import { HStack } from '../../layout/Stack';
import { InputProps, UIComponentProps } from '../../props';
import { Text } from '../../text';
import { getColor } from '../../theme/getters';
import { InvisibleHTMLCheckbox } from '../checkbox/InvisibleHTMLCheckbox';
import { SwitchSize } from './config';
import { SwitchContainer } from './SwitchContainer';
import { SwitchControl } from './SwitchControl';

type SwitchProps = UIComponentProps &
  InputProps<boolean> & {
    size?: SwitchSize;
    label?: ReactNode;
  };

const Wrapper = styled(HStack)`
  ${interactive};

  color: ${getColor('text')};

  &:hover {
    color: ${getColor('contrast')};
  }

  &:hover ${SwitchControl} {
    transform: scale(1.08);
  }
`;

export const Switch = ({
  value,
  onChange,
  label,
  size = 'm',
  ...rest
}: SwitchProps) => {
  return (
    <Wrapper as="label" alignItems="center" gap={8} {...rest}>
      <SwitchContainer size={size} isActive={value}>
        <SwitchControl isActive={value} size={size} />
        <InvisibleHTMLCheckbox value={value} onChange={onChange} />
      </SwitchContainer>
      {label && (
        <Text nowrap size={match(size, { m: () => 16, s: () => 14 })} as="div">
          {label}
        </Text>
      )}
    </Wrapper>
  );
};