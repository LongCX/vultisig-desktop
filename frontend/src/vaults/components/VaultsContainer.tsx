import { useTranslation } from 'react-i18next';

import { TitledList } from '../../lib/ui/list/TitledList';
import { TitledComponentProps } from '../../lib/ui/props';

export const VaultsContainer: React.FC<
  Omit<TitledComponentProps, 'title'>
> = props => {
  const { t } = useTranslation();

  return <TitledList title={t('vaults')} {...props} />;
};