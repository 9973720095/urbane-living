<?php
/*
  Blog sitemap that updates itself: https://urbaneliving.in/blog-sitemap.php
  Lists every blog added from the admin panel or the Google Sheet.
  It reads the backend once an hour and keeps a copy, so Google always gets a fast answer
  (even while the Render backend is waking up).
*/

$backend  = 'https://urbane-living.onrender.com/api/blogs/sitemap.xml';
$cache    = __DIR__ . '/.blog-sitemap-cache.xml';
$maxAge   = 3600; // seconds (1 hour)

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$isFresh = is_file($cache) && (time() - filemtime($cache) < $maxAge);

if (!$isFresh) {
    $ctx = stream_context_create([
        'http' => ['timeout' => 60, 'ignore_errors' => true, 'header' => "Accept: application/xml\r\n"],
    ]);
    $xml = @file_get_contents($backend, false, $ctx);
    // only keep a real sitemap (never cache an error page)
    if ($xml !== false && strpos($xml, '<urlset') !== false) {
        @file_put_contents($cache, $xml, LOCK_EX);
        echo $xml;
        exit;
    }
}

if (is_file($cache)) {
    readfile($cache); // last good copy
    exit;
}

// backend not reachable yet and no copy: valid empty sitemap
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>' . "\n";