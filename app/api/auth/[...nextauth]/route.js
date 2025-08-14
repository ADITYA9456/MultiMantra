import NextAuth from 'next-auth';
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import User from '@/app/models/User';
import connectDb from '@/public/db/connectDb';
import GitHubProvider from "next-auth/providers/github";

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    //   AppleProvider({
    //     clientId: process.env.APPLE_ID,
    //     clientSecret: process.env.APPLE_SECRET
    //   }),
    //   FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    //   }),
    //   GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET
    //   }),
    //   // Passwordless / email sign in
    //   EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    //   }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        try {
          await connectDb();
          // Check if the user already exists in the database
          const userEmail = user.email || profile.email;
          const currentUser = await User.findOne({ email: userEmail });
          
          if (!currentUser) {
            // Create a new user
            const username = userEmail.split("@")[0];
            
            // Check if username exists (to avoid duplicate usernames)
            const existingUsername = await User.findOne({ username });
            const finalUsername = existingUsername 
              ? `${username}${Math.floor(Math.random() * 1000)}` 
              : username;
              
            await User.create({
              email: userEmail,
              username: finalUsername,
              name: user.name || profile.name || finalUsername,
              profilepic: user.image || profile.avatar_url || profile.picture,
            });
          } else {
            // Update user info if needed
            if (user.name && !currentUser.name) {
              currentUser.name = user.name;
              await currentUser.save();
            }
            if (user.image && !currentUser.profilepic) {
              currentUser.profilepic = user.image;
              await currentUser.save();
            }
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          // Still allow sign in even if database operations fail
          return true;
        }
      }
      return true;
    },

    async session({ session, user, token }) {
      try {
        if (session?.user?.email) {
          const dbUser = await User.findOne({ email: session.user.email });
          if (dbUser) {
            // Set username from database
            session.user.name = dbUser.username;
            // Add any additional user data you want in session
            session.user.id = dbUser._id.toString();
            session.user.username = dbUser.username;
          }
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  }
})

export { authoptions as GET, authoptions as POST };

