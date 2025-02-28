export interface Reality {
  id: string;
  startAt: number;
  endAt: number;
  isEnded: boolean;
  remainingTime: {
    raw: number;
    formatted: string | null;
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
