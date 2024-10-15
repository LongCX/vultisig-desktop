import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Match } from '../../../lib/ui/base/Match';
import { CurrentServiceNameProvider } from '../../setup/state/currentServiceName';
import { JoinKeygenSessionStep } from '../shared/JoinKeygenSessionStep';
import { CurrentSessionIdProvider } from '../shared/state/currentSessionId';
import { useCurrentJoinKeygenMsg } from '../state/currentJoinKeygenMsg';
import { CurrentLocalPartyIdProvider } from '../state/currentLocalPartyId';
import { CurrentServerTypeProvider } from '../state/currentServerType';
import { generateLocalPartyId } from '../utils/localPartyId';
import { JoinKeygenProcess } from './JoinKeygenProcess';
import { KeygenServerUrlProvider } from './KeygenServerUrlProvider';

const keygenSteps = ['session', 'keygen'] as const;
type KeygenStep = (typeof keygenSteps)[number];

export const JoinKeygenPage = () => {
  const localPartyId = useMemo(generateLocalPartyId, []);

  const keygenMsg = useCurrentJoinKeygenMsg();

  const { sessionId, useVultisigRelay, serviceName } = keygenMsg;

  const serverType = useVultisigRelay ? 'relay' : 'local';

  const [step, setStep] = useState<KeygenStep>(keygenSteps[0]);

  const toNextStep = useCallback(() => {
    setStep(prev => keygenSteps[keygenSteps.indexOf(prev) + 1]);
  }, []);

  const { t } = useTranslation();

  return (
    <CurrentLocalPartyIdProvider value={localPartyId}>
      <CurrentServiceNameProvider value={serviceName}>
        <CurrentServerTypeProvider initialValue={serverType}>
          <CurrentSessionIdProvider value={sessionId}>
            <KeygenServerUrlProvider>
              <Match
                value={step}
                session={() => (
                  <JoinKeygenSessionStep
                    title={t('join_keygen')}
                    onForward={toNextStep}
                  />
                )}
                keygen={() => <JoinKeygenProcess />}
              />
            </KeygenServerUrlProvider>
          </CurrentSessionIdProvider>
        </CurrentServerTypeProvider>
      </CurrentServiceNameProvider>
    </CurrentLocalPartyIdProvider>
  );
};