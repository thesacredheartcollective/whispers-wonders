import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(200),
        email: z.string().email().max(320),
        subject: z.string().min(1).max(500),
        message: z.string().min(1).max(5000),
      }))
      .mutation(async ({ input }) => {
        const { name, email, subject, message } = input;
        
        // Notify the site owner via the built-in notification system
        await notifyOwner({
          title: `New Contact Form: ${subject}`,
          content: `From: ${name} (${email})\n\nSubject: ${subject}\n\n${message}`,
        });

        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
