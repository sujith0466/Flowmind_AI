import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { generateWorkflow } from '../api/workflow.js';
import { fadeUp, staggerContainer } from '../animations/variants.js';
import { supabase } from '../lib/supabase.js';

import UploadPanel from '../components/workflow/UploadPanel.jsx';
import WorkflowTimeline from '../components/workflow/WorkflowTimeline.jsx';
import WorkflowResultsPanel from '../components/workflow/WorkflowResultsPanel.jsx';
import AgentGrid from '../components/dashboard/AgentGrid.jsx';
import LiveTerminal from '../components/dashboard/LiveTerminal.jsx';

const loadingPhases = ['analyzing', 'planning', 'organizing'];

export default function Dashboard() {
  const [notes, setNotes] = useState('');
  const [workflow, setWorkflow] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!isLoading) return;

    setPhase('analyzing');
    let index = 0;
    const timer = setInterval(() => {
      index = Math.min(index + 1, loadingPhases.length - 1);
      setPhase(loadingPhases[index]);
    }, 1200);

    return () => clearInterval(timer);
  }, [isLoading]);

  async function handleGenerateWorkflow(e) {
    e.preventDefault();
    if (!notes.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setWorkflow(null);

    try {
      const data = await generateWorkflow(notes.trim());
      setWorkflow(data);
      setPhase('completed');
      toast.success('Workflow generated successfully.');
      
      // Persist to Supabase if client is configured
      if (supabase) {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        
        if (userId) {
          const { error: dbError } = await supabase.from('workflows').insert({
            user_id: userId,
            title: `Workflow: ${notes.substring(0, 30)}...`,
            raw_input: notes,
            data: data
          });
          
          if (dbError) {
            console.error('Failed to save to Supabase:', dbError);
            toast.error('Generated, but failed to save to history.');
          }
        }
      }
      
    } catch (err) {
      setError('Failed to generate workflow.');
      setPhase('idle');
      toast.error('Failed to generate workflow.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="w-full">

      <motion.div variants={fadeUp} className="mb-10 text-center sm:text-left">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white">Startup Workflow Studio</h1>
        <p className="mt-3 text-[16px] text-white/50">Transform raw notes into an execution-ready roadmap with your AI agent team.</p>
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
              <WorkflowTimeline phase={phase} workflowSteps={workflow?.workflow_steps || []} />
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
