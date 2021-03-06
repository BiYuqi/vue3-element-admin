// reference from webpack-env/index.d.ts
// TODO
/* eslint-disable @typescript-eslint/no-explicit-any */
interface RequireContext {
  keys(): string[];
  (id: string): any;
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
}

const req = require.context("./svg", true, /\.svg$/);
const requireAll = (requireContext: RequireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
