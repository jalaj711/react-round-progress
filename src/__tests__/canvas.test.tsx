import React from "react";
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { describe, expect, test } from '@jest/globals';
import 'jest-canvas-mock';

import CircularProgress from '../RoundProgress'

const CANVASID: string = "id";
let root: any = null;
let canvas: any = null;
let ctx: any = null;
let container: any = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = ReactDOM.createRoot(
    container as HTMLElement
  );
});

afterEach(() => {
  canvas = document.getElementById(CANVASID);
  if (canvas) {
    ctx = canvas.getContext("2d");

    const events = ctx.__getEvents();
    expect(events).toMatchSnapshot();
  }

  // cleanup on exiting
  act(() => {
    root.unmount();
  });
});

describe('CircularProgress', () => {
  test('should call these canvas functions', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          range={240}
          centralNeedle={true}
          gaugeMarks={true}
          gaugeMarkSeperation={240 / 10}
          showValue={true}
          dimension={250}
          lineWidth={4}
          offSet={150}
          colors={{
            stroke: "blue",
            gaugeMarks: "red",
            needle: "green",
            backgroundTrack: "grey",
          }}
        />
      );
    });

    canvas = document.getElementById("id");
    ctx = canvas.getContext("2d");

    expect(ctx.clearRect).toBeCalled();
    expect(ctx.beginPath).toBeCalled();
    expect(ctx.arc).toBeCalled();
    expect(ctx.stroke).toBeCalled();
    expect(ctx.moveTo).toBeCalled();
    expect(ctx.lineTo).toBeCalled();

    expect(ctx.scale).not.toBeCalled();
  });

  test('should not call some canvas functions for no gaugeMarks, centralNeedle', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          range={240}
          centralNeedle={false}
          gaugeMarks={false}
          gaugeMarkSeperation={240 / 10}
          showValue={true}
          dimension={250}
          lineWidth={4}
          offSet={150}
          colors={{
            stroke: "blue",
            gaugeMarks: "red",
            needle: "green",
            backgroundTrack: "grey",
          }}
        />
      );
    });

    canvas = document.getElementById("id");
    ctx = canvas.getContext("2d");

    expect(ctx.clearRect).toBeCalled();
    expect(ctx.beginPath).toBeCalled();
    expect(ctx.arc).toBeCalled();
    expect(ctx.stroke).toBeCalled();

    expect(ctx.moveTo).not.toBeCalled();
    expect(ctx.lineTo).not.toBeCalled();
    expect(ctx.scale).not.toBeCalled();
  });
});


describe('Errors when invalid props', () => {
  test('should throw error', async () => {
    expect(() => {
      act(() => {
        root.render(
          <CircularProgress
            value={60}
            id={CANVASID}
            dimension={2}
            lineWidth={4}
          />
        );
      });

      canvas = document.getElementById("id");
      ctx = canvas.getContext("2d");
    }).toThrow(DOMException);
  });
});

