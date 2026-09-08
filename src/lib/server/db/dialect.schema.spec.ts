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

describe('dialect reference data', () => {
  it('contains all regions and source areas', () => {
    const regionCount = client.prepare('SELECT count(*) AS count FROM dialect_region').get() as {
      count: number;
    };
    const areaCount = client.prepare('SELECT count(*) AS count FROM dialect_area').get() as {
      count: number;
    };

    expect(regionCount.count).toBe(11);
    expect(areaCount.count).toBe(85);
  });

  it('keeps Terjärv, Nedervetil, and Kronoby as separate areas', () => {
    const areas = client
      .prepare(
        `SELECT dialect_area.name
         FROM dialect_area
         JOIN dialect_region ON dialect_region.id = dialect_area.dialect_region_id
         WHERE dialect_region.code = 'norra-osterbotten'
           AND dialect_area.source_code IN ('Tj', 'Nv', 'Kr')
         ORDER BY dialect_area.sort_order`
      )
      .all() as { name: string }[];

    expect(areas.map(({ name }) => name)).toEqual(['Nedervetil', 'Terjärv', 'Kronoby']);
  });

  it('offers Pargas in both source regions', () => {
    const regions = client
      .prepare(
        `SELECT dialect_region.name
         FROM dialect_area
         JOIN dialect_region ON dialect_region.id = dialect_area.dialect_region_id
         WHERE dialect_area.source_code = 'Pa'
         ORDER BY dialect_region.sort_order`
      )
      .all() as { name: string }[];

    expect(regions.map(({ name }) => name)).toEqual(['Västra Åboland', 'Östra Åboland']);
  });

  it('does not permit the same source area twice in one region', () => {
    expect(() =>
      client
        .prepare(
          `INSERT INTO dialect_area
            (dialect_region_id, source_code, name, sort_order)
           VALUES (1, 'Tj', 'Terjärv', 99)`
        )
        .run()
    ).toThrow();
  });
});
