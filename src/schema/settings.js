import { z } from "zod";

export const LibrarySettingSchema = z.object({
  loanPeriodDays: z.number().min(1), // Ensure it's a positive number
  renewalPeriodDays: z.number().min(1),
  maxRenewals: z.number().min(1),
  timeLeftOnDueDateForRenewal: z.number().min(0),
  holdPeriodDays: z.number().min(1),
  feeNewToFair: z.number().min(0),
  feeFairToPoor: z.number().min(0),
  feeNewToPoor: z.number().min(0),
  feeLostBook: z.number().min(0),
  overdueFinePerDay: z.number().min(0),
});
