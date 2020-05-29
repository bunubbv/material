//윈도우 사이즈에 따라 변경을 할지 않할 지 체크한다.
var isAllowRequestList = true;
//매개 변수 parent는 ul태그여야 합니다
function ShowAjaxRecentList(parent) {
	function temp() {
		jQuery.ajax({
			url: "/api/recent_changes", // 호출 URL
			dataType:'json'
		})

		.done(function(res) {
			var html = "";
			for(var i = 0 ; i < res.length && i < 10 ; i++) {
				var item = res[i];
        		html += '<a class="recent-item" href = "/w/' + encodeURIComponent(item[1]) + '" title="' + item[1] +'">';
				var text = item[1];
				if(text.length > 13) {
					text = text.substr(0,13);
					text +="...";
				}
				html += text;
				html += "</a><br>"
			}
			if(parent != null) {
				jQuery(parent).html(html);
			}
		});
	}
	temp();
}

/**
 * Vector-specific scripts
 */
var recentIntervalHandle = null;
jQuery( function ( jQuery ) {
	var width = jQuery(window).width();
	if(width > 1023) {
		isAllowRequestList = true;
		ShowAjaxRecentList(jQuery("#live-recent-list"));
	}
	else {
		isAllowRequestList = false;
	}

	//만약에 화면의 사이즈가 작아 최근 변경글이 안보일 시, 갱신을 하지 않는다.
	jQuery(window).resize(recentIntervalCheck);
});

var recentIntervalCheck = function() {
	var width = jQuery(window).width();
	if(width <= 1023) {
		if(recentIntervalHandle != null) {
			clearInterval(recentIntervalHandle);
			recentIntervalHandle = null;
		}
		isAllowRequestList = false;
	} else {
		if(recentIntervalHandle == null) {
			recentIntervalHandle = setInterval(function() {
				ShowAjaxRecentList(jQuery("#live-recent-list"));
			}, 60 * 1000);
		}
		isAllowRequestList = true;
	}
}

jQuery(document).ready(function(jQuery) {
	recentIntervalCheck();
});

