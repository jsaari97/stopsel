import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { dialectArea } from './dialect.schema';

export const prompt = sqliteTable(
  'prompt',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
    createdAt: integer('created_at')
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull()
  },
  (table) => [index('prompt_active_idx').on(table.isActive)]
);

export const promptVersion = sqliteTable(
  'prompt_version',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    promptId: integer('prompt_id')
      .notNull()
      .references(() => prompt.id, { onDelete: 'restrict' }),
    version: integer('version').notNull(),
    text: text('text').notNull(),
    createdAt: integer('created_at')
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull()
  },
  (table) => [uniqueIndex('prompt_version_prompt_version_uidx').on(table.promptId, table.version)]
);

export const dailyPrompt = sqliteTable(
  'daily_prompt',
  {
    scheduledDate: text('scheduled_date').primaryKey(),
    promptVersionId: integer('prompt_version_id')
      .notNull()
      .references(() => promptVersion.id, { onDelete: 'restrict' }),
    source: text('source', { enum: ['scheduled', 'fallback'] }).notNull(),
    createdAt: integer('created_at')
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull()
  },
  (table) => [index('daily_prompt_version_idx').on(table.promptVersionId)]
);

export const guestIdentity = sqliteTable(
  'guest_identity',
  {
    id: text('id').primaryKey(),
    tokenHash: text('token_hash').notNull().unique(),
    createdAt: integer('created_at')
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull()
  },
  (table) => [index('guest_identity_created_idx').on(table.createdAt)]
);

export const contribution = sqliteTable(
  'contribution',
  {
    id: text('id').primaryKey(),
    promptVersionId: integer('prompt_version_id')
      .notNull()
      .references(() => promptVersion.id, { onDelete: 'restrict' }),
    dialectAreaId: integer('dialect_area_id')
      .notNull()
      .references(() => dialectArea.id, { onDelete: 'restrict' }),
    guestIdentityId: text('guest_identity_id')
      .notNull()
      .references(() => guestIdentity.id, { onDelete: 'cascade' }),
    responseText: text('response_text').notNull(),
    submittedAt: integer('submitted_at')
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    moderationState: text('moderation_state', {
      enum: ['pending', 'visible', 'hidden', 'rejected']
    })
      .default('pending')
      .notNull(),
    privacyNoticeVersion: text('privacy_notice_version').notNull(),
    submissionTermsVersion: text('submission_terms_version').notNull()
  },
  (table) => [
    index('contribution_guest_submitted_idx').on(table.guestIdentityId, table.submittedAt),
    index('contribution_prompt_state_idx').on(table.promptVersionId, table.moderationState),
    index('contribution_dialect_idx').on(table.dialectAreaId)
  ]
);

export const promptRelations = relations(prompt, ({ many }) => ({
  versions: many(promptVersion)
}));

export const promptVersionRelations = relations(promptVersion, ({ one, many }) => ({
  prompt: one(prompt, { fields: [promptVersion.promptId], references: [prompt.id] }),
  dailyPrompts: many(dailyPrompt),
  contributions: many(contribution)
}));

export const dailyPromptRelations = relations(dailyPrompt, ({ one }) => ({
  promptVersion: one(promptVersion, {
    fields: [dailyPrompt.promptVersionId],
    references: [promptVersion.id]
  })
}));

export const guestIdentityRelations = relations(guestIdentity, ({ many }) => ({
  contributions: many(contribution)
}));

export const contributionRelations = relations(contribution, ({ one }) => ({
  promptVersion: one(promptVersion, {
    fields: [contribution.promptVersionId],
    references: [promptVersion.id]
  }),
  dialectArea: one(dialectArea, {
    fields: [contribution.dialectAreaId],
    references: [dialectArea.id]
  }),
  guestIdentity: one(guestIdentity, {
    fields: [contribution.guestIdentityId],
    references: [guestIdentity.id]
  })
}));
