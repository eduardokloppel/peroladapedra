document.addEventListener('DOMContentLoaded', () => {
    const flowchartItems = document.querySelectorAll('.flowchart-item.sub-stage');

    flowchartItems.forEach(item => {
        // Adicionar suporte para navegação por teclado
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });

        // Evento de clique
        item.addEventListener('click', () => {
            if (!item.classList.contains('completed')) {
                item.classList.add('completed');
                const date = new Date().toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                const dateElement = document.createElement('span');
                dateElement.classList.add('date');
                dateElement.textContent = `Concluído em: ${date}`;
                item.appendChild(dateElement);
                // Salvar no localStorage
                saveItemState(item.id, date);

                // Exibir modal de congratulação
                showCongratulationModal(item);

                // Verificar se todas as etapas foram concluídas
                checkStagesCompletion();
            }
        });

        // Verificar se o item já foi concluído
        const savedDate = getItemState(item.id);
        if (savedDate) {
            item.classList.add('completed');
            const dateElement = document.createElement('span');
            dateElement.classList.add('date');
            dateElement.textContent = `Concluído em: ${savedDate}`;
            item.appendChild(dateElement);
        }
    });

    // Inicializar AOS (se estiver usando)
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }
});

/**
 * Função para salvar o estado de um item no localStorage
 * @param {string} id - ID do item
 * @param {string} date - Data de conclusão
 */
function saveItemState(id, date) {
    let items = JSON.parse(localStorage.getItem('completedItems')) || {};
    items[id] = date;
    localStorage.setItem('completedItems', JSON.stringify(items));
}

/**
 * Função para obter o estado de um item do localStorage
 * @param {string} id - ID do item
 * @returns {string|null} - Data de conclusão ou null
 */
function getItemState(id) {
    let items = JSON.parse(localStorage.getItem('completedItems')) || {};
    return items[id] || null;
}

/**
 * Função para exibir um modal de congratulações
 * @param {HTMLElement} item - Item concluído
 */
function showCongratulationModal(item) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Parabéns!</h2>
            <p>Você concluiu a etapa: ${item.querySelector('span').textContent}</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.remove();
        }
    });
}

/**
 * Função para verificar se todas as etapas estão concluídas e marcar o sucesso
 */
function checkStagesCompletion() {
    const allCompleted = Array.from(document.querySelectorAll('.flowchart-item.sub-stage'))
        .every(item => item.classList.contains('completed'));

    if (allCompleted) {
        const sucessoItem = document.getElementById('sucesso');
        if (!sucessoItem.classList.contains('completed')) {
            sucessoItem.classList.add('completed');
            const date = new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const dateElement = document.createElement('span');
            dateElement.classList.add('date');
            dateElement.textContent = `Concluído em: ${date}`;
            sucessoItem.appendChild(dateElement);

            // Salvar no localStorage
            saveItemState(sucessoItem.id, date);

            // Exibir modal de sucesso
            showSuccessModal(sucessoItem);
        }
    }
}

/**
 * Função para exibir um modal de sucesso quando todas as etapas forem concluídas
 * @param {HTMLElement} item - Item de sucesso
 */
function showSuccessModal(item) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Sucesso!</h2>
            <p>Todos os processos foram concluídos com sucesso.</p>
        </div>
    `;
    document.body.appendChild(modal);

    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.remove();
    });

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.remove();
        }
    });
}
