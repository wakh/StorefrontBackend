import { Pool, QueryResult } from 'pg'

const query = async (db: Pool, sql: string, txt?: (string | number)[]): Promise<QueryResult> => {
    const conn = await db.connect()
    const result = await conn.query(sql, txt ? txt : []);
    conn.release()
    return result
}

export default query