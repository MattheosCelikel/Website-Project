/**
 * Creates the bootstrap spinner instance that can be loaded onto any page using 
 * an intermediary tag
 */
function init_spinner(){
    
    var spinnerContainer = document.createElement('div');
    spinnerContainer.innerHTML = `
    <div
        style="z-index: 9999" 
        class="modal fade" 
        id="spinnerOverlay" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="spinnerOverlayLabel" 
        aria-hidden="true"
        role="dialog"
    >
    <div class="modal-dialog modal-dialog-centered bg-transparent">
    <div class="modal-content border-0 bg-transparent">
        <div class="modal-body text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    </div>
</div>`;

    // Append modal container to intermediary tag
    document.querySelector('intermediary').appendChild(spinnerContainer);
}

function showSpinner() {
    var spinnerOverlay = document.getElementById('spinnerOverlay');
    if (spinnerOverlay) {
        spinnerOverlay.classList.add('show');
        spinnerOverlay.style.display = 'block';
    }
}

function hideSpinner() {
    var spinnerOverlay = document.getElementById('spinnerOverlay');
    if (spinnerOverlay) {
        spinnerOverlay.classList.remove('show');
        spinnerOverlay.style.display = 'none';
    }
}