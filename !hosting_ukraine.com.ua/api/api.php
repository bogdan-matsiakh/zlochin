<?php
	require_once './google/Google_Client.php';
	require_once './google/contrib/Google_PlusService.php';

	session_start();

	$client = new Google_Client();
	$client->setApplicationName("Uncolab");
	// Visit https://code.google.com/apis/console to generate your
	// oauth2_client_id, oauth2_client_secret, and to register your oauth2_redirect_uri.
	$client->setClientId('1019258099033.apps.googleusercontent.com');
	$client->setClientSecret('BbWhurwFfPOfFda5pfeqmcxc');
	$client->setRedirectUri('http://api.uncolab.com/success.html');
	$client->setDeveloperKey('AIzaSyCcabeoOsqKYLRc-Thz8BtwNt8l3CsCjqc');
	$plus = new Google_PlusService($client);

	if (isset($_REQUEST['logout'])) {
	  unset($_SESSION['access_token']);
	}

	if (isset($_GET['code'])) {
	  $client->authenticate($_GET['code']);
	  $_SESSION['access_token'] = $client->getAccessToken();
	  header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
	}

	if (isset($_SESSION['access_token'])) {
	  $client->setAccessToken($_SESSION['access_token']);
	}

	if ($client->getAccessToken()) {
	  $me = $plus->people->get('me');

	  // These fields are currently filtered through the PHP sanitize filters.
	  // See http://www.php.net/manual/en/filter.filters.sanitize.php
	  $url = filter_var($me['url'], FILTER_VALIDATE_URL);
	  $img = filter_var($me['image']['url'], FILTER_VALIDATE_URL);
	  $name = filter_var($me['displayName'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
	  $personMarkup = "<a rel='me' href='$url'>$name</a><div><img src='$img'></div>";

	  $optParams = array('maxResults' => 100);
	  $activities = $plus->activities->listActivities('me', 'public', $optParams);
	  $activityMarkup = '';
	  foreach($activities['items'] as $activity) {
		// These fields are currently filtered through the PHP sanitize filters.
		// See http://www.php.net/manual/en/filter.filters.sanitize.php
		$url = filter_var($activity['url'], FILTER_VALIDATE_URL);
		$title = filter_var($activity['title'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
		$content = filter_var($activity['object']['content'], FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
		$activityMarkup .= "<div class='activity'><a href='$url'>$title</a><div>$content</div></div>";
	  }

	  // The access token may have been updated lazily.
	  $_SESSION['access_token'] = $client->getAccessToken();
	} else {
	  $authUrl = $client->createAuthUrl();
	}
?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel='stylesheet' href='style.css' />
</head>
<body>
<header><h1>Google+ Sample App</h1></header>
<div class="box">

<?php if(isset($personMarkup)): ?>
<div class="me"><?php print $personMarkup ?></div>
<?php endif ?>

<?php if(isset($activityMarkup)): ?>
<div class="activities">Your Activities: <?php print $activityMarkup ?></div>
<?php endif ?>

<?php
  if(isset($authUrl)) {
    print "<a class='login' href='$authUrl'>Connect Me!</a>";
  } else {
   print "<a class='logout' href='?logout'>Logout</a>";
  }
?>
</div>
</body>
</html>