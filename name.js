function saveEntry() {
    const mood = document.getElementById("mood").value;
    const energy = document.getElementById("energy").value;
    const result = document.getElementById("result");

    if (!mood || !energy) {
        result.innerHTML = "⚠️ Please select both mood and energy level.";
        return;
    }

    const entry = {
        mood,
        energy,
        date: new Date().toLocaleDateString()
    };

    const data = JSON.parse(localStorage.getItem("mindpulseData")) || [];
    data.push(entry);
    localStorage.setItem("mindpulseData", JSON.stringify(data));

    // 🎯 CURRENT SITUATION MESSAGE
    let currentMessage = "";

    if (mood === "happy" && energy === "high") {
        currentMessage = "🌟 You are feeling positive and energetic right now. Keep it up!";
    } 
    else if (mood === "neutral" && energy === "medium") {
        currentMessage = "🌿 You seem calm and balanced at the moment.";
    } 
    else if (mood === "sad" && energy === "low") {
        currentMessage = "💙 You might be feeling low right now. Take rest and be kind to yourself.";
    } 
    else if (mood === "stressed") {
        currentMessage = "⚠️ You appear stressed currently. A short break or breathing exercise may help.";
    } 
    else {
        currentMessage = "🙂 Your emotional state is mixed. Maintain a healthy routine.";
    }

    result.innerHTML = `
        <b>Current Emotional Status:</b><br>
        ${currentMessage}
    `;
}

function generateSummary() {
    const summary = document.getElementById("summary");
    const data = JSON.parse(localStorage.getItem("mindpulseData")) || [];

    if (data.length === 0) {
        summary.innerHTML = "📭 No emotional data available yet.";
        return;
    }

    let moodCount = {};
    let energyCount = {};

    data.forEach(d => {
        moodCount[d.mood] = (moodCount[d.mood] || 0) + 1;
        energyCount[d.energy] = (energyCount[d.energy] || 0) + 1;
    });

    const dominantMood = Object.keys(moodCount)
        .reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);

    const dominantEnergy = Object.keys(energyCount)
        .reduce((a, b) => energyCount[a] > energyCount[b] ? a : b);

    // 🎯 SUMMARY GUIDANCE MESSAGE
    let guidanceMessage = "";

    if (dominantMood === "happy" && dominantEnergy === "high") {
        guidanceMessage = "🌈 Overall, you are doing very well. Continue your positive habits and routine.";
    } 
    else if (dominantMood === "neutral") {
        guidanceMessage = "🙂 Your emotional state is stable. Maintain balance and self-care.";
    } 
    else if (dominantMood === "sad") {
        guidanceMessage = "💙 You may be experiencing emotional lows frequently. Consider relaxation and talking to someone you trust.";
    } 
    else if (dominantMood === "stressed") {
        guidanceMessage = "⚠️ Stress appears often in your records. Try reducing workload and practicing mindfulness.";
    } 
    else {
        guidanceMessage = "🌱 Keep monitoring your emotions and focus on a healthy lifestyle.";
    }

    summary.innerHTML = `
        <p><b>Total Records:</b> ${data.length}</p>
        <p><b>Dominant Mood:</b> ${dominantMood}</p>
        <p><b>Energy Trend:</b> ${dominantEnergy}</p>
        <hr>
        <p><b>Overall Guidance:</b><br>${guidanceMessage}</p>
    `;
}
function showHistory() {
    const historyDiv = document.getElementById("history");
    const data = JSON.parse(localStorage.getItem("mindpulseData")) || [];

    if (data.length === 0) {
        historyDiv.innerHTML = "📭 No emotional history available.";
        return;
    }

    let historyHTML = "<ul style='padding-left:15px'>";

    data.forEach((entry, index) => {
        historyHTML += `
            <li style="margin-bottom:8px">
                <b>${entry.date}</b> —
                Mood: <span>${entry.mood}</span>,
                Energy: <span>${entry.energy}</span>
            </li>
        `;
    });

    historyHTML += "</ul>";

    historyDiv.innerHTML = historyHTML;
}
function showHistory() {
    const historyDiv = document.getElementById("history");
    const data = JSON.parse(localStorage.getItem("mindpulseData")) || [];

    if (data.length === 0) {
        historyDiv.innerHTML = "📭 No emotional history available.";
        return;
    }

    let historyHTML = "<ul style='list-style:none; padding-left:0'>";

    data.slice().reverse().forEach((entry, index) => {
        historyHTML += `
            <li style="margin-bottom:10px; padding:8px; background:#f8fafc; border-radius:6px">
                <b>${entry.date}</b><br>
                Mood: ${entry.mood} | Energy: ${entry.energy}
                <button 
                    style="float:right; background:#ef4444; color:white; border:none; padding:4px 8px; border-radius:4px"
                    onclick="deleteEntry(${data.length - 1 - index})">
                    Delete
                </button>
            </li>
        `;
    });

    historyHTML += "</ul>";
    historyDiv.innerHTML = historyHTML;
}
function deleteEntry(index) {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    let data = JSON.parse(localStorage.getItem("mindpulseData")) || [];
    data.splice(index, 1);
    localStorage.setItem("mindpulseData", JSON.stringify(data));

    showHistory(); // refresh list
}
function clearHistory() {
    if (!confirm("This will delete all your emotional history. Continue?")) return;

    localStorage.removeItem("mindpulseData");
    document.getElementById("history").innerHTML = "🗑 All emotional history cleared.";
}
