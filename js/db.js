/* ========================================
   AR COMMUNITY — Supabase Centralized Database
   ======================================== */

const supabaseUrl = "https://wqxbsgwtyhrpachvbizf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxeGJzZ3d0eWhycGFjaHZiaXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3OTA1MjksImV4cCI6MjEwMDM2NjUyOX0.Prl9Njo4j8vBCV8MXOj1p-_rfh1EJ3nz2Ybf61JedVo";

// Initialize Supabase Client
let db = null;
if (typeof supabase !== 'undefined') {
  db = supabase.createClient(supabaseUrl, supabaseKey);
} else {
  console.error("Supabase SDK not loaded. Centralized DB functions will not work.");
}

const DB = {
  /**
   * Fetch user data from Supabase and save to localStorage
   */
  async fetchUserData(email) {
    if (!db) return null;
    try {
      const { data, error } = await db
        .from('users_data')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is code for "no rows returned"
        console.error("Error fetching user data:", error);
        return null;
      }

      if (data) {
        // Populate localStorage with data from Supabase
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userName', data.name || data.email.split('@')[0]);
        localStorage.setItem('userTier', data.tier || 'Unlimited');
        if (data.plugin_id) {
          localStorage.setItem('user_plugin_id', data.plugin_id);
        }
        if (data.roblox_accounts) {
          localStorage.setItem('roblox_accounts', JSON.stringify(data.roblox_accounts));
        }
        if (data.ai_api_keys) {
          localStorage.setItem('ai_api_keys', JSON.stringify(data.ai_api_keys));
        }
        return data;
      }
      return null;
    } catch (err) {
      console.error("Exception in fetchUserData:", err);
      return null;
    }
  },

  /**
   * Create or update user data in Supabase from current localStorage
   */
  async saveUserData() {
    if (!db) return;
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    try {
      const name = localStorage.getItem('userName') || email.split('@')[0];
      const tier = localStorage.getItem('userTier') || 'Unlimited';
      const pluginId = localStorage.getItem('user_plugin_id') || '';
      
      let robloxAccounts = [];
      try {
        robloxAccounts = JSON.parse(localStorage.getItem('roblox_accounts') || '[]');
      } catch(e) {}

      let aiApiKeys = {};
      try {
        aiApiKeys = JSON.parse(localStorage.getItem('ai_api_keys') || '{}');
      } catch(e) {}

      const payload = {
        email: email.trim().toLowerCase(),
        name: name,
        tier: tier,
        plugin_id: pluginId,
        roblox_accounts: robloxAccounts,
        ai_api_keys: aiApiKeys
      };

      const { error } = await db
        .from('users_data')
        .upsert(payload, { onConflict: 'email' });

      if (error) {
        console.error("Error saving user data to Supabase:", error);
      } else {
        console.log("Success syncing data to Supabase database.");
      }
    } catch (err) {
      console.error("Exception in saveUserData:", err);
    }
  }
};
