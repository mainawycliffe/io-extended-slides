import { interrupt, Command, MemorySaver, StateGraph, START, END } from '@langchain/langgraph';

// In LangGraph, the approval gate is a NODE in the graph.
async function approveTransfer(state: { to: string; amount: number }) {
  // ⚠️ This node RE-RUNS from the top on resume — keep side effects below.
  const approved = interrupt({
    question: `Transfer $${state.amount} to ${state.to}?`,
  });

  if (!approved) return { status: 'rejected' };
  return doTransfer(state);           // side effect AFTER the interrupt
}

// Wire the node into the graph; a checkpointer makes the pause durable.
const graph = new StateGraph(State)
  .addNode('approve', approveTransfer)
  .addEdge(START, 'approve')
  .addEdge('approve', END)
  .compile({ checkpointer: new MemorySaver() });

const config = { configurable: { thread_id: 'session-42' } };

// First run pauses; the pending value surfaces under `__interrupt__`.
const paused = await graph.invoke({ to: '998812', amount: 50_000 }, config);
console.log(paused.__interrupt__);   // [{ value: { question: '...' } }]

// Resume the same thread with the human's verdict.
await graph.invoke(new Command({ resume: true }), config);
