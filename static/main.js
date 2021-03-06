$(document).ready(function () {

	$("#image-upload").submit(function (e) {

		e.preventDefault(); // avoid to execute the actual submit of the form.

		var form = $('#imageURL').val();
		//$('.img-preview').show();
		document.getElementById("img-preview").style.border = "5px solid #94fbab";
		$('#imagePreview').css('background-image', 'url(' + form + ')');

		$.ajax({
			type: "POST",
			url: '/predict',
			data: form, // serializes the form's elements.
			success: function (response) {
				// Get and display the result
				$('#div1').empty();
				for (let i = 0; i < response.foodItems.length; i++) {
					var para = document.createElement("p");
					var node = document.createTextNode(response.foodItems[i] + "kg");
					para.appendChild(node);
					var element = document.getElementById("div1");
					element.appendChild(para);
				}

				$('#result').text('Bữa ăn của bạn thải ra ' + response.result.toFixed(2) + " kg CO2. Cụ thể:");


			},
			error: function (u) {
				$('#result').text("Đường dẫn không tồn tại. Vui lòng thử đường dẫn khác.");
			}
		});


	});

	// $("#imageUpload").change(function () {
	// 		$('.image-section').show();
	// 		// $('#btn-predict').show();
	// 		// $('#result').text('');
	// 		// $('#result').hide();
	// 		// readURL(this);
	// });

	// Predict
	// $('#btn-predict').click(function () {
	// 		var form_data = new FormData($('#upload-file')[0]);

	// 		// Show loading animation
	// 		$(this).hide();
	// 		$('.loader').show();

	// 		// Make prediction by calling api /predict
	// 		$.ajax({
	// 				type: 'POST',
	// 				url: '/predict',
	// 				data: form_data,
	// 				contentType: false,
	// 				cache: false,
	// 				processData: false,
	// 				async: true,
	// 				success: function (data) {
	// 						// Get and display the result
	// 						$('.loader').hide();
	// 						$('#result').fadeIn(600);
	// 						$('#result').text(' Result:  ' + data);
	// 						console.log('Success!');
	// 				},
	// 		});
	// });

});
