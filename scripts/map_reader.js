
		var fileInput = document.getElementById('fileInput');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					filevalue = reader.result;
					console.log(filevalue);
				}

				reader.readAsText(file);	
			} else {
				
				console.log("File not supported!");
			}
		});

