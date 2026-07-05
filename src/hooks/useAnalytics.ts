import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useRobotStore } from '../store/useRobotStore';

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

      let vid = localStorage.getItem('visitor_id');
      if (!vid) {
        // Generate persistent visitor ID using crypto.randomUUID()
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
          vid = crypto.randomUUID();
        } else {
          // Fallback if randomUUID is not supported in old browsers
          vid = 'vid_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
        localStorage.setItem('visitor_id', vid);
      }

      // Check if visitor exists in database
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
        // Insert new visitor
        const { error: insertError } = await supabase
          .from('visitors')
          .insert({
            visitor_id: vid,
            first_visit: new Date().toISOString(),
            last_visit: new Date().toISOString(),
            visit_count: 1
          });
        if (insertError) throw insertError;
      } else {
        // Update visit count if last visit was > 24 hours ago
        const lastVisitTime = new Date(existing.last_visit).getTime();
        if (now - lastVisitTime > ONE_DAY) {
          const { error: updateError } = await supabase
            .from('visitors')
            .update({
              last_visit: new Date().toISOString(),
              visit_count: (existing.visit_count || 1) + 1
            })
            .eq('visitor_id', vid);
          if (updateError) throw updateError;
        }
      }

      // Fetch sum of all visit_count columns once for initial load
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
          // Automatically retry in 30 seconds
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

  // Realtime subscription
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
      if (supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, [status, setVisitorCount]);

  return { isOnline, status };
};
