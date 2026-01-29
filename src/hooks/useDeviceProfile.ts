import { Platform, useWindowDimensions } from 'react-native';

const DESKTOP_BREAKPOINT = 1024;

export const useDeviceProfile = () => {
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' || width >= DESKTOP_BREAKPOINT;
  return { isDesktop };
};
