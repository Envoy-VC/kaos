export const humanizeNumber = (num: number) => {
  // format large numbers in K, M, B, T
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(0)}K`;
  }
  return String(num);
};

export const humanizeEther = (num: number | bigint) => {
  const decimals = 18;
  const value = Number(num) / 10 ** decimals;
  return humanizeNumber(value);
};

export const formatTime = (time: number) => {
  // format in xh xm
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${hours}h ${minutes}m`;
};
