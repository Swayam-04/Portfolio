import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRobotStore } from '../store/useRobotStore';

// Get env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client conditionally so it doesn't crash if env vars are missing
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const useAnalytics = () => {
  const { setVisitorCount } = useRobotStore();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let mounted = true;

    const trackVisitor = async () => {
      if (!supabase) {
        console.warn('Supabase not configured. Analytics disabled.');
        return;
      }

      try {
        const lastVisitStr = localStorage.getItem('last_visit');
        const now = Date.now();
        const ONE_DAY = 24 * 60 * 60 * 1000;

        let shouldIncrement = false;

        if (!lastVisitStr) {
          shouldIncrement = true;
        } else {
          const lastVisit = parseInt(lastVisitStr, 10);
          if (now - lastVisit > ONE_DAY) {
            shouldIncrement = true;
          }
        }

        if (shouldIncrement) {
          // Increment in Supabase using an RPC or just fetching and updating
          // Note: for a robust counter, use a postgres function:
          // CREATE OR REPLACE FUNCTION increment_visitor() RETURNS void AS \$\$
          // BEGIN UPDATE visitors SET count = count + 1 WHERE id = 1; END; \$\$ LANGUAGE plpgsql;
          
          const { error } = await supabase.rpc('increment_visitor');
          
          if (!error) {
            localStorage.setItem('last_visit', now.toString());
          }
        }

        // Fetch current count
        const { data, error: fetchError } = await supabase
          .from('visitors')
          .select('count')
          .eq('id', 1)
          .single();

        if (!fetchError && data && mounted) {
          setVisitorCount(data.count);
        }
      } catch (err) {
        console.error('Analytics Error:', err);
      }
    };

    trackVisitor();

    // Subscribe to realtime updates
    let channel: any = null;
    
    if (supabase) {
      channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'visitors',
          },
          (payload) => {
            if (mounted && payload.new && typeof payload.new.count === 'number') {
              setVisitorCount(payload.new.count);
            }
          }
        )
        .subscribe();
    }

    // Ping mechanism for "Online Status" (using simple local state for demo, or Presence)
    // For now we just say online if supabase connected.
    setIsOnline(!!supabase);

    return () => {
      mounted = false;
      if (channel) {
        supabase?.removeChannel(channel);
      }
    };
  }, [setVisitorCount]);

  return { isOnline };
};
