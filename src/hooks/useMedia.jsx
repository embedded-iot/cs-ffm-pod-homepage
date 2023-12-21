import UAParser from "ua-parser-js";
import {headers} from "next/headers";

export default function useMedia() {
  const parser = new UAParser();
  const headersList = headers()
  const userAgent = headersList.get('user-agent')
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || 'desktop';
  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  }
}