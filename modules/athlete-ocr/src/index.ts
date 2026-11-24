import { Platform } from 'react-native';
import { requireNativeModule } from 'expo-modules-core';
interface NativeOcr { read(uri: string): Promise<string> }
export async function recognizeScanFile(uri: string): Promise<string> {
  if (Platform.OS !== 'ios') throw new Error('Automatische OCR ist momentan nur auf iOS verfügbar. Werte können manuell eingetragen werden.');
  const native=requireNativeModule<NativeOcr>('AthleteOcr');
  return native.read(uri);
}
