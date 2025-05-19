import { atom } from "jotai";

import type { Company } from "@starsched/sdk";

type SelectedCompanyState = Company | null

export const selectedCompany = atom<SelectedCompanyState>(null)
