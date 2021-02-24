const req = require.context("./svg", true, /\.svg$/);
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
