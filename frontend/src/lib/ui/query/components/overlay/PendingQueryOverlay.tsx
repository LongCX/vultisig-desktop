import { BodyPortal } from '../../../dom/BodyPortal';
import { VStack } from '../../../layout/Stack';
import { Spinner } from '../../../loaders/Spinner';
import { Backdrop } from '../../../modal/Backdrop';
import { ClosableComponentProps, TitledComponentProps } from '../../../props';
import { QueryOverlayContent } from './QueryOverlayContent';

export const PendingQueryOverlay: React.FC<
  TitledComponentProps & ClosableComponentProps
> = ({ title, onClose }) => (
  <BodyPortal>
    <Backdrop onClose={onClose}>
      <QueryOverlayContent>
        <VStack alignItems="center" gap={8}>
          <Spinner />
          {title}
        </VStack>
      </QueryOverlayContent>
    </Backdrop>
  </BodyPortal>
);