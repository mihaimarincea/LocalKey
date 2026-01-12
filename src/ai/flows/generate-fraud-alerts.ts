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
  alert: z.string().describe('Un mesaj detaliat de alertă de fraudă bazat pe modelele de utilizare.'),
});
export type GenerateFraudAlertsOutput = z.infer<typeof GenerateFraudAlertsOutputSchema>;

export async function generateFraudAlerts(input: GenerateFraudAlertsInput): Promise<GenerateFraudAlertsOutput> {
  return generateFraudAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFraudAlertsPrompt',
  input: {schema: GenerateFraudAlertsInputSchema},
  output: {schema: GenerateFraudAlertsOutputSchema},
  prompt: `Ești un expert în detectarea fraudelor care analizează modelele de răscumpărare ale utilizatorilor și datele de amprentare a dispozitivelor pentru a identifica activități suspecte.

  Analizează datele furnizate (dacă există) și generează un mesaj detaliat de alertă de fraudă dacă este detectată o activitate suspectă. Ia în considerare factori precum frecvența răscumpărărilor, consistența dispozitivelor și utilizarea codurilor de invitație.

  Date:
  - Frecvența răscumpărărilor utilizatorului: {{redemptionFrequency}}
  - Consistența dispozitivului: {{deviceConsistency}}
  - Utilizarea codului de invitație: {{inviteCodeUsage}}

  Alertă:`,
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
    const redemptionFrequency = 'Rată mare de răscumpărare observată în ultimele 24 de ore.';
    const deviceConsistency = 'Mai multe dispozitive utilizate într-un interval scurt de timp.';
    const inviteCodeUsage = 'Număr neobișnuit de coduri de invitație răscumpărate.';

    const {output} = await prompt({
      ...input,
      redemptionFrequency,
      deviceConsistency,
      inviteCodeUsage,
    });
    return output!;
  }
);
