import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { generateWorkflow, getApiErrorMessage } from '../api/workflow.js';
import { fadeUp, staggerContainer } from '../animations/variants.js';
import { supabase } from '../lib/supabase.js';

import UploadPanel from '../components/workflow/UploadPanel.jsx';
import WorkflowTimeline from '../components/workflow/WorkflowTimeline.jsx';
import WorkflowResultsPanel from '../components/workflow/WorkflowResultsPanel.jsx';
import AgentGrid from '../components/dashboard/AgentGrid.jsx';
import LiveTerminal from '../components/dashboard/LiveTerminal.jsx';

const loadingPhases = ['researching', 'planning', 'prioritizing', 'summarizing', 'structuring'];

export default function Dashboard() {
  const [notes, setNotes] = useState('');
  const [workflow, setWorkflow] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!isLoading) return;

    setPhase('researching');
    let index = 0;
    const timer = setInterval(() => {
      index = Math.min(index + 1, loadingPhases.length - 1);
      setPhase(loadingPhases[index]);
    }, 1500);

    return () => clearInterval(timer);
  }, [isLoading]);

  async function handleGenerateWorkflow(e, overridePrompt = null) {
    if (e && e.preventDefault) e.preventDefault();
    const promptToUse = overridePrompt || notes;
    if (!promptToUse.trim() || isLoading) return;

    if (overridePrompt) setNotes(overridePrompt);

    setIsLoading(true);
    setError('');
    setWorkflow(null);

    try {
      const sourceText = promptToUse.trim();
      const data = await generateWorkflow(sourceText);
      setWorkflow(data);
      setPhase('completed');
      toast.success('Workflow generated successfully.');
      
      // Persist to Supabase if client is configured
      if (supabase) {
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          const userId = sessionData?.session?.user?.id;
          
          if (userId) {
            const { error: dbError } = await supabase.from('workflows').insert({
              user_id: userId,
              title: `Workflow: ${sourceText.substring(0, 30)}...`,
              raw_input: sourceText,
              data: data
            });
            
            if (dbError) {
              toast.error('Generated, but could not save to history.');
            }
          }
        } catch {
          toast.error('Generated, but could not save to history.');
        }
      }
      
    } catch (err) {
      const message = getApiErrorMessage(err);
      setError(message);
      setPhase('idle');
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="w-full">

      <motion.div variants={fadeUp} className="mb-12 text-center sm:text-left">
        <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          System Online
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Startup Workflow Studio</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-slate-400 max-w-[600px] mx-auto sm:mx-0">
          Transform raw notes, meeting transcripts, or vague ideas into an execution-ready roadmap. Orchestrated instantly by your dedicated AI multi-agent system.
        </p>
      </motion.div>

      <div className="mx-auto max-w-[800px] sm:mx-0 sm:max-w-none">
        <UploadPanel
          value={notes}
          onChange={setNotes}
          onSubmit={handleGenerateWorkflow}
          isLoading={isLoading}
          error={error}
          phase={phase}
        />
        
        <div className="mt-4 flex flex-col gap-4">
          <AgentGrid phase={phase} isLoading={isLoading} hasResult={Boolean(workflow)} />
          <AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <LiveTerminal phase={phase} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {(workflow && !isLoading) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 grid gap-10 lg:grid-cols-[1fr_2fr]"
          >
            <div>
              <WorkflowTimeline phase={phase} workflow={workflow} workflowSteps={workflow?.workflow_steps || []} />
            </div>
            <div>
              <WorkflowResultsPanel workflow={workflow} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
