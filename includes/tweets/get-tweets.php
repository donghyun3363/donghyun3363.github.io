<?php

require_once('twitteroauth.php');

function affa_twitter_feeds_format_time($time) {
	
	$now	 = strtotime('now');
	$created = strtotime($time);
	$diff	 = $now - $created;
	$minute	 = 60;
	$hour	 = $minute * 60;
	$day	 = $hour * 24;
	$week	 = $day * 7;
	
	if (is_numeric($diff) && $diff > 0) {
		if ($diff < 3) return 'right now';
		if ($diff < $minute) return floor($diff) . ' ' . 'seconds ago';
		if ($diff < $minute * 2) return 'about 1 minute ago';
		if ($diff < $hour) return floor($diff / $minute) . ' ' . 'minutes ago';
		if ($diff < $hour * 2) return 'about 1 hour ago';
		if ($diff < $day) return floor($diff / $hour) . ' ' . 'hours ago'; 
		if ($diff > $day && $diff < $day * 2) return 'yesterday';
		if ($diff < $day * 365) return floor($diff / $day) . ' ' . 'days ago';
	}
	
	return 'over a year ago';
	
}

function affa_twitter_feeds_parse_link($str) {
	
	$patterns = array();
	$replaces = array();
	
	// Parse url to link.
	preg_match_all("/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/", $str, $urls); 
	foreach ($urls[0] as $url) {
		$patterns[] = $url;
		$replaces[] = '<a href="' . $url . '" target="_blank">' . $url . '</a>';
	}
	
	// Parse hashtag to link.
	preg_match_all("/[#]+([a-zA-Z0-9_]+)/", $str, $hashtags);
	foreach ($hashtags[1] as $hashtag) {
		$patterns[] = '#' . $hashtag;
		$replaces[] = '<a href="https://twitter.com/hashtag/' . $hashtag . '?src=hash" target="_blank">#' . $hashtag . '</a>';
	}
	
	// Parse mention to link.
	preg_match_all("/(?<=^|(?<=[^a-zA-Z0-9-_\.]))[@]+([a-zA-Z0-9_]+)/", $str, $usernames);
	foreach ($usernames[1] as $username) {
		$patterns[] = '@' . $username;
		$replaces[] = '<a href="https://twitter.com/' . $username . '" target="_blank">@' . $username . '</a>';
	}
	
	$str = str_replace($patterns, $replaces, $str);
	
	return $str;
	
}

function affa_twitter_feeds_get() {
	
	$userid				= 'twitter'; // Change with your twitter username
	$count				= 3;
	$consumerkey		= 'aZpZMYHD33nuYEcpqvHB9g';
	$consumersecret		= 'EyJKsMKckfETkRS5D27D1RK6OlwzCDWwWH5x6mpBPk';
	$accesstoken		= '354054292-bUUl96QdXBkJzkKVuzPvh53pCFuS9kZyWyfUpddo';
	$accesstokensecret	= 'M9ppPjGV5Jgsfvp7ylYPL6KbGSeN8dT64jaNPHBHrc';
	$output				= '';
	
	$connect = new TwitterOAuth($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
	$tweets	 = $connect->get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' . $userid . '&count=' . $count);
	
	if (!isset($tweets->errors) && $tweets) {
		$showdirecttweets = true;
		$showretweets	  = true;
		
		foreach ($tweets as $tweet) {
			$tweetusername	= $tweet->user->screen_name;
			$status			= $tweet->text;
			$tweetid		= $tweet->id_str;
			$created_at		= $tweet->created_at;
			$isaretweet		= false;
			$isdirect		= false;
			
			// If the tweet has been retweeted, get the profile pic of the tweeter
			if (isset($tweet->retweeted_status)) {
				$tweetusername	= $tweet->retweeted_status->user->screen_name;
				$tweetid		= $tweet->retweeted_status->id_str;
				$created_at		= $tweet->retweeted_status->created_at;
				$isaretweet		= true;
			}
			
			// Check to see if the tweet is a direct message
			if (substr($status, 0, 1) == '@') $isdirect = true;
			
			if (($showretweets == true || ($isaretweet == false && $showretweets == false)) && ($showdirecttweets == true || ($showdirecttweets == false && $isdirect == false))) {
				if ($status != '') {
					$output .= "<div class='affa-tweet'>\n";
					$output .= "<p>" . affa_twitter_feeds_parse_link($status) . "</p>\n";
					if (affa_twitter_feeds_format_time($created_at) != '') $output .= "<a href='http://twitter.com/" . $tweetusername . "/status/" . $tweetid . "' target='_blank' class='tweet-date'><i class='fa fa-clock-o'></i> " . affa_twitter_feeds_format_time($created_at) . "</a>";
					$output .= "</div>\n";
				}
			}
		}
	} else {
		$output .= "error|Error fetching feeds.";
	}
	
	echo $output;
	
}

affa_twitter_feeds_get();
