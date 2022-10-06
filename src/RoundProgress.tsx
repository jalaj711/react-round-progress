import { useEffect, useMemo } from "react";
import React from 'react'

const colors = {
    primary: "#4caf50"
}

function CircularProgress(props: {
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
  colors?: { stroke?: string; gaugeMarks?: string; needle?: string; backgroundTrack?: string}
}) {
  const dimension = props.dimension || 150;
  const lineWidth = props.lineWidth || 10;
  const radius = dimension / 2 - lineWidth;
  const range = props.range || 360;
  const colorsObject = useMemo(() => ({
    stroke: (props.colors && props.colors.stroke) || colors.primary,
    gaugeMarks: (props.colors && props.colors.gaugeMarks) || "#fff",
    needle: (props.colors && props.colors.needle) || "#fff",
    backgroundTrack: (props.colors && props.colors.backgroundTrack) || "rgba(255, 255, 255, 0.1)"
  }), [props.colors])

  // Offset required for
  const offsetInDegrees = props.offSet || 90;
  useEffect(() => {
    var can = document.getElementById(props.id) as HTMLCanvasElement;
    const ctx = can.getContext("2d");

    var centreX = can.width / 2,
      centreY = can.height / 2;
    if (ctx) {
      ctx.clearRect(0, 0, can.width, can.height);

      // Draws the outline container for the progress bar
      const drawOutline = () => {
        ctx.beginPath();
        ctx.arc(
          centreX,
          centreY,
          radius,
          (Math.PI / 180) * offsetInDegrees,
          (Math.PI / 180) * (range + offsetInDegrees)
        );
        ctx.strokeStyle = colorsObject.backgroundTrack;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      // Draws the actual amount of progress made
      const drawValue = () => {
        ctx.beginPath();
        ctx.strokeStyle = colorsObject.stroke;
        ctx.lineWidth = lineWidth + 0.3 * lineWidth;
        ctx.arc(
          centreX,
          centreY,
          radius,
          (Math.PI / 180) * offsetInDegrees,
          (Math.PI / 180) * ((range / 100) * props.value + offsetInDegrees)
        );
        ctx.stroke();
      };

      // Draws the marks on the gauge
      const drawGaugeMarks = () => {
        const length = 5;
        const seperationInDegrees = props.gaugeMarkSeperation || 45;
        var degrees = -offsetInDegrees + 90;
        const drawSingleMark = () => {
          ctx.beginPath();

          // We have the desired length of each of these marks we need,
          // and we know the centre, the radius and lineWidth of the
          // container, so we can calculate the distance the line should
          // start from the centre of the circle and the angle at which
          // we need the stroke is known, therefore we use the mathematical
          // expression for polar to caartesian coordinates:
          // x = r sin( theta )
          // y = r cos( theta )
          ctx.moveTo(
            centreX +
              (radius - lineWidth - length) *
                Math.sin((Math.PI / 180) * degrees),
            centreY +
              (radius - lineWidth - length) *
                Math.cos((Math.PI / 180) * degrees)
          );
          ctx.lineTo(
            centreX +
              (radius - lineWidth) * Math.sin((Math.PI / 180) * degrees),
            centreY + (radius - lineWidth) * Math.cos((Math.PI / 180) * degrees)
          );
          ctx.strokeStyle = colorsObject.gaugeMarks;
          ctx.lineWidth = 1;
          ctx.stroke();
        };
        while (degrees >= -range - offsetInDegrees + 90) {
          drawSingleMark();
          degrees -= seperationInDegrees;
        }
      };

      const drawMeter = () => {
        const degrees = -(props.value * range) / 100 - offsetInDegrees + 90;
        ctx.beginPath();
        ctx.moveTo(centreX, centreY);
        ctx.lineTo(
          centreX +
            (radius - lineWidth - 10) * Math.sin((Math.PI / 180) * degrees),
          centreY +
            (radius - lineWidth - 10) * Math.cos((Math.PI / 180) * degrees)
        );
        ctx.strokeStyle = colorsObject.needle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      ctx.lineCap = "round";
      drawOutline();
      props.gaugeMarks && drawGaugeMarks();
      props.centralNeedle && drawMeter();
      drawValue();
    }
  }, [
    props.id,
    props.value,
    props.gaugeMarks,
    props.centralNeedle,
    props.gaugeMarkSeperation,
    radius,
    lineWidth,
    range,
    offsetInDegrees,
    colorsObject
  ]);

  return (
    <>
      <div className="progressWrap">
        <canvas id={props.id} width={dimension} height={dimension}></canvas>
        {props.showValue && (
          <span className="progressValue">{props.value}%</span>
        )}
      </div>
      <style>{`
        .progressValue {
          display: block;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }
        .progressWrap {
          position: relative;
          width: ${dimension}px;
          height: ${dimension}px;
        }
      `}</style>
    </>
  );
}

export default CircularProgress;
