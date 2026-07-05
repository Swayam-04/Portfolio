import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRobotStore } from '../store/useRobotStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const useAnalytics = () => {
  const { setVisitorCount } = useRobotStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [isOnline, setIsOnline] = useState(!!supabase);

  const trackingRan = useRef(false);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const trackVisitor = async () => {
      if (!supabase) {
        setStatus('error');
        setIsOnline(false);
        return;
      }

      let vid = localStorage.getItem('ai_visitor_id');
      if (!vid) {
        vid = 'vid_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('ai_visitor_id', vid);
      }

      const { data: existing, error: selectError } = await supabase
        .from('visitors')
        .select('last_visit, visit_count')
        .eq('visitor_id', vid)
        .maybeSingle();

      if (selectError) {
        throw selectError;
      }

      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (!existing) {
        const { error: insertError } = await supabase
          .from('visitors')
          .insert({
            visitor_id: vid,
            first_visit: new Date().toISOString(),
            last_visit: new Date().toISOString(),
            visit_count: 1,
            user_agent: navigator.userAgent
          });
        if (insertError) throw insertError;
      } else {
        const lastVisitTime = new Date(existing.last_visit).getTime();
        if (now - lastVisitTime > ONE_DAY) {
          const { error: updateError } = await supabase
            .from('visitors')
            .update({
              last_visit: new Date().toISOString(),
              visit_count: (existing.visit_count || 1) + 1,
              user_agent: navigator.userAgent
            })
            .eq('visitor_id', vid);
          if (updateError) throw updateError;
        }
      }

      const { data: countData, error: sumError } = await supabase
        .from('visitors')
        .select('visit_count');

      if (sumError) {
        throw sumError;
      }

      if (countData && mounted) {
        const total = countData.reduce((acc, row) => acc + (row.visit_count || 1), 0);
        setVisitorCount(total);
        setStatus('success');
        setIsOnline(true);
      }
    };

    const runTrackingFlow = async () => {
      if (!mounted) return;
      if (trackingRan.current) {
        return;
      }
      setStatus('loading');
      try {
        await trackVisitor();
        trackingRan.current = true;
      } catch (err) {
        console.error('Visitor Analytics Tracking Error:', err);
        if (mounted) {
          setStatus('error');
          timer = setTimeout(runTrackingFlow, 30000);
        }
      }
    };

    runTrackingFlow();

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [setVisitorCount]);

  useEffect(() => {
    if (!supabase || status !== 'success') return;

    let mounted = true;
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visitors',
        },
        (payload) => {
          if (!mounted) return;
          
          const store = useRobotStore.getState();
          const currentCount = store.visitorCount;

          if (payload.eventType === 'INSERT') {
            setVisitorCount(currentCount + 1);
          } else if (payload.eventType === 'UPDATE') {
            if (payload.old && payload.new && typeof payload.new.visit_count === 'number' && typeof payload.old.visit_count === 'number') {
              const diff = payload.new.visit_count - payload.old.visit_count;
              if (diff > 0) {
                setVisitorCount(currentCount + diff);
              }
            } else {
              setVisitorCount(currentCount + 1);
            }
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [status, setVisitorCount]);

  return { isOnline, status };
};
