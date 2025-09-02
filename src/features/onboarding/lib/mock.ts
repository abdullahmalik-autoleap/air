import type { AccountInfo, PersonalizeInfo, ProvisionedNumber } from "../types"

export const mockProvisionNumber = async (
  _account: AccountInfo,
  _prefs: PersonalizeInfo
): Promise<ProvisionedNumber> => {
  await new Promise((r) => setTimeout(r, 800))
  return { id: "num_1", e164: "+1 (555) 010-1234" }
}


