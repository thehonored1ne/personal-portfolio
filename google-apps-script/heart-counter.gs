const COUNTER_KEY = "portfolio_like_count";
const RATE_LIMIT_SECONDS = 24 * 60 * 60;

function doGet(e) {
    const action = e && e.parameter ? e.parameter.action : "get";
    const visitor = e && e.parameter ? e.parameter.visitor : "";
    const properties = PropertiesService.getScriptProperties();
    const cache = CacheService.getScriptCache();
    const lock = LockService.getScriptLock();

  lock.waitLock(5000);

  try {
    let count = Number(properties.getProperty(COUNTER_KEY) || 0);

    if (action === "up" && visitor && !cache.get(`liked:${visitor}`)) {
      count += 1;
      properties.setProperty(COUNTER_KEY, String(count));
      cache.put(`liked:${visitor}`, "1", RATE_LIMIT_SECONDS);
    }

    return jsonResponse({ count });
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
