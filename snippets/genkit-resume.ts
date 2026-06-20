// 1. Run the agent. It may pause on a high-risk tool call.
let response = await ai.generate({
  prompt: userMessage,
  tools: [transferMoney],
});

// 2. Did the agent hit an interrupt instead of finishing?
if (response.finishReason === 'interrupted') {
  const pending = response.interrupts[0];      // surface this to the human
  const decision = await waitForHumanDecision(pending);   // Approve / Reject

  // 3. Resume the SAME conversation, restarting the tool with the verdict.
  response = await ai.generate({
    tools: [transferMoney],
    messages: response.messages,
    resume: {
      restart: transferMoney.restart(pending, {
        status: decision.approved ? 'APPROVED' : 'REJECTED',
      }),
    },
  });
}

return response.text;
