export function secondsToHms(d: number) {
  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);
  const hDisplay = h > 0 ? h + (h === 1 ? ' hr, ' : ' hrs, ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' m, ' : ' m, ') : '';
  const sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' s') : '';
  return hDisplay + mDisplay + sDisplay;
}
