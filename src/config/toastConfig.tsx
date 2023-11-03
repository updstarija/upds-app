import { Toast } from '@/ui';
import { BaseToastProps } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: BaseToastProps) => <Toast type="success" {...props} />,
  error: (props: BaseToastProps) => <Toast type="error" {...props} />,
  warning: (props: BaseToastProps) => <Toast type="warning" {...props} />,
  info: (props: BaseToastProps) => <Toast type="info" {...props} />,
};
