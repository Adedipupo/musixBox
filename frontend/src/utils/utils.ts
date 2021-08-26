export function secondsToHms(d: number) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? ' hr ' : ' hrs ') : '';
  var mDisplay = m > 0 ? m + (m === 1 ? ' m ' : ' m ') : '';
  var sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' s') : '';
  return hDisplay + mDisplay + sDisplay;
}

export const limitSentence = (sentence: string) => {
  const words = sentence.split(' ');

  if (words.length > 6) return `${words.slice(0, 5).join(' ')}...`;
  return sentence;
};
