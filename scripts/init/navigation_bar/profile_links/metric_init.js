function createMetricForm(metricData, activityList) {
    // Create main container
    var container = document.createElement('div');
    container.className = 'px-4 mt-4';

    // Create navigation
    var nav = document.createElement('nav');
    nav.className = 'nav nav-borders';
    var navLinks = [
        { text: 'Profile', href: './profile.html' },
        { text: 'Metrics', href: './metrics.html' },
        { text: 'Journal', href: './journal.html' },
        { text: 'Recommendations', href: './recommendations.html' },
        { text: 'Notifications', href: './notifications.html' }
    ];
    navLinks.forEach(function(link) {
        var linkElement = document.createElement('a');
        linkElement.className = 'nav-link';
        linkElement.href = link.href;
        linkElement.textContent = link.text;
        nav.appendChild(linkElement);
    });
    container.appendChild(nav);

    // Create horizontal rule
    var hr = document.createElement('hr');
    hr.className = 'mt-0 mb-4';
    container.appendChild(hr);

    // Create form
    var formContainer = document.createElement('div');
    formContainer.className = 'row';
    var formCard = document.createElement('div');
    formCard.className = 'col-xl-12 card mb-4';
    formCard.innerHTML = `
    <div class="card-header">Metrics</div>
    <div class="card-body">
        <form id="metricForm">
            <div class="row mb-3">
                <div class="row">
                  <label class="small mb-1" for="inputHeight">Height</label>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <input class="form-control" id="inputHeight" type="number" placeholder="Enter your height" value="${metricData.HEIGHT}" required>
                  </div>
                  <div class="col-md-6">
                    <!-- Select for Height Type -->
                    <select class="form-select" id="selectHeightType" required>
                        <option ${metricData.MEASUREMENT_HEIGHT_TYPE == 'CM' ? 'selected' : ''} value="CM">Centimeters</option>
                        <option ${metricData.MEASUREMENT_HEIGHT_TYPE == 'IN' ? 'selected' : ''} value="IN">Inches</option>
                    </select>
                  </div>
                </div>
            </div>
            <div class="row mb-3">
              <div class="row">
                <label class="small mb-1" for="inputWeight">Weight</label>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <input class="form-control" id="inputWeight" type="number" placeholder="Enter your weight" value="${metricData.WEIGHT}" required>
                </div>
                <div class="col-md-6">
                  <!-- Select for Weight Type -->
                  <select class="form-select" id="selectWeightType" required>
                      <option ${metricData.MEASUREMENT_WEIGHT_TYPE == 'kg' ? 'selected' : ''} value="kg">Kilograms</option>
                      <option ${metricData.MEASUREMENT_WEIGHT_TYPE == 'lb' ? 'selected' : ''} value="lb">Pounds</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="inputGender">Gender</label>
                <input class="form-control" id="inputGender" type="text" placeholder="Enter your gender" value="${metricData.GENDER? metricData.GENDER: ''}" required>
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="inputAge">Age</label>
                <input class="form-control" id="inputAge" type="number" placeholder="Enter your age" value="${metricData.AGE}" required>
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="inputBodyFat">Body Fat</label>
                <input class="form-control" id="inputBodyFat" type="number" placeholder="Enter your body fat" value="${metricData.BODYFAT}">
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="selectActivity">Activity</label>
                <!-- Select for Activity Level -->
                <select class="form-select" id="selectActivity" required>
                  ${activityList.map(activity => `<option value="${activity.ACTIVITY_ID}" ${activity.ACTIVITY_ID === metricData.selectedActivity ? 'selected' : ''}>${activity.ACTIVITY_ID}</option>`).join('')}
                </select>
            </div>
            <div class="mb-3">
                <label class="small mb-1" for="inputGoal">Weight Goal</label>
                <input class="form-control" id="inputGoal" type="number" placeholder="Enter your ideal weight" value="${metricData.GOAL}" required>
            </div>
            <button class="btn btn-primary" type="submit">Save changes</button>
        </form>
    </div>    
    `;
    formContainer.appendChild(formCard);
    container.appendChild(formContainer);
  
    // Append the container to the main tag
    document.querySelector('main').appendChild(container);

    document.getElementById('metricForm').addEventListener('submit', async function(event){
      event.preventDefault();
      console.log("Clicked");
      const height = document.getElementById('inputHeight').value;
      const heightType = document.getElementById('selectHeightType').value;
      const weight = document.getElementById('inputWeight').value;
      const weightType = document.getElementById('selectWeightType').value;
      const gender = document.getElementById('inputGender').value;
      const age = document.getElementById('inputAge').value;
      const bodyFat = document.getElementById('inputBodyFat').value;
      const activityId = document.getElementById('selectActivity').value;
      const goal = document.getElementById('inputGoal').value;

      const requestBody = {
          HEIGHT: height,
          HEIGHT_TYPE: heightType,
          WEIGHT: weight,
          WEIGHT_TYPE: weightType,
          GENDER: gender,
          AGE: age,
          BODY_FAT: bodyFat,
          ACTIVITY_ID: activityId,
          GOAL: goal? goal: null
      };
      
      console.log(requestBody);
      const data = await fetchDataWithBody('/php/init/profile_links/update_metric_data.php', requestBody);
      console.log(data);

      if(data.isUpdated){
          location.reload();
      }
      else{
          alert('Update didn\'t go through');
      }

      console.log(height, weight, gender, age, bodyFat, activityId, goal);
    });

  }