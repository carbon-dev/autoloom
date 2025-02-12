import { create } from 'zustand';
import { supabase, isMockMode } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  subscription: string;
  processedImages: number;
  trialImagesLeft?: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isAuthLoading: boolean;
  initializeUser: (authUser: any) => Promise<void>;
  initializeSession: () => Promise<void>;
  logout: () => void;
  setAuthLoading: (loading: boolean) => void;
  updateProcessedImages: () => Promise<void>;
  updateSubscription: (subscription: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isAuthLoading: true,

  initializeSession: async () => {
    try {
      // Get initial session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      if (session?.user) {
        await useAuthStore.getState().initializeUser(session.user);
      } else {
        set({ user: null, isAuthenticated: false, isAuthLoading: false });
      }

      // Set up auth state listener
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event);
        if (event === 'SIGNED_IN' && session?.user) {
          await useAuthStore.getState().initializeUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          set({ user: null, isAuthenticated: false });
        }
      });
    } catch (error) {
      console.error('Error initializing session:', error);
      set({ user: null, isAuthenticated: false, isAuthLoading: false });
    }
  },

  initializeUser: async (authUser) => {
    try {
      if (!authUser) {
        set({ user: null, isAuthenticated: false, isAuthLoading: false });
        return;
      }

      // First check if customer exists
      const { data: existingCustomer, error: fetchError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', authUser.id)
        .single();

      let customerData;

      if (!existingCustomer) {
        // If no customer exists, create one with a direct insert
        const { data: newCustomer, error: insertError } = await supabase
          .from('customers')
          .insert([
            {
              id: authUser.id,
              email: authUser.email,
              subscription_tier: 'trial',
              trial_images_left: 5,
              processed_images: 0,
            }
          ])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating customer:', insertError);
          throw insertError;
        }
        customerData = newCustomer;
      } else {
        customerData = existingCustomer;
      }

      // Set the user state
      const user = {
        id: customerData.id,
        email: customerData.email,
        subscription: customerData.subscription_tier,
        processedImages: customerData.processed_images,
        trialImagesLeft: customerData.trial_images_left,
      };

      set({ user, isAuthenticated: true, isAuthLoading: false });
    } catch (error) {
      console.error('Error initializing user:', error);
      set({ user: null, isAuthenticated: false, isAuthLoading: false });
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear the store state
    set({ user: null, isAuthenticated: false });
  },

  setAuthLoading: (loading) => set({ isAuthLoading: loading }),

  updateProcessedImages: async () => {
    const state = useAuthStore.getState();
    if (!state.user) return;

    const newTrialImagesLeft = Math.max(0, (state.user.trialImagesLeft || 0) - 1);
    const newProcessedImages = (state.user.processedImages || 0) + 1;

    // Update local state immediately for better UX
    set((state) => ({
      ...state,
      user: state.user ? {
        ...state.user,
        processedImages: newProcessedImages,
        trialImagesLeft: newTrialImagesLeft,
      } : null
    }));

    if (!isMockMode()) {
      // Update database
      const { error } = await supabase
        .from('customers')
        .update({
          trial_images_left: newTrialImagesLeft,
          processed_images: newProcessedImages,
        })
        .eq('id', state.user.id);

      if (error) {
        console.error('Error updating processed images:', error);
        // Revert local state on error
        set((state) => ({
          ...state,
          user: state.user
        }));
      }
    }
  },

  updateSubscription: async (subscription) => {
    set((state) => {
      if (!state.user) return state;

      if (!isMockMode()) {
        // Update Supabase in the background
        supabase!
          .from('customers')
          .update({
            subscription_tier: subscription,
            trial_images_left: subscription === 'trial' ? 5 : null,
          })
          .eq('id', state.user.id)
          .then(({ error }) => {
            if (error) console.error('Error updating subscription:', error);
          });
      }

      return {
        user: {
          ...state.user,
          subscription,
          trialImagesLeft: subscription === 'trial' ? 5 : undefined,
        },
      };
    });
  },
}));