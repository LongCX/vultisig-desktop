import BackupIcon from '../../lib/ui/icons/BackupIcon';
import { InfoIcon } from '../../lib/ui/icons/InfoIcon';
import ReshareIcon from '../../lib/ui/icons/ReshareIcon';
import SquareAndPencilIcon from '../../lib/ui/icons/SquareAndPencilIcon';
import TrashIcon from '../../lib/ui/icons/TrashIcon';
import { TextColor } from '../../lib/ui/text';
import { makeAppPath } from '../../navigation';

type SettingItem = {
  titleKey: string;
  subtitleKey: string;
  icon: React.ElementType;
  path: string;
  textColor?: TextColor;
};

export const editVaultSettingsItems: SettingItem[] = [
  {
    titleKey: 'vault_settings_edit_vault_details_title',
    subtitleKey: 'vault_setting_edit_vault_details_subtitle',
    icon: InfoIcon,
    path: makeAppPath('vaultDetails'),
  },
  {
    titleKey: 'vault_setting_edit_vault_backup_title',
    subtitleKey: 'vault_setting_edit_vault_backup_subtitle',
    icon: BackupIcon,
    path: makeAppPath('vaultBackup'),
  },
  {
    titleKey: 'vault_setting_edit_vault_rename_title',
    subtitleKey: 'vault_setting_edit_vault_rename_subtitle',
    icon: SquareAndPencilIcon,
    path: makeAppPath('vaultRename'),
  },
  {
    titleKey: 'vault_setting_edit_vault_reshare_title',
    subtitleKey: 'vault_setting_edit_vault_reshare_subtitle',
    icon: ReshareIcon,
    path: makeAppPath('reshareVault'),
  },
  {
    titleKey: 'vault_setting_edit_vault_delete_title',
    subtitleKey: 'vault_setting_edit_vault_delete_subtitle',
    icon: TrashIcon,
    path: makeAppPath('vaultDelete'),
    textColor: 'danger',
  },
];
