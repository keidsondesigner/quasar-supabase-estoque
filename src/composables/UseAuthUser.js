import { ref } from 'vue';
import useSupabase from 'boot/supabase';
// user is set outside of the useAuthUser function
// so that it will act as global state and always refer to a single user

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário

const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();
  /**
   * Login with email and password
   */

  const login = async ({ email, password }) => {
    const { authenticatedUser, error } = await supabase.auth
      .signInWithPassword({ email, password });

    if (error) throw error;
    return authenticatedUser;
  };

  /**
   * Login with google, github, etc
   */
  const loginWithSocialProvider = async (provider) => {
    const { user: authenticatedUser, error } = await supabase.auth.signIn({ provider });
    if (error) throw error;
    return authenticatedUser;
  };

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => !!user.value;

  /**
   * Register
   */
  const register = async ({ email, password, ...data }) => {
    const { registeredUser, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: { ...data },
          emailRedirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
        },
      },
    );
    if (error) throw error;
    return registeredUser;
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {
    const { updatedUser, error } = await supabase.auth.update(data);
    if (error) throw error;
    return updatedUser;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordResetEmail = async (email) => {
    console.log(email);
    // eslint-disable-next-line no-shadow
    const { user, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return user;
  };

  const resetPassword = async (newPassword) => {
    // eslint-disable-next-line no-shadow
    const { user, error } = await supabase.auth.updateUser(
      { password: newPassword },
    );
    if (error) throw error;
    return user;
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordResetEmail,
    resetPassword,
  };
}
