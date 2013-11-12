<?php
	$data = file_get_contents("data");
	$rows = explode("\n", $data);
	$points = array();
	$totals = array();
	foreach ($rows as $row) {
		$fields = explode(",", $row);
		$lat = $fields[0];
		$lng = $fields[1];
		appendTotals($totals, 0, $fields[2]);
		for ($i = 1; $i <= 12; $i++) {
			$count = $fields[$i + 2];
			
			if ($count != 0) {
				appendTotals($totals, $i, $count);
				appendPoints($points, $i, $fields[0], $fields[1], $count);
			}
		}
	}
	
	$result = array(
		'totals' => $totals,
		'points' => $points
	);
	
	//echo "<pre>";
	//print_R($result);
	//echo "</pre>";
	
	echo json_encode($result);
	
	function appendPoints(&$points, $index, $lat, $lng, $count = 1) {
		if (!isset($points[$index])) {
			$points[$index] = array();
		}
		
		$points[$index] []= array(
			'lat' => $lat,
			'lng' => $lng,
			'count' => $count
		);
	}
	
	function appendTotals(&$totals, $index, $value) {
		if (!isset($totals[$index])) {
			$totals[$index] = 0;
		}
		
		$totals[$index] += $value;
	}
?>
