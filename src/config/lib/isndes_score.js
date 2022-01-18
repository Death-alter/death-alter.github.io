import { getJFRule } from "@/api/isndes";

export default (async () => {
  try {
    return await getJFRule();
  } catch (e) {
    return {};
  }
})();
