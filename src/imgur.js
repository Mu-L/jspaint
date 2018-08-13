var $imgur_window;

function upload_to_imgur(){
	if($imgur_window){
		$imgur_window.close();
	}
	$imgur_window = $FormWindow().title("Upload To Imgur").addClass("dialogue-window");
	$imgur_window.$main.html(
		"<label>URL: </label>" +
		"<label id='imgur-description'>Click to upload</label>" +
		"<a id='imgur-url' href='' target='_blank'></a>"
	);
	// TODO: a button to copy the URL directly (to the clipboard)

	var $imgur_url = $imgur_window.$main.find("#imgur-url");
	var $imgur_description = $imgur_window.$main.find("#imgur-description");

	// deselect early so its more obvious perhaps, or obvious why it would deselect
	// and more similar to the File > Save options anyway
	deselect();
	// TODO: maybe capture the image after deselecting and display it in the window
	// which would work well for GIFs as well, passing in a blob to upload
	// (TODO: add an option to upload rendered GIFs)
	
	// TODO: prevent uploading a ton of times at once by holding down enter
	// by reworking the UI
	$imgur_window.$Button("Upload", function(){
		// (don't assume a selection won't be made between opening the dialogue and uploading)
		// include the selection in the saved image (by deselecting)
		deselect();

		// base64 encoding to send to Imgur API
		// TODO: send a Blob instead (and sanity_check_blob first)
		var base64 = canvas.toDataURL().split(",")[1];
		var payload = {
			image: base64,
		};

		// send HTTP request to the Imgur image upload API
		$.ajax({
			type: "POST",
			url: "https://api.imgur.com/3/image",
			headers: {
				"Authorization": "Client-ID 203da2f300125a1",
			},
			dataType: 'json', // of what's expected from the server, NOT what we're sending
			data: payload, // what we're sending
			beforeSend: function(){
				$imgur_description.text("Loading...");
			},
			success: function(data){
				var url = data.data.link;
				$imgur_description.text("");
				$imgur_url.text(url);
				$imgur_url.attr('href', url);
				// TODO: option to delete the uploaded image, using:
				// "https://api.imgur.com/3/image/" + data.deletehash
			},
			error: function(error){
				$imgur_description.text("Error uploading image :(");
			},
		})
	});
	$imgur_window.$Button("Cancel", function(){
		$imgur_window.close();
	});
	$imgur_window.width(300);
	$imgur_window.center();
}
