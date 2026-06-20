import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const ai = genkit({ plugins: [googleAI()] });

// A normal tool that pauses *itself* before committing a high-risk action.
export const transferMoney = ai.defineTool(
  {
    name: 'transferMoney',
    description: 'Transfer money from the house account to a recipient',
    inputSchema: z.object({ to: z.string(), amount: z.number() }),
    outputSchema: z.object({ status: z.string(), message: z.string() }),
  },
  async (input, { interrupt, resumed }) => {
    // Resumed after a human decision?
    if (resumed?.status === 'REJECTED') {
      return { status: 'REJECTED', message: 'Transfer cancelled by approver.' };
    }

    // High-risk + not yet approved → pause the flow and hand control back.
    if (resumed?.status !== 'APPROVED' && input.amount > 1_000) {
      interrupt({ reason: 'High-value transfer needs approval', ...input });
    }

    // Only reached once APPROVED (or below threshold): commit for real.
    return doTransfer(input);
  },
);
