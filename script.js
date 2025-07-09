const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form') 

const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

// --- Prompts Específicos para cada jogo ---

const perguntaLOL = `
        ## Especialidade
        Você é um assistente de meta e estratégias para o jogo **League of Legends (LoL)**.

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, como meta atual, builds de campeões, runas, talentos, dicas de rota, estratégias de equipe e informações sobre patches recentes.

        ## Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
        - Considere a data atual ${new Date().toLocaleDateString()} e o patch mais recente do LoL.
        - Faça pesquisas atualizadas sobre o patch atual, baseada na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual.

        ## Resposta
        - Economize na resposta, seja direto e responda no máximo 500 caracteres.
        - Responda em markdown.
        - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

        ## Exemplo de resposta
        pergunta do usuário: Melhor build para Ahri mid
        resposta: A build mais atual para Ahri inclui: \n\n **Itens:** Luden's, Capuz da Morte, Cajado do Vazio. \n\n**Runas:** Eletrocutar, Gosto de Sangue, Globos Oculares, Caça Suprema. \n\n**Dicas:** Foque em roamings após nível 6.

        ---
        Aqui está a pergunta do usuário: \${question}
    `;

const perguntaValorant = `
        ## Especialidade
        Você é um assistente de meta e estratégias para o jogo **Valorant**.

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, como agentes, habilidades, táticas de mapa, economia, setups de bombsite e informações sobre os patches mais recentes.

        ## Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
        - Considere a data atual ${new Date().toLocaleDateString()} e o patch mais recente do Valorant.
        - Faça pesquisas atualizadas sobre o patch atual, baseada na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual.

        ## Resposta
        - Economize na resposta, seja direto e responda no máximo 500 caracteres.
        - Responda em markdown.
        - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

        ## Exemplo de resposta
        pergunta do usuário: Melhor setup de Cypher para Ascent
        resposta: No bombsite A de Ascent, coloque a Cyber Gaiola no topo do Heaven e a segunda na entrada do site. Fios Fatais na ligação entre o gerador e o caixote.

        ---
        Aqui está a pergunta do usuário: \${question}
    `;

const perguntaLostArk = `
        ## Especialidade
        Você é um assistente de meta e estratégias para o jogo **Lost Ark**.

        ## Tarefa
        Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, como builds de classes, engravings, gemas, tripods, rotas de farm, raids, e informações sobre os patches de conteúdo mais recentes.

        ## Regras
        - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
        - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
        - Considere a data atual ${new Date().toLocaleDateString()} e o patch de conteúdo mais recente do Lost Ark.
        - Faça pesquisas atualizadas sobre o patch atual, baseada na data atual, para dar uma resposta coerente.
        - Nunca responda itens que você não tenha certeza de que existe no patch atual.

        ## Resposta
        - Economize na resposta, seja direto e responda no máximo 500 caracteres.
        - Responda em markdown.
        - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

        ## Exemplo de resposta
        pergunta do usuário: Melhor build para Artillerist Combustão
        resposta: Para Artillerist Combustão, foque em especialização e crítico. Engravings essenciais: Adrenaline, Grudge, Hit Master. Habilidades chave: Barragem, Mísseis Múltiplos, Disparo de Chamas.

        ---
        Aqui está a pergunta do usuário: \${question}
    `;

const perguntarAI = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    let pergunta = '';

    if (game === 'valorant') {
        pergunta =perguntaValorant;
    } else if (game === 'lol') {
        pergunta = perguntaLOL
    } else if (game === 'lostark') {
        pergunta = perguntaLostArk;
    } else {
        pergunta = `
        ## Especialidade
            Você é um assistente de jogos.

            ## Tarefa
            Você deve responder perguntas sobre o jogo ${game} com base no seu conhecimento geral.

            ## Regras
            - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
            - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'.
            - Considere a data atual ${new Date().toLocaleDateString()}.
            - Faça pesquisas atualizadas sobre o jogo, baseada na data atual, para dar uma resposta coerente.
            - Nunca responda itens que você não tenha certeza de que existe no pacth atual.

            ## Resposta
            - Economize na resposta, seja direto e responda no máximo 500 caracteres.
            - Responda em markdown.
            - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

            ---
            Aqui está a pergunta do usuário: \${question}
        `; 
    }

    const finalPergunta = pergunta.replace(/\${question}/g, question);
    
    const contents = [{
        role: "user",
        parts: [{
            text: finalPergunta
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    // chamada API
    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
}

const enviarFormulario = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value 
    const question = questionInput.value 

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
        // perguntar para a IA
        const text = await perguntarAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')
    } catch(error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    }
}
form.addEventListener('submit', enviarFormulario)