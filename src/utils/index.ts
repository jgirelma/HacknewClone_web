export function timeSince(timeStamp: number) {
  const now = Math.floor(Date.now() / 1000);
  
  const secondsPast = now - timeStamp;
  if (secondsPast < 60) {
    return `${secondsPast} ${secondsPast === 1 ? "second" : "seconds"}`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} hours`;
  }
  if (secondsPast < 31557600) {
    return `${Math.floor(secondsPast / 86400)} days`;
  }
  return `${Math.floor(secondsPast / 31557600)} years`;
}
