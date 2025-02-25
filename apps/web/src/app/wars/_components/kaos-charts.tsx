'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@kaos/ui/components/chart';
const chartData = [
  { yes: 186, no: 80 },
  { yes: 305, no: 200 },
  { yes: 237, no: 120 },
  { yes: 73, no: 190 },
  { yes: 209, no: 130 },
  { yes: 214, no: 140 },
];

const chartConfig = {
  yes: {
    label: 'Forks',
    color: 'hsl(var(--chart-yes))',
    icon: TrendingDown,
  },
  no: {
    label: 'Burns',
    color: 'hsl(var(--chart-no))',
    icon: TrendingUp,
  },
} satisfies ChartConfig;

export const KaosCharts = () => {
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
            dataKey='yes'
            type='natural'
            fill='var(--chart-yes)'
            fillOpacity={1}
            stroke='var(--chart-yes)'
            stackId='a'
          />
          <Area
            dataKey='no'
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
