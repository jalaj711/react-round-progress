import React from "react";
import RoundProgress from "./src/RoundProgress";

export interface ReactRoundProgressProps
  extends React.ComponentProps<typeof RoundProgress> {
  value: number;
  id: string;
  range?: number;
  centralNeedle?: boolean;
  gaugeMarks?: boolean;
  gaugeMarkSeperation?: number;
  showValue?: boolean;
  dimension?: number;
  lineWidth?: number;
  offSet?: number;
  colors?: {
    stroke?: string;
    gaugeMarks?: string;
    needle?: string;
    backgroundTrack?: string;
  };
}

declare class ReactRoundProgress extends React.Component<
  ReactRoundProgressProps,
  any
> {}

declare module "react-round-progress" {}

export default ReactRoundProgress;
