# React-RoundProgress

React component to display progress bar in a round style using HTML Canvas.


# Testing

It is recommended to use node >=17.
To run the test:

```
npm install
npm run test
```

**Snapshots**

`Snapshots` record the drawing events of the canvas. The test of `canvas.test.tsx` is to test against `snapshots`.

When the unit tests are updated, please remove the folder `src/__snapshots__/` and run `npm run test` to generate new snapshots.

**Image**

Another part, `image.test.tsx`, is to test the image generated in `canvas` by comparing the image visually.

It contains different cases with several combinition of the `props` of the React component.
