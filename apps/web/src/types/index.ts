export interface Reality {
  id: string;
  startAt: number;
  endAt: number;
  remainingTime: {
    raw: number;
    formatted: string;
  };
  startBlock: number;
  totalAmount: {
    raw: number;
    formatted: string;
  };
  totalAmountForks: {
    raw: number;
    formatted: string;
  };
  totalAmountBurns: {
    raw: number;
    formatted: string;
  };
  opinion: string;
  metadata: {
    title: string;
    forkRealityTitle: string;
    burnRealityTitle: string;
  };
}
