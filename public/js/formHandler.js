function checkForName(str) {
    try {
      // Create a new URL object from the input string
      new URL(str);
      return true;  // If no error occurs, the string is a valid URL
    } catch (e) {
      return false;  // If an error occurs, the string is not a valid URL
    }
  }

  // Plotting emotions
function plotEmotionChart(emotionData) {
    const ctx = document.getElementById('emotionChart').getContext('2d');
    const labels = Object.keys(emotionData);
    const values = Object.values(emotionData);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Emotion Scores',
                data: values,
                backgroundColor: ['#FFA07A', '#FFD700', '#87CEEB', '#32CD32', '#DDA0DD']
            }]
        }
    });
}


// Only add the event listener if the DOM is fully loaded and not in a test environment
if (typeof document !== 'undefined') {
    const form = document.getElementById('urlForm');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
  }
  
    const resultDiv = document.getElementById("result");
    const sentimentEl = document.getElementById("sentiment");
    const confidenceEl = document.getElementById("confidence");
    const keyTopicsEl = document.getElementById("keyTopics");
    const entitiesEl = document.getElementById("entities");
    resultDiv.classList.add("hidden");


async function post_data(t){
    const data_obj = {};
    data_obj.msg = t;


    const response = await fetch('/analyze-sentiment',
    {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_obj),   
    });
    try{
        const data = await response.json();

        return data;
    }
    catch(error){
        console.log(error);
    }

}

async function handleSubmit(event) {
    event.preventDefault();

    resultDiv.classList.remove("hidden");

    // Get the URL from the input field
    const formText = document.getElementById('urlInput').value;

    // This is an example code that checks the submitted name. You may remove it from your code
    if(checkForName(formText))
    {
        document.getElementById('results').textContent = "Loading...";
        const res = await post_data(formText);
        document.getElementById('results').innerHTML = ' subjectivity : ' + res.subjectivity ;

        /////////////////////////////////////////////////////////////////////////
        sentimentEl.textContent = `Sentiment: ${res.score_tag}`;
        confidenceEl.textContent = `Confidence: ${res.confidence}%`;

        // Populate key topics
        keyTopicsEl.innerHTML = '';
        res.sentimented_concept_list.forEach((concept) => {
            const li = document.createElement("li");
            li.textContent = concept.form;
            keyTopicsEl.appendChild(li);
        });

        // Populate named entities
        entitiesEl.innerHTML = '';
        res.sentimented_entity_list.forEach((entity) => {
            const li = document.createElement("li");
            li.textContent = `${entity.form} (${entity.type})`;
            entitiesEl.appendChild(li);
        });

        // Plot emotional analysis (if available)
        plotEmotionChart(res.emotion);
        ///////////////////////////////////////////////////////////

    }
    else
    {
        document.getElementById('results').innerHTML = "not valid url";

    }

    
        
}
// Function to send data to the server

