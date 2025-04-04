import { Coin } from '@core/chain/coin/Coin'
import { isFeeCoin } from '@core/chain/coin/utils/isFeeCoin'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { textInputBackground, textInputFrame } from '@lib/ui/css/textInput'
import { ChevronRightIcon } from '@lib/ui/icons/ChevronRightIcon'
import { HStack, hStack } from '@lib/ui/layout/Stack'
import { ChildrenProp, ValueProp } from '@lib/ui/props'
import { Text, text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps } from 'react'
import styled from 'styled-components'

import { ChainCoinIcon } from '../../../chain/ui/ChainCoinIcon'
import { getChainEntityIconSrc } from '../../../chain/utils/getChainEntityIconSrc'
import { IconWrapper } from '../../../pages/edItVault/EditVaultPage.styles'
import { shouldDisplayChainLogo } from '../../../vault/chain/utils'
import { getCoinLogoSrc } from '../../logo/getCoinLogoSrc'

const Container = styled(UnstyledButton)`
  ${textInputFrame};
  ${textInputBackground};

  ${text({
    color: 'contrast',
    size: 16,
    weight: 700,
  })}

  ${hStack({
    alignItems: 'center',
    justifyContent: 'space-between',
  })}

  &:hover {
    background: ${getColor('foregroundExtra')};
  }
`

type CoinInputContainerProps = ValueProp<
  Pick<Coin, 'id' | 'chain' | 'logo' | 'ticker'>
> &
  Partial<ChildrenProp> &
  Omit<ComponentProps<typeof Container>, 'value'>

export const CoinInputContainer = ({
  children,
  value,
  ...rest
}: CoinInputContainerProps) => {
  const { ticker, chain, id } = value

  return (
    <Container {...rest}>
      <HStack alignItems="center" gap={8}>
        <ChainCoinIcon
          coinSrc={getCoinLogoSrc(value.logo)}
          chainSrc={
            shouldDisplayChainLogo({
              ticker,
              chain,
              isNative: isFeeCoin({ id, chain }),
            })
              ? getChainEntityIconSrc(chain)
              : undefined
          }
          style={{ fontSize: 32 }}
        />
        <Text weight="700" family="mono" size={16} color="contrast">
          {value.ticker}
        </Text>
      </HStack>
      <HStack alignItems="center" gap={8}>
        {children}
        <IconWrapper style={{ fontSize: 20 }}>
          <ChevronRightIcon />
        </IconWrapper>
      </HStack>
    </Container>
  )
}
