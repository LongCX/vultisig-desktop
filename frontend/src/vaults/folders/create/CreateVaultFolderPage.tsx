import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../lib/ui/buttons/Button';
import { getFormProps } from '../../../lib/ui/form/utils/getFormProps';
import { TextInput } from '../../../lib/ui/inputs/TextInput';
import { VStack } from '../../../lib/ui/layout/Stack';
import { getLastItemOrder } from '../../../lib/utils/order/getLastItemOrder';
import { FlowPageHeader } from '../../../ui/flow/FlowPageHeader';
import { PageContent } from '../../../ui/page/PageContent';
import { useCreateVaultFolderMutation } from '../mutations/useCreateVaultFolderMutation';
import { useVaultFolders } from '../queries/useVaultFoldersQuery';

export const CreateVaultFolderPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [name, setName] = useState('');

  const folders = useVaultFolders();
  const names = useMemo(() => folders.map(({ name }) => name), [folders]);

  const isDisabled = useMemo(() => {
    if (!name) {
      return t('folder_name_required');
    }

    if (names.includes(name)) {
      return t('folder_already_exists');
    }
  }, [name, t, names]);

  const { mutate, isPending } = useCreateVaultFolderMutation();

  return (
    <>
      <FlowPageHeader title={t('create_folder')} />
      <PageContent
        as="form"
        {...getFormProps({
          isDisabled,
          isPending,
          onSubmit: () => {
            mutate(
              {
                name,
                order: getLastItemOrder(folders.map(({ order }) => order)),
              },
              {
                onSuccess: () => {
                  navigate(-1);
                },
              }
            );
          },
        })}
      >
        <VStack flexGrow>
          <TextInput
            placeholder={t('enter_folder_name')}
            label={t('folder_name')}
            value={name}
            onValueChange={setName}
          />
        </VStack>
        <Button isLoading={isPending} type="submit" isDisabled={isDisabled}>
          {t('create')}
        </Button>
      </PageContent>
    </>
  );
};