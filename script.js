document.addEventListener('DOMContentLoaded', () => {
    const subStages = document.querySelectorAll('.sub-stage');
    const scoreElement = document.getElementById('score');
    let score = parseInt(localStorage.getItem('score')) || 0;

    scoreElement.textContent = score;

    subStages.forEach(stage => {
        stage.addEventListener('click', () => {
            if (!stage.classList.contains('completed')) {
                stage.classList.add('completed');
                const date = new Date().toLocaleDateString();
                const dateElement = document.createElement('span');
                dateElement.classList.add('date');
                dateElement.textContent = `Concluído em: ${date}`;
                stage.appendChild(dateElement);
                // Atualizar e salvar a pontuação
                score += 10; // Atribuindo 10 pontos por etapa
                scoreElement.textContent = score;
                saveScore(score);
                saveStageState(stage.id, date);
            }
        });

        // Verificar se o estágio já foi concluído
        const savedDate = getStageState(stage.id);
        if (savedDate) {
            stage.classList.add('completed');
            const dateElement = document.createElement('span');
            dateElement.classList.add('date');
            dateElement.textContent = `Concluído em: ${savedDate}`;
            stage.appendChild(dateElement);
        }
    });
});

// Função para salvar o estado no localStorage
function saveStageState(id, date) {
    let stages = JSON.parse(localStorage.getItem('completedStages')) || {};
    stages[id] = date;
    localStorage.setItem('completedStages', JSON.stringify(stages));
}

// Função para obter o estado do localStorage
function getStageState(id) {
    let stages = JSON.parse(localStorage.getItem('completedStages')) || {};
    return stages[id];
}

// Função para salvar a pontuação no localStorage
function saveScore(score) {
    localStorage.setItem('score', score);
}
