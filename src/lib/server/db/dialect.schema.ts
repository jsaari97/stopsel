import { relations } from 'drizzle-orm';
import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const dialectRegion = sqliteTable(
  'dialect_region',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    code: text('code').notNull().unique(),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull(),
    isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull()
  },
  (table) => [index('dialect_region_active_sort_idx').on(table.isActive, table.sortOrder)]
);

export const dialectArea = sqliteTable(
  'dialect_area',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    dialectRegionId: integer('dialect_region_id')
      .notNull()
      .references(() => dialectRegion.id, { onDelete: 'restrict' }),
    sourceCode: text('source_code').notNull(),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull(),
    isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull()
  },
  (table) => [
    uniqueIndex('dialect_area_region_source_uidx').on(table.dialectRegionId, table.sourceCode),
    index('dialect_area_region_active_sort_idx').on(
      table.dialectRegionId,
      table.isActive,
      table.sortOrder
    )
  ]
);

export const dialectRegionRelations = relations(dialectRegion, ({ many }) => ({
  areas: many(dialectArea)
}));

export const dialectAreaRelations = relations(dialectArea, ({ one }) => ({
  region: one(dialectRegion, {
    fields: [dialectArea.dialectRegionId],
    references: [dialectRegion.id]
  })
}));
