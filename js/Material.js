function materialButton() {
	const button = document.getElementsByTagName("button");
	for (let i = 1; i < button.length; i++) {
		button[i].setAttribute("class", "btn btn-white");
	}
}

btn();

var recentChangesEnable = true;

function recentChanges(parent) {
	function ajaxRequest() {
		jQuery.ajax({url: "/api/recent_changes?repeat=0", dataType:'json'})

		.done(function(res) {
			var result = "";
			for(var i = 0 ; i < res.length && i < 10 ; i++) {
				var item = res[i];
        		result += '<a class="recent-item" href = "/w/' + encodeURIComponent(item[1]) + '" title="' + item[1] +'">';
				var text = item[1];
				if(text.length > 13) {
					text = text.substr(0,13);
					text +="...";
				}
				result += text;
				result += "</a><br>"
			}
			if(parent != null) {
				jQuery(parent).html(result);
			}
		});
	}
	ajaxRequest();
}