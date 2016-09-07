var defaultAction = "restart_run_all";

function loadOptions() {
  chrome.storage.sync.get({
    kernelAction: defaultAction,
  }, function(items) {
    document.getElementById('kernel').value = items.kernelAction;
  });
}

function saveOptions() {
	var select = document.getElementById("kernel");
	var action = select.children[select.selectedIndex].value;
  chrome.storage.sync.set({
    kernelAction: action
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function eraseOptions() {
	location.reload();
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', eraseOptions);
