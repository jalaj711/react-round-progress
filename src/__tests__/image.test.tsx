import React from "react";
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { describe, expect, test } from '@jest/globals';
import fs from 'fs';

import { result } from './data'

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
  // cleanup on exiting
  act(() => {
    root.unmount();
  });
});


describe('CircularProgress', () => {
  test('should match with image DataURL: all param', async () => {
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

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["1"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test01_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });

  test('should match with image DataURL: minimal', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
        />
      );
    });

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["2"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test02_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });

  test('should match with image DataURL: gaugeMarks', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          gaugeMarks={true}
          gaugeMarkSeperation={360 / 10}
          colors={{
            stroke: "blue",
            gaugeMarks: "red",
            needle: "green",
            backgroundTrack: "grey",
          }}
        />
      );
    });

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["3"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test03_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });

  test('should match with image DataURL: gaugeMarks and centralNeedle', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          centralNeedle={true}
          gaugeMarks={true}
          gaugeMarkSeperation={360 / 10}
          colors={{
            stroke: "blue",
            gaugeMarks: "red",
            needle: "green",
            backgroundTrack: "grey",
          }}
        />
      );
    });

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["4"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test04_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });

  test('should match with image DataURL: lineWidth', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          centralNeedle={true}
          gaugeMarks={true}
          gaugeMarkSeperation={360 / 10}
          lineWidth={4}
          colors={{
            stroke: "blue",
            gaugeMarks: "red",
            needle: "green",
            backgroundTrack: "grey",
          }}
        />
      );
    });

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["5"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test05_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });

  test('should match with image DataURL: range', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          range={240}
          centralNeedle={true}
          gaugeMarks={true}
          gaugeMarkSeperation={240 / 10}
          lineWidth={4}
          colors={{
            stroke: "blue",
            gaugeMarks: "red",
            needle: "green",
            backgroundTrack: "grey",
          }}
        />
      );
    });

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["6"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test06_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });

  test('should match with image DataURL: offset', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          range={240}
          centralNeedle={true}
          gaugeMarks={true}
          gaugeMarkSeperation={240 / 10}
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

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["7"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test07_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });

  test('should match with image DataURL: dimension', async () => {
    act(() => {
      root.render(
        <CircularProgress
          value={60}
          id={CANVASID}
          range={240}
          centralNeedle={true}
          gaugeMarks={true}
          gaugeMarkSeperation={240 / 10}
          dimension={500}
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

    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");

    const dataUrl = canvas.toDataURL();
    expect(dataUrl).toEqual(result["8"])

    let base64Image = dataUrl.split(';base64,').pop();
    fs.writeFile('./src/__tests__/test08_testing.png', base64Image, {encoding: 'base64'}, (err) => {
      if (err) throw err;
    });
  });
});
