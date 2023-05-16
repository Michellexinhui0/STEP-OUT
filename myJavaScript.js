const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

$(document).ready(function() {
	$('#calendar').datetimepicker(); // Initialize the date picker

	// Prevent closing the dropdown when clicking inside the date picker
	$('.dropdown-menu').click(function(e) {
	  e.stopPropagation();
	});
  });

