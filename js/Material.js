function materialButton() {
	const button = document.getElementsByTagName("button");
	for (let i = 1; i < button.length; i++) {
		button[i].setAttribute("class", "btn btn-white");
	}
}

materialButton();

function getRecentChanges() {
	jQuery.ajax({
    	url: "/api/recent_changes?repeat=0", dataType:'json',

    	success:function(data) {
			var result = "";

        	for (let i = 0; i < data.length && i < 10; i++) {
				var list = data[i];
				var split = list[1];

				result += '<a class="recent-item" href = "/w/' + encodeURIComponent(list[1]) + '" title="' + list[1] +'">';

				if (split.length > 12) {
					split = split.substr(0, 12);
					split += "...";
				}

				result += split;
				result += "</a><br>"
			}

            jQuery("#live-recent-list").html(result);
        }
    });
}

getRecentChanges();