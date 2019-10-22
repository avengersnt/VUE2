<?php
$url = 'https://map.yahooapis.jp/search/local/V1/localSearch?output=json&appid=dj00aiZpPWk0clhRdTdrVVd0ZiZzPWNvbnN1bWVyc2VjcmV0Jng9ZDA-&gc=0306005';
$json = file_get_contents($url);
header("Access-Control-Allow-Origin: *");
print $json;
?>
