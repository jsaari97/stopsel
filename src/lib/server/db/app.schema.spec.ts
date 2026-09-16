import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';

let client: Database.Database;

beforeAll(() => {
  client = new Database(':memory:');
  client.pragma('foreign_keys = ON');
  migrate(drizzle(client), { migrationsFolder: resolve(process.cwd(), 'drizzle') });
});

afterAll(() => {
  client.close();
});

describe('daily prompt and contribution schema', () => {
  it('includes active prompt seed data', () => {
    const prompts = client
      .prepare(
        `SELECT prompt_version.text
         FROM prompt_version
         JOIN prompt ON prompt.id = prompt_version.prompt_id
         WHERE prompt.is_active = true
         ORDER BY prompt.id`
      )
      .all() as { text: string }[];

    expect(prompts).toHaveLength(5);
    expect(prompts[0]?.text).toBe('Jag tänkte gå till affären efter jobbet.');
  });

  it('requires a valid guest, prompt version, and dialect area for a contribution', () => {
    expect(() =>
      client
        .prepare(
          `INSERT INTO contribution
            (id, prompt_version_id, dialect_area_id, guest_identity_id, response_text,
             privacy_notice_version, submission_terms_version)
           VALUES ('test', 1, 1, 'missing-guest', 'Test', 'development-1', 'development-1')`
        )
        .run()
    ).toThrow();
  });
});
