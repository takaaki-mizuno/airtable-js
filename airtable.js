/*!
 * airtable.js – tiny vanilla-JS wrapper for the Airtable Web API
 * 2025-05-31 – MIT License
 */
(function (global) {
  'use strict';

  /** Utility: query-string builder */
  function qs(obj) {
    if (!obj) return '';
    const esc = encodeURIComponent;
    const pairs = Object.keys(obj)
      .filter((k) => obj[k] !== undefined && obj[k] !== null)
      .map((k) => `${esc(k)}=${esc(obj[k])}`);
    return pairs.length ? `?${pairs.join('&')}` : '';
  }

  /** Core client */
  function AirtableClient({ token, baseId }) {
    if (!token) throw new Error('AirtableClient: "token" is required');
    this._token = token;
    this._baseId = baseId || '';
    this._root = 'https://api.airtable.com/v0/';
    this._hdrs = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  /** (Optional) base を後から差し替える */
  AirtableClient.prototype.base = function (baseId) {
    this._baseId = baseId;
    return this;
  };

  /**
   * テーブルハンドラ
   * 例: airtable.table('Tasks').list({maxRecords:10}).then(console.log);
   */
  AirtableClient.prototype.table = function (tableName) {
    if (!this._baseId)
      throw new Error('AirtableClient: call .base(baseId) first');
    const endpoint = `${this._root}${this._baseId}/${encodeURIComponent(
      tableName
    )}`;

    const headers = this._hdrs;

    /** 内部: fetch & JSON */
    const go = (url, opt = {}) =>
      fetch(url, { headers, ...opt }).then(async (r) => {
        if (!r.ok) {
          const t = await r.text();
          throw new Error(`Airtable API error ${r.status}: ${t}`);
        }
        return r.json();
      });

    return {
      /** List records – params: view, filterByFormula, maxRecords … */
      list: (params) => go(endpoint + qs(params)),

      /** Get single record */
      get: (id) => {
        if (!id) throw new Error('recordId required');
        return go(`${endpoint}/${id}`);
      },

      /** Create record – fields は {Title:'foo', Status:'Done'} 形式 */
      create: (fields) =>
        go(endpoint, { method: 'POST', body: JSON.stringify({ fields }) }),

      /** Update record (PATCH) */
      update: (id, fields) =>
        go(`${endpoint}/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ fields }),
        }),

      /** Delete record */
      destroy: (id) => go(`${endpoint}/${id}`, { method: 'DELETE' }),

      /**
       * listAll – ページネーションを自動でたどって全件取得
       *   const all = await airtable.table('Tasks').listAll({ pageSize: 100 });
       */
      listAll: async function (params) {
        const records = [];
        let offset,
          p = { pageSize: 100, ...params };
        do {
          const res = await go(endpoint + qs({ ...p, offset }));
          records.push(...res.records);
          offset = res.offset;
        } while (offset);
        return records;
      },
    };
  };

  /** ファクトリ関数 */
  AirtableClient.init = (cfg) => new AirtableClient(cfg);

  /** export */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = AirtableClient; // Node/CommonJS
  } else {
    global.Airtable = AirtableClient; // Browser global
  }
})(typeof self !== 'undefined' ? self : this);
