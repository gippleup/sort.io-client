import Analytics from 'appcenter-analytics';

const trackWithTag = (tag: string) => {
  return (...params: Parameters<typeof Analytics.trackEvent>) => {
    const [eventName, properties] = params;
    Analytics.trackEvent(`${tag}${eventName}`, properties)
  }
}

const userTracker = trackWithTag("[User] ");
export const trackUser = (...params: Parameters<typeof Analytics.trackEvent>) => {
  userTracker(...params);
}

const sysTracker = trackWithTag("[Sys] ");
export const trackSys = (...params: Parameters<typeof Analytics.trackEvent>) => {
  sysTracker(...params);
}

const setTrackerEnabled = async(bool: boolean) => {
  const enabled = await Analytics.isEnabled()
  if (bool ? enabled : !enabled) return;
  await Analytics.setEnabled(bool);
}

export const turnOnTracker = async () => {
  setTrackerEnabled(true);
}

export const turnOffTracker = async () => {
  setTrackerEnabled(false);
}