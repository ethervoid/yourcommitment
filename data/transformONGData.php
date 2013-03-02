<?php
	$results = array();
	if (($gestor = fopen("ONGData.csv", "r")) !== FALSE) {
	    $data = fgetcsv($gestor, 0, ",");

		for ($i = 0; $i < count($data); $i += 4){
			$inicio = ((int)$i/4) * 4;
			$country	= $data[$inicio];
			$code		= $data[$inicio + 1];
			$indicator	= $data[$inicio + 2];
			$dato		= $data[$inicio + 3];

			$results[$code]['name']		= $code;
			$results[$code][$indicator]	= $dato;
		}        
	}
	fclose($gestor);

	//	Get headers from ZWE
	$header = "";
	foreach ($results['ZWE'] as $key => $value)
		$header .= $key.',';
	echo rtrim($header, ',')."\n";

	//	GET country data
	foreach ($results as $country) {
		$line = "";
		foreach ($country as $key => $value)
			$line .= $value.',';
		echo rtrim($line, ',')."\n";
	}
?>