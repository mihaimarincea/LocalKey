'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating fraud alerts based on user redemption patterns and device fingerprinting analysis.
 *
 * - generateFraudAlerts - An async function that triggers the fraud alert generation flow.
 * - GenerateFraudAlertsInput - The input type for the generateFraudAlerts function (currently empty).
 * - GenerateFraudAlertsOutput - The return type for the generateFraudAlerts function, containing the fraud alert.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFraudAlertsInputSchema = z.object({});
export type GenerateFraudAlertsInput = z.infer<typeof GenerateFraudAlertsInputSchema>;

const GenerateFraudAlertsOutputSchema = z.object({
  alert: z.string().describe('A detailed fraud alert message based on usage patterns.'),
});
export type GenerateFraudAlertsOutput = z.infer<typeof GenerateFraudAlertsOutputSchema>;

export async function generateFraudAlerts(input: GenerateFraudAlertsInput): Promise<GenerateFraudAlertsOutput> {
  return generateFraudAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFraudAlertsPrompt',
  input: {schema: GenerateFraudAlertsInputSchema},
  output: {schema: GenerateFraudAlertsOutputSchema},
  prompt: `You are a fraud detection expert analyzing user redemption patterns and device fingerprinting data to identify suspicious activities.

  Analyze the provided data (if any) and generate a detailed fraud alert message if suspicious activity is detected. Consider factors such as redemption frequency, device consistency, and invite code usage.

  Data:
  - User redemption frequency: {{redemptionFrequency}}
  - Device consistency: {{deviceConsistency}}
  - Invite code usage: {{inviteCodeUsage}}

  Alert:`, // Modified prompt to expect dynamic data.
});

const generateFraudAlertsFlow = ai.defineFlow(
  {
    name: 'generateFraudAlertsFlow',
    inputSchema: GenerateFraudAlertsInputSchema,
    outputSchema: GenerateFraudAlertsOutputSchema,
  },
  async input => {
    // TODO: Fetch actual redemption frequency, device consistency, and invite code usage data here.
    // This is placeholder data for now.
    const redemptionFrequency = 'High redemption rate observed in the last 24 hours.';
    const deviceConsistency = 'Multiple devices used within a short timeframe.';
    const inviteCodeUsage = 'Unusual number of invite codes redeemed.';

    const {output} = await prompt({
      ...input,
      redemptionFrequency,
      deviceConsistency,
      inviteCodeUsage,
    });
    return output!;
  }
);
