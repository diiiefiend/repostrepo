<?php
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, "http://www.colourlovers.com/api/palettes/random");
  curl_setopt($curl, CURLOPT_HEADER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $xml = curl_exec($curl);
  curl_close($curl);

  header("Content-Type: text/xml; charset=utf-8");
  echo $xml;
?>
