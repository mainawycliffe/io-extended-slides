// Authority lives in the agent — checked server-side, never in the prompt.
const transferMoney = ai.defineTool({ /* ...schemas... */ },
  async (input, { context, interrupt, resumed }) => {
    // RBAC: only admins may authorize transfers (re-checked on resume).
    if (context.auth?.role !== 'admin') {
      return { status: 'DENIED', message: 'You may not authorize transfers.' };
    }
    if (resumed?.status !== 'APPROVED' && input.amount > 1_000) {
      interrupt({ reason: 'needs approval', ...input });
    }
    return doTransfer(input);
  },
);

// …or gate the whole flow at the edge:
//   onCallGenkit({ authPolicy: hasClaim('admin') }, chatFlow)
