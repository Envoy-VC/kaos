'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@kaos/ui/components/chart';
import { useMemo } from 'react';
import { formatEther } from 'viem';
import type { api } from '~/convex/_generated/api';

const chartConfig = {
  forks: {
    label: 'Forks',
    color: 'hsl(var(--chart-yes))',
    icon: TrendingDown,
  },
  burns: {
    label: 'Burns',
    color: 'hsl(var(--chart-no))',
    icon: TrendingUp,
  },
} satisfies ChartConfig;

export const KaosCharts = ({
  transactions,
}: {
  transactions: typeof api.functions.transactions.getTransactions._returnType;
}) => {
  const chartData = useMemo(() => {
    const data = transactions.map((tx) => {
      return {
        forks: formatEther(BigInt(tx.totalForkedAmount)),
        burns: formatEther(BigInt(tx.totalBurnedAmount)),
      };
    });

    return data;
  }, [transactions]);
  return (
    <div className='flex h-full w-full basis-3/5 items-end justify-end overflow-hidden rounded-2xl border-2 border-black bg-[#D2DFFD]'>
      <ChartContainer
        config={chartConfig}
        className='m-0 h-[14rem] w-full p-0'
      >
        <AreaChart
          accessibilityLayer={true}
          data={chartData}
          margin={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator='line' />}
          />
          <Area
            dataKey='forks'
            type='natural'
            fill='var(--chart-yes)'
            fillOpacity={1}
            stroke='var(--chart-yes)'
            stackId='a'
          />
          <Area
            dataKey='burns'
            type='natural'
            fill='var(--chart-no)'
            fillOpacity={1}
            stroke='var(--chart-no)'
            stackId='a'
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
